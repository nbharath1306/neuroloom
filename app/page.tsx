'use client';

import { useState, useEffect } from 'react';
import NewsCard from './components/NewsCard';
import FilterBar from './components/FilterBar';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  creator?: string;
  contentSnippet?: string;
  source: string;
  categories?: string[];
}

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    filterNews();
  }, [news, selectedSource, searchQuery]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/news');
      const data = await response.json();
      setNews(data.articles || []);
      setFilteredNews(data.articles || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterNews = () => {
    let filtered = news;

    if (selectedSource !== 'all') {
      filtered = filtered.filter((item) => item.source === selectedSource);
    }

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contentSnippet?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNews(filtered);
  };

  const sources = [
    { id: 'all', name: 'All Sources' },
    { id: 'TechCrunch', name: 'TechCrunch' },
    { id: 'AI News', name: 'AI News' },
    { id: 'MIT', name: 'MIT' },
    { id: 'Wired AI', name: 'Wired AI' },
    { id: 'Economic Times', name: 'Economic Times' },
    { id: 'Indian Express', name: 'Indian Express' },
    { id: 'Mint', name: 'Mint' },
    { id: 'Express Computer', name: 'Express Computer' },
    { id: 'Analytics India', name: 'Analytics India' },
    { id: 'The Verge', name: 'The Verge' },
  ];

  return (
    <div className="min-h-screen animated-gradient relative">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            {/* Main title with neon effect */}
            <div className="mb-6 relative">
              <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 mb-4 neon-text animate-float">
                NEUROLOOM
              </h1>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl -z-10"></div>
            </div>

            <p className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
              Stop Doom Scrolling. <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Start Smart Reading.</span> 🚀
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Your futuristic AI & tech news hub. Aggregating the latest from <span className="text-purple-400 font-semibold">10 premium sources</span> in real-time. 
              Bookmark this page and visit once daily—no more endless Instagram scrolling!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={fetchNews}
                className="glass-strong px-8 py-4 rounded-xl font-semibold text-white hover-glow neon-border group"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Feed
                </span>
              </button>
              <a
                href="#news-feed"
                className="glass px-8 py-4 rounded-xl font-semibold text-white hover-glow border border-purple-500/50"
              >
                Explore News ↓
              </a>
            </div>

            {/* Feature Cards - Futuristic Design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="glass-strong rounded-2xl p-8 hover-glow neon-border relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all"></div>
                <div className="text-5xl mb-4 relative z-10">📰</div>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">10 Premium Sources</h3>
                <p className="text-gray-300 text-sm relative z-10">TechCrunch, MIT AI Lab, Reuters Tech, Economic Times, Indian Express, and 5 more elite feeds</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              </div>
              
              <div className="glass-strong rounded-2xl p-8 hover-glow neon-border relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl group-hover:bg-pink-500/30 transition-all"></div>
                <div className="text-5xl mb-4 relative z-10">⚡</div>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">Real-Time Updates</h3>
                <p className="text-gray-300 text-sm relative z-10">Lightning-fast RSS aggregation with instant updates. Fresh content every time you visit</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
              </div>
              
              <div className="glass-strong rounded-2xl p-8 hover-glow neon-border relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all"></div>
                <div className="text-5xl mb-4 relative z-10">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">Zero Distractions</h3>
                <p className="text-gray-300 text-sm relative z-10">Curated, ad-free content. Smart filters & search. No algorithms. Just pure tech news.</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Feed Section */}
      <div id="news-feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Neural Feed</span>
          </h2>
          <p className="text-gray-400">Aggregated from the world's top tech publications</p>
        </div>

        <FilterBar
          sources={sources}
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onRefresh={fetchNews}
        />

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-purple-500"></div>
              <div className="absolute top-0 left-0 rounded-full h-20 w-20 border-t-2 border-b-2 border-pink-500" style={{ animation: 'spin 1s linear infinite reverse' }}></div>
            </div>
            <p className="text-gray-400 mt-6 text-lg">Loading latest updates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.length > 0 ? (
              filteredNews.map((item, index) => (
                <NewsCard key={index} item={item} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="glass-strong rounded-2xl p-12 max-w-md mx-auto">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-gray-300 text-xl font-semibold mb-2">No results found</p>
                  <p className="text-gray-400">Try adjusting your filters or search query</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats section */}
        {!loading && filteredNews.length > 0 && (
          <div className="mt-16 glass-strong rounded-2xl p-8 text-center">
            <p className="text-gray-300">
              Showing <span className="text-purple-400 font-bold text-xl">{filteredNews.length}</span> articles
              {selectedSource !== 'all' && <span> from <span className="text-pink-400 font-semibold">{sources.find(s => s.id === selectedSource)?.name}</span></span>}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative border-t border-white/10 mt-20">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">NeuroLoom</h3>
            <p className="text-gray-400 mb-6">
              Your daily dose of AI & tech innovation
            </p>
            <div className="flex justify-center gap-8 mb-6 text-sm text-gray-400">
              <span>🚀 10 Premium Sources</span>
              <span>⚡ Real-Time Updates</span>
              <span>🎯 Zero Ads</span>
            </div>
            <div className="border-t border-white/10 pt-6">
              <p className="text-gray-500 text-sm">
                Made with <span className="text-purple-400">💜</span> to beat Instagram doom scrolling
              </p>
              <p className="text-gray-600 text-xs mt-2">NeuroLoom © 2025 • Built with Next.js</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
