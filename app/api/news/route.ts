import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['content:encoded', 'contentEncoded'],
    ],
  },
});

const RSS_FEEDS = [
  { url: 'https://techcrunch.com/feed/', source: 'TechCrunch' },
  { url: 'https://artificialintelligence-news.com/feed/', source: 'AI News' },
  { url: 'https://news.mit.edu/rss/topic/artificial-intelligence2', source: 'MIT' },
  { url: 'https://www.wired.com/feed/tag/ai/latest/rss', source: 'Wired AI' },
  { url: 'https://economictimes.indiatimes.com/tech/rssfeeds/13357270.cms', source: 'Economic Times' },
  { url: 'https://indianexpress.com/section/technology/feed/', source: 'Indian Express' },
  { url: 'https://www.livemint.com/rss/technology', source: 'Mint' },
  { url: 'https://www.expresscomputer.in/feed/', source: 'Express Computer' },
  { url: 'https://analyticsindiamag.com/feed/', source: 'Analytics India' },
  { url: 'https://www.theverge.com/rss/index.xml', source: 'The Verge' },
];

export async function GET() {
  try {
    const allArticles = [];

    // Fetch from all feeds in parallel
    const feedPromises = RSS_FEEDS.map(async (feed) => {
      try {
        const feedData = await parser.parseURL(feed.url);
        return feedData.items.slice(0, 10).map((item) => ({
          title: item.title || 'No title',
          link: item.link || '#',
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          creator: item.creator || feed.source,
          contentSnippet: item.contentSnippet || item.content?.substring(0, 200) || '',
          source: feed.source,
          categories: item.categories || [],
        }));
      } catch (error) {
        console.error(`Error fetching ${feed.source}:`, error);
        return [];
      }
    });

    const results = await Promise.all(feedPromises);
    results.forEach((articles) => allArticles.push(...articles));

    // Sort by date (newest first)
    allArticles.sort((a, b) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });

    return NextResponse.json({
      success: true,
      articles: allArticles,
      count: allArticles.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
