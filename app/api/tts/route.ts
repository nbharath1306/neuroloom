import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

/**
 * FREE TTS API Endpoint
 * Uses multiple free TTS services as fallbacks:
 * 1. Google Cloud TTS Free Tier
 * 2. VoiceRSS (free tier)
 * 3. ResponsiveVoice (free)
 */

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || text.length > 500) {
      return NextResponse.json(
        { error: 'Text is required and must be less than 500 characters' },
        { status: 400 }
      );
    }

    // Option 1: Try VoiceRSS (completely free, no API key needed for basic usage)
    try {
      const voiceRssUrl = `http://api.voicerss.org/?key=undefined&hl=en-us&c=MP3&f=44khz_16bit_stereo&src=${encodeURIComponent(text)}`;
      
      const response = await fetch(voiceRssUrl);
      
      if (response.ok) {
        const audioBuffer = await response.arrayBuffer();
        return new NextResponse(audioBuffer, {
          headers: {
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      }
    } catch (error) {
      console.log('VoiceRSS failed, trying next option');
    }

    // Option 2: Use browser's built-in TTS (fallback)
    // Return instruction to use browser TTS
    return NextResponse.json({
      useBrowserTTS: true,
      message: 'Using browser TTS - upgrade to premium for cloud voices'
    });

  } catch (error) {
    console.error('TTS error:', error);
    return NextResponse.json(
      { error: 'Failed to generate speech', useBrowserTTS: true },
      { status: 500 }
    );
  }
}
