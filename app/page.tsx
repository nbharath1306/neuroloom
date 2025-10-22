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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      {/* Scanline effect */}
      <div className="scanline"></div>
      
      {/* Floating particles background */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 25}s`,
                animationDuration: `${20 + Math.random() * 15}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 via-transparent to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            {/* Main title with cyberpunk neon effect */}
            <div className="mb-6 relative">
              <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-yellow-300 to-magenta-500 mb-4 neon-text glitch tracking-wider">
                NEUROLOOM
              </h1>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-magenta-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
            </div>

            <p className="text-2xl md:text-4xl font-bold text-cyan-300 mb-4 tracking-tight">
              Stop Doom Scrolling. <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-magenta-400">Start Neural Linking.</span> ⚡
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Your <span className="text-cyan-400 font-bold">cyberpunk AI & tech news hub</span>. Aggregating the latest from <span className="text-magenta-400 font-semibold">10 premium sources</span> in real-time. 
              Bookmark this page and visit once daily—<span className="text-yellow-300">no more endless Instagram scrolling!</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={fetchNews}
                className="glass-strong px-8 py-4 rounded-xl font-semibold text-cyan-300 hover-glow neon-border group relative overflow-hidden"
              >
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  SYNC NEURAL FEED
                </span>
              </button>
              <a
                href="#news-feed"
                className="glass px-8 py-4 rounded-xl font-semibold text-magenta-300 hover-glow border-2 border-magenta-500/50"
              >
                JACK IN ↓
              </a>
            </div>

            {/* Feature Cards - Cyberpunk Design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="glass-strong rounded-2xl p-8 hover-glow neon-border relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/30 rounded-full blur-3xl group-hover:bg-cyan-500/50 transition-all"></div>
                <div className="text-6xl mb-4 relative z-10 filter drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">🌐</div>
                <h3 className="text-xl font-bold text-cyan-300 mb-3 relative z-10 tracking-wide">10 NEURAL NODES</h3>
                <p className="text-gray-300 text-sm relative z-10">TechCrunch, MIT AI Lab, Wired, Economic Times, Indian Express, and 5 more elite data streams</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-yellow-400 to-magenta-500"></div>
              </div>
              
              <div className="glass-strong rounded-2xl p-8 hover-glow neon-border relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-magenta-500/30 rounded-full blur-3xl group-hover:bg-magenta-500/50 transition-all"></div>
                <div className="text-6xl mb-4 relative z-10 filter drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]">⚡</div>
                <h3 className="text-xl font-bold text-magenta-300 mb-3 relative z-10 tracking-wide">REAL-TIME SYNC</h3>
                <p className="text-gray-300 text-sm relative z-10">Quantum-fast RSS aggregation. Instant neural updates. Fresh cybernetic content on demand</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-magenta-500 via-yellow-400 to-cyan-500"></div>
              </div>
              
              <div className="glass-strong rounded-2xl p-8 hover-glow neon-border relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/30 rounded-full blur-3xl group-hover:bg-yellow-500/50 transition-all"></div>
                <div className="text-6xl mb-4 relative z-10 filter drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]">🎯</div>
                <h3 className="text-xl font-bold text-yellow-300 mb-3 relative z-10 tracking-wide">ZERO NOISE</h3>
                <p className="text-gray-300 text-sm relative z-10">Curated, ad-free matrix. Smart filters. No corporate algorithms. Pure unfiltered data</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-cyan-400 to-magenta-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Feed Section */}
      <div id="news-feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-yellow-300 to-magenta-500 mb-4 tracking-wider">
            NEURAL <span className="glitch">DATASTREAM</span>
          </h2>
          <p className="text-cyan-400 text-lg">// Aggregated from the world's top tech publications</p>
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
              <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-cyan-400"></div>
              <div className="absolute top-0 left-0 animate-spin-reverse rounded-full h-24 w-24 border-t-4 border-b-4 border-magenta-400"></div>
              <div className="absolute top-0 left-0 rounded-full h-24 w-24 border-4 border-transparent border-t-yellow-400 animate-pulse"></div>
            </div>
            <p className="text-cyan-400 mt-6 text-lg font-bold tracking-wider">// SYNCING NEURAL NETWORK...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.length > 0 ? (
              filteredNews.map((item, index) => (
                <NewsCard key={`${item.link}-${index}`} item={item} />
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
          <div className="mt-16 glass-strong rounded-2xl p-8 text-center neon-border">
            <p className="text-gray-300">
              <span className="text-cyan-400 font-mono text-sm">&gt;&gt; </span>
              Displaying <span className="text-cyan-400 font-bold text-2xl font-mono">{filteredNews.length}</span> neural packets
              {selectedSource !== 'all' && <span> from <span className="text-magenta-400 font-semibold">{sources.find(s => s.id === selectedSource)?.name}</span></span>}
              <span className="text-cyan-400 font-mono text-sm"> _</span>
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative border-t-2 border-cyan-500/30 mt-20">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400 mb-2 tracking-widest">NEUROLOOM</h3>
            <p className="text-cyan-400 mb-6 font-mono text-sm">
              // Your daily dose of AI & tech cybernetics
            </p>
            <div className="flex justify-center gap-8 mb-6 text-sm text-gray-400">
              <span className="text-cyan-400">⚡ 10 Neural Nodes</span>
              <span className="text-magenta-400">🌐 Real-Time Sync</span>
              <span className="text-yellow-400">🎯 Zero Corporate Noise</span>
            </div>
            <div className="border-t border-cyan-500/20 pt-6">
              <p className="text-gray-500 text-sm font-mono">
                <span className="text-cyan-400">&gt;</span> Made with <span className="text-magenta-400 animate-pulse">💜</span> to defeat the doomscroll matrix
              </p>
              <p className="text-gray-600 text-xs mt-2 font-mono">NeuroLoom © 2025 • Powered by Next.js • Deployed on Vercel</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
