import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

/**
 * FREE TTS API using HuggingFace Inference API
 * Models: Suno Bark (best quality) with fallback to Microsoft SpeechT5
 * 
 * Setup: Add HUGGINGFACE_API_TOKEN to .env.local
 * Get free token at: https://huggingface.co/settings/tokens
 */

export async function POST(req: NextRequest) {
  try {
    const { text, voice = 'female' } = await req.json();

    if (!text || text.length > 500) {
      return NextResponse.json(
        { error: 'Text is required and must be less than 500 characters' },
        { status: 400 }
      );
    }

    const HF_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

    if (!HF_TOKEN) {
      console.log('⚠️ No HuggingFace token - using browser TTS');
      return NextResponse.json({
        useBrowserTTS: true,
        message: 'Add HUGGINGFACE_API_TOKEN to .env.local for better voices'
      });
    }

    // Use different models for male/female voices
    const modelMap: { [key: string]: string } = {
      'female': 'facebook/mms-tts-eng',        // Meta's model - clear female
      'male': 'microsoft/speecht5_tts',        // Microsoft - good male
      'female2': 'facebook/mms-tts-eng',  
      'male2': 'microsoft/speecht5_tts',    
    };

    const selectedModel = modelMap[voice] || modelMap['female'];

    // Try selected TTS model
    try {
      console.log(`🎙️ Generating ${voice} speech with ${selectedModel}...`);
      
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${selectedModel}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HF_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: text,
          }),
        }
      );

      if (response.ok) {
        const audioBuffer = await response.arrayBuffer();
        
        return new NextResponse(audioBuffer, {
          headers: {
            'Content-Type': 'audio/flac',
            'Cache-Control': 'public, max-age=86400',
            'X-Voice-Model': selectedModel, // Debug header
          },
        });
      }

      // If model is loading, try fallback
      const errorData = await response.json().catch(() => ({}));
      if (errorData.error?.includes('loading')) {
        console.log('⏳ Model loading, trying Bark fallback...');
      }
    } catch (error) {
      console.log('Primary model failed, trying Bark...');
    }

    // Fallback to Suno Bark (works but single voice)
    try {
      console.log('🎙️ Fallback: Using Suno Bark...');
      const response = await fetch(
        'https://api-inference.huggingface.co/models/suno/bark',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HF_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: text }),
        }
      );

      if (response.ok) {
        const audioBuffer = await response.arrayBuffer();
        
        return new NextResponse(audioBuffer, {
          headers: {
            'Content-Type': 'audio/flac',
            'Cache-Control': 'public, max-age=86400',
            'X-Voice-Model': 'suno/bark',
          },
        });
      }
    } catch (error) {
      console.log('Bark failed too');
    }

    // Final fallback: browser TTS
    return NextResponse.json({
      useBrowserTTS: true,
      message: 'Cloud TTS unavailable, using browser voice'
    });

  } catch (error) {
    console.error('TTS error:', error);
    return NextResponse.json(
      { error: 'Failed to generate speech', useBrowserTTS: true },
      { status: 500 }
    );
  }
}
