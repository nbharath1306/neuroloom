import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

/**
 * FREE TTS using Browser Speech Synthesis API
 * HuggingFace TTS models require PRO subscription ($9/month)
 * Browser TTS is completely free and works offline!
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

    // NOTE: HuggingFace TTS models require PRO subscription ($9/month)
    // Free tier gives 403 errors. Using enhanced browser TTS instead.
    console.log(`🔊 Using browser TTS with ${voice} voice`);
    return NextResponse.json({
      useBrowserTTS: true,
      voice: voice,
      message: 'Using enhanced browser TTS with optimized voice selection'
    });

  } catch (error) {
    console.error('TTS error:', error);
    return NextResponse.json(
      { error: 'Failed to generate speech', useBrowserTTS: true },
      { status: 500 }
    );
  }
}
