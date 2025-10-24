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

    // Voice selection for Suno Bark
    const voiceMap: { [key: string]: string } = {
      'female': 'v2/en_speaker_6',  // Clear female voice
      'male': 'v2/en_speaker_9',     // Clear male voice
      'female2': 'v2/en_speaker_3',  // Alternative female
      'male2': 'v2/en_speaker_5',    // Alternative male
    };

    const selectedVoice = voiceMap[voice] || voiceMap['female'];

    // Try Suno Bark first (best quality)
    try {
      console.log('🎙️ Generating speech with Suno Bark...');
      
      const response = await fetch(
        'https://api-inference.huggingface.co/models/suno/bark',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HF_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: text,
            parameters: {
              speaker: selectedVoice,
            }
          }),
        }
      );

      if (response.ok) {
        const audioBuffer = await response.arrayBuffer();
        
        return new NextResponse(audioBuffer, {
          headers: {
            'Content-Type': 'audio/flac',
            'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
          },
        });
      }

      // If model is loading, wait and retry
      const errorData = await response.json();
      if (errorData.error?.includes('loading')) {
        console.log('⏳ Model loading, trying fallback...');
        throw new Error('Model loading');
      }
    } catch (error) {
      console.log('Bark failed, trying Microsoft SpeechT5...');
    }

    // Fallback to Microsoft SpeechT5 (faster, still good quality)
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/microsoft/speecht5_tts',
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
          },
        });
      }
    } catch (error) {
      console.log('SpeechT5 failed, using browser TTS');
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
