import { NextRequest, NextResponse } from 'next/server';

// 🚀 GROQ - Lightning-fast AI summaries with Llama 3.1 8B
// Speed: 500-800 tokens/second | Quality: Excellent | Cost: FREE (14,400 requests/day)
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.1-8b-instant'; // Blazing fast 8B model

export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json();

    // Get API key from environment variable
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error('GROQ_API_KEY not found in environment variables');
      return NextResponse.json({ 
        summary: '⚠️ AI summaries not configured. Add GROQ_API_KEY to environment variables.' 
      });
    }

    // Combine title and description
    const text = `${title}. ${description || ''}`;

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a tech news summarizer. Create concise, engaging 2-3 sentence summaries that highlight key points and why they matter. Be direct, technical, and insightful. Focus on the impact and innovation.'
          },
          {
            role: 'user',
            content: `Summarize this tech article:\n\nTitle: ${title}\n\nDescription: ${description || 'No description available'}`
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Groq API error:', errorData);
      
      // Handle rate limits
      if (response.status === 429) {
        return NextResponse.json({ 
          summary: '⏳ Too many requests. Please try again in a moment.' 
        });
      }
      
      throw new Error('Failed to generate summary');
    }

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content;

    if (!summary) {
      return NextResponse.json({ 
        summary: '📝 Unable to generate summary for this article.' 
      });
    }

    return NextResponse.json({ summary: summary.trim() });
  } catch (error) {
    console.error('Summary API error:', error);
    return NextResponse.json(
      { summary: '❌ Failed to generate summary. Please try again.' },
      { status: 200 } // Return 200 to avoid breaking the UI
    );
  }
}
