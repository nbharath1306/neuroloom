import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

// Mark this route as dynamic (no static generation)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['content:encoded', 'contentEncoded'],
    ],
  },
});

// Cache configuration - Reduced for more real-time updates
const CACHE_DURATION = 1 * 60 * 1000; // 1 minute in milliseconds
let cachedData: any = null;
let lastFetchTime: number = 0;

const RSS_FEEDS = [
  { url: 'https://techcrunch.com/feed/', source: 'TechCrunch' },
  { url: 'https://www.artificialintelligence-news.com/feed/', source: 'AI News' },
  { url: 'https://news.mit.edu/rss/topic/artificial-intelligence2', source: 'MIT' },
  { url: 'https://www.wired.com/feed/tag/ai/latest/rss', source: 'Wired AI' },
  { url: 'https://economictimes.indiatimes.com/tech/rssfeeds/13357270.cms', source: 'Economic Times' },
  { url: 'https://indianexpress.com/section/technology/feed/', source: 'Indian Express' },
  { url: 'https://www.livemint.com/rss/technology', source: 'Mint' },
  { url: 'https://www.expresscomputer.in/feed/', source: 'Express Computer' },
  { url: 'https://analyticsindiamag.com/feed/', source: 'Analytics India' },
  { url: 'https://www.theverge.com/rss/index.xml', source: 'The Verge' },
];

interface Article {
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  contentSnippet: string;
  source: string;
  categories: string[];
}

export async function GET(request: Request) {
  try {
    // Check for force refresh parameter
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get('refresh') === 'true';
    
    // Check if cache is still valid
    const now = Date.now();
    if (cachedData && (now - lastFetchTime) < CACHE_DURATION && !forceRefresh) {
      console.log('Returning cached data');
      return NextResponse.json({
        ...cachedData,
        cached: true,
        cacheAge: Math.floor((now - lastFetchTime) / 1000), // seconds
      });
    }

    console.log('Fetching fresh data from RSS feeds...');
    const allArticles: Article[] = [];

    // Helper function to add timeout to fetch (reduced for faster updates)
    const fetchWithTimeout = async (feed: { url: string; source: string }, timeout = 5000) => {
      return Promise.race([
        parser.parseURL(feed.url),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), timeout)
        )
      ]);
    };

    // Fetch from all feeds in parallel
    const feedPromises = RSS_FEEDS.map(async (feed) => {
      try {
        const feedData = await fetchWithTimeout(feed) as any;
        return feedData.items.slice(0, 20).map((item: any): Article => {
          // Helper to safely convert to string
          const safeString = (val: any, fallback: string = ''): string => {
            if (val === null || val === undefined) return fallback;
            if (typeof val === 'string') return val;
            if (typeof val === 'object') return fallback;
            return String(val);
          };

          // Helper to decode HTML entities and clean text
          const cleanText = (text: string): string => {
            return text
              // Decode common HTML entities
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&quot;/g, '"')
              .replace(/&#039;/g, "'")
              .replace(/&apos;/g, "'")
              .replace(/&nbsp;/g, ' ')
              .replace(/&#8216;/g, "'")  // Left single quote
              .replace(/&#8217;/g, "'")  // Right single quote
              .replace(/&#8218;/g, "'")  // Single low quote
              .replace(/&#8220;/g, '"')  // Left double quote
              .replace(/&#8221;/g, '"')  // Right double quote
              .replace(/&#8222;/g, '"')  // Double low quote
              .replace(/&#8211;/g, '–')  // En dash
              .replace(/&#8212;/g, '—')  // Em dash
              .replace(/&#8230;/g, '...')  // Ellipsis
              // Remove markdown symbols
              .replace(/#{1,6}\s/g, '')
              .replace(/\*\*/g, '')
              .replace(/\*/g, '')
              .replace(/_/g, '')
              // Remove extra whitespace
              .replace(/\s+/g, ' ')
              .trim();
          };

          return {
            title: cleanText(safeString(item.title, 'No title')),
            link: safeString(item.link, '#'),
            pubDate: safeString(item.pubDate || item.isoDate, new Date().toISOString()),
            creator: safeString(item.creator, feed.source),
            contentSnippet: cleanText(safeString(item.contentSnippet || item.content, '')).substring(0, 200),
            source: feed.source,
            categories: Array.isArray(item.categories) 
              ? item.categories.map((cat: any) => safeString(cat, '')).filter(Boolean)
              : [],
          };
        });
      } catch (error) {
        console.error(`Error fetching ${feed.source}:`, error);
        return [];
      }
    });

    const results = await Promise.all(feedPromises);
    results.forEach((articles: Article[]) => allArticles.push(...articles));

    // Sort by date (newest first)
    allArticles.sort((a, b) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });

    // Update cache
    cachedData = {
      success: true,
      articles: allArticles,
      count: allArticles.length,
      lastUpdated: new Date().toISOString(),
    };
    lastFetchTime = Date.now();

    return NextResponse.json({
      ...cachedData,
      cached: false,
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
