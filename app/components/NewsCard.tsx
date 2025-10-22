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
    const colors: { [key: string]: string } = {
      'TechCrunch': 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
      'AI News': 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      'MIT': 'bg-magenta-500/20 text-magenta-300 border-magenta-400/30',
      'Wired AI': 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
      'Economic Times': 'bg-orange-500/20 text-orange-300 border-orange-400/30',
      'Indian Express': 'bg-red-500/20 text-red-300 border-red-400/30',
      'Mint': 'bg-teal-500/20 text-teal-300 border-teal-400/30',
      'Express Computer': 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
      'Analytics India': 'bg-pink-500/20 text-pink-300 border-pink-400/30',
      'The Verge': 'bg-purple-500/20 text-purple-300 border-purple-400/30',
    };
    return colors[source] || 'bg-gray-500/20 text-gray-300 border-gray-400/30';
  };

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="glass-strong rounded-2xl p-6 hover-glow border-2 border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
        {/* Intense glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-magenta-500/0 to-yellow-500/0 group-hover:from-cyan-500/10 group-hover:via-magenta-500/10 group-hover:to-yellow-500/10 transition-all duration-300"></div>
        
        {/* Top accent line with gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-magenta-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${getSourceColor(item.source)} border-2`}>
              {item.source}
            </span>
            <div className="flex items-center gap-1 text-xs text-cyan-400 font-mono">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formattedDate || 'Loading...'}
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-magenta-400 transition-all">
            {item.title}
          </h3>

          {item.contentSnippet && (
            <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
              {item.contentSnippet}
            </p>
          )}

          {item.categories && item.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {item.categories.slice(0, 3).map((category, idx) => (
                <span
                  key={`${category}-${idx}`}
                  className="px-2 py-1 glass rounded-lg text-xs text-gray-300 border border-white/10"
                >
                  #{category}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto pt-4 border-t border-cyan-500/20 flex items-center justify-between">
            <span className="text-cyan-400 text-sm font-bold group-hover:text-magenta-400 transition-colors font-mono">
              &gt;&gt; ACCESS DATA
            </span>
            <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:bg-cyan-500/30 transition-all border border-cyan-500/30">
              <svg className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 group-hover:text-magenta-400 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
