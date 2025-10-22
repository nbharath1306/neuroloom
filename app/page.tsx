'use client';

import { useState, useEffect } from 'react';
import NewsCard from './components/NewsCard';
import FilterBar from './components/FilterBar';
import ThemeSwitcher from './components/ThemeSwitcher';

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
    <div className="min-h-screen relative">
      {/* Theme Switcher */}
      <ThemeSwitcher />
      
      {/* Floating particles background */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 30}s`,
                animationDuration: `${25 + Math.random() * 20}s`,
                background: `var(--accent-${['primary', 'secondary', 'info'][i % 3]})`,
              }}
            />
          ))}
        </div>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            {/* Main title */}
            <div className="mb-8 relative animate-fadeIn">
              <h1 className="text-6xl md:text-8xl font-black gradient-text mb-4 tracking-tight">
                NeuroLoom
              </h1>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
            </div>

            <p style={{ color: 'var(--text-secondary)' }} className="text-2xl md:text-4xl font-bold mb-6 tracking-tight animate-fadeInUp animation-delay-100">
              Stop Doom Scrolling. <span className="gradient-text">Start Learning.</span> ⚡
            </p>
            <p style={{ color: 'var(--text-muted)' }} className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-200">
              Your <span className="gradient-text font-semibold">daily AI & tech news hub</span>. Aggregating the latest from <span style={{ color: 'var(--accent-primary)' }} className="font-semibold">10 premium sources</span> in real-time. 
              Bookmark and visit once daily—<span style={{ color: 'var(--accent-warning)' }}>no more endless scrolling!</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fadeInUp animation-delay-300">
              <button
                onClick={fetchNews}
                className="btn-primary flex items-center justify-center gap-2 group"
              >
                <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Feed
              </button>
              <a
                href="#news-feed"
                className="glass px-8 py-4 rounded-xl font-semibold hover:border-2 transition-all duration-300 hover:scale-105"
                style={{ color: 'var(--accent-secondary)', borderColor: 'var(--accent-secondary)' }}
              >
                Browse News ↓
              </a>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="glass rounded-2xl p-8 relative overflow-hidden group animate-scaleUp animation-delay-100 transform transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-40 h-40 opacity-20 rounded-full blur-3xl group-hover:opacity-30 transition-all" style={{ background: 'var(--accent-primary)' }}></div>
                <div className="text-6xl mb-4 relative z-10 animate-bounce-slow">🌐</div>
                <h3 className="text-xl font-bold mb-3 relative z-10 gradient-text">10 Premium Sources</h3>
                <p style={{ color: 'var(--text-muted)' }} className="text-sm relative z-10">TechCrunch, MIT AI Lab, Wired, Economic Times, Indian Express & 5 more</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </div>
              
              <div className="glass rounded-2xl p-8 relative overflow-hidden group animate-scaleUp animation-delay-200 transform transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-40 h-40 opacity-20 rounded-full blur-3xl group-hover:opacity-30 transition-all" style={{ background: 'var(--accent-secondary)' }}></div>
                <div className="text-6xl mb-4 relative z-10 animate-bounce-slow animation-delay-100">⚡</div>
                <h3 className="text-xl font-bold mb-3 relative z-10 gradient-text">Real-Time Updates</h3>
                <p style={{ color: 'var(--text-muted)' }} className="text-sm relative z-10">Lightning-fast RSS aggregation. Fresh content on demand</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              </div>
              
              <div className="glass rounded-2xl p-8 relative overflow-hidden group animate-scaleUp animation-delay-300 transform transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-40 h-40 opacity-20 rounded-full blur-3xl group-hover:opacity-30 transition-all" style={{ background: 'var(--accent-success)' }}></div>
                <div className="text-6xl mb-4 relative z-10 animate-bounce-slow animation-delay-200">🎯</div>
                <h3 className="text-xl font-bold mb-3 relative z-10 gradient-text">Zero Noise</h3>
                <p style={{ color: 'var(--text-muted)' }} className="text-sm relative z-10">Ad-free, curated content. Smart filters. Pure tech news</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Feed Section */}
      <div id="news-feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Section header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-4 tracking-tight">
            Latest Feed
          </h2>
          <p style={{ color: 'var(--accent-info)' }} className="text-lg">Aggregated from the world's top tech publications</p>
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
              <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4" style={{ borderColor: 'var(--accent-primary)' }}></div>
              <div className="absolute top-0 left-0 animate-spin-reverse rounded-full h-24 w-24 border-t-4 border-b-4" style={{ borderColor: 'var(--accent-secondary)' }}></div>
              <div className="absolute top-0 left-0 rounded-full h-24 w-24 border-4 border-transparent border-t-cyan-400 animate-pulse" style={{ borderTopColor: 'var(--accent-info)' }}></div>
            </div>
            <p style={{ color: 'var(--accent-primary)' }} className="mt-6 text-lg font-bold">Loading news...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.length > 0 ? (
              filteredNews.map((item, index) => (
                <div 
                  key={`${item.link}-${index}`}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${(index % 9) * 0.1}s` }}
                >
                  <NewsCard item={item} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 animate-fadeIn">
                <div className="glass-strong rounded-2xl p-12 max-w-md mx-auto">
                  <div className="text-6xl mb-4 animate-bounce-slow">🔍</div>
                  <p style={{ color: 'var(--text-primary)' }} className="text-xl font-semibold mb-2">No results found</p>
                  <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search query</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats section */}
        {!loading && filteredNews.length > 0 && (
          <div className="mt-16 glass-strong rounded-2xl p-8 text-center accent-border animate-fadeInUp">
            <p style={{ color: 'var(--text-secondary)' }}>
              Displaying <span className="gradient-text font-bold text-2xl font-mono animate-pulse-slow">{filteredNews.length}</span> articles
              {selectedSource !== 'all' && <span> from <span className="gradient-text font-semibold">{sources.find(s => s.id === selectedSource)?.name}</span></span>}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative mt-20" style={{ borderTop: `2px solid var(--border-color)` }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-3xl font-black gradient-text mb-2 tracking-tight">NeuroLoom</h3>
            <p style={{ color: 'var(--accent-primary)' }} className="mb-6 text-sm">
              Your daily dose of AI & tech innovation
            </p>
            <div className="flex justify-center gap-8 mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--accent-primary)' }}>⚡ 10 Premium Sources</span>
              <span style={{ color: 'var(--accent-secondary)' }}>🌐 Real-Time Updates</span>
              <span style={{ color: 'var(--accent-success)' }}>🎯 Zero Noise</span>
            </div>
            <div className="pt-6" style={{ borderTop: `1px solid var(--border-color)` }}>
              <p style={{ color: 'var(--text-muted)' }} className="text-sm">
                Made with <span style={{ color: 'var(--accent-secondary)' }} className="animate-pulse-slow">💜</span> to defeat the doomscroll
              </p>
              <p style={{ color: 'var(--text-muted)' }} className="text-xs mt-2 opacity-70">NeuroLoom © 2025 • Powered by Next.js • Deployed on Vercel</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
