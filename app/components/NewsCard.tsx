interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  creator?: string;
  contentSnippet?: string;
  source: string;
  categories?: string[];
}

interface NewsCardProps {
  item: NewsItem;
}

'use client';

import { useState, useEffect } from 'react';

export default function NewsCard({ item }: NewsCardProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 1) return 'Just now';
      if (diffInHours < 24) return `${diffInHours}h ago`;
      if (diffInHours < 48) return 'Yesterday';
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    
    setFormattedDate(formatDate(item.pubDate));
  }, [item.pubDate]);

  const getSourceColor = (source: string) => {
    const colors: { [key: string]: { bg: string; text: string } } = {
      'TechCrunch': { bg: '#3b82f6', text: '#60a5fa' },
      'AI News': { bg: '#8b5cf6', text: '#a78bfa' },
      'MIT': { bg: '#10b981', text: '#34d399' },
      'Wired AI': { bg: '#f59e0b', text: '#fbbf24' },
      'Economic Times': { bg: '#ef4444', text: '#f87171' },
      'Indian Express': { bg: '#06b6d4', text: '#22d3ee' },
      'Mint': { bg: '#14b8a6', text: '#2dd4bf' },
      'Express Computer': { bg: '#6366f1', text: '#818cf8' },
      'Analytics India': { bg: '#ec4899', text: '#f472b6' },
      'The Verge': { bg: '#8b5cf6', text: '#a78bfa' },
    };
    return colors[source] || { bg: '#6b7280', text: '#9ca3af' };
  };

  const sourceColor = getSourceColor(item.source);

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="glass rounded-2xl p-6 transition-all duration-300 h-full flex flex-col relative overflow-hidden border-2"
           style={{ borderColor: 'var(--border-color)' }}>
        
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
             style={{ background: `linear-gradient(90deg, ${sourceColor.bg}, ${sourceColor.text})` }}></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1.5 rounded-lg text-xs font-semibold border"
                  style={{ 
                    backgroundColor: `${sourceColor.bg}15`,
                    color: sourceColor.text,
                    borderColor: `${sourceColor.bg}30`
                  }}>
              {item.source}
            </span>
            <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formattedDate || 'Loading...'}
            </div>
          </div>

          <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:gradient-text transition-all"
              style={{ color: 'var(--text-primary)' }}>
            {item.title}
          </h3>

          {item.contentSnippet && (
            <p className="text-sm line-clamp-3 mb-4 flex-grow leading-relaxed"
               style={{ color: 'var(--text-muted)' }}>
              {item.contentSnippet}
            </p>
          )}

          {item.categories && item.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {item.categories.slice(0, 3).map((category, idx) => (
                <span
                  key={`${category}-${idx}`}
                  className="px-2 py-1 rounded-lg text-xs"
                  style={{ 
                    backgroundColor: 'var(--bg-accent)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  #{category}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto pt-4 flex items-center justify-between"
               style={{ borderTop: '1px solid var(--border-color)' }}>
            <span className="text-sm font-semibold gradient-text">
              Read More →
            </span>
            <div className="w-8 h-8 rounded-full glass flex items-center justify-center transition-all"
                 style={{ borderColor: 'var(--border-color)' }}>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-all" 
                   style={{ color: 'var(--accent-primary)' }}
                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
