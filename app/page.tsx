'use client';

import { useState, useEffect } from 'react';
import NewsCard from './components/NewsCard';
import FilterBar from './components/FilterBar';
import ThemeSwitcher from './components/ThemeSwitcher';
import FloatingProfile from './components/FloatingProfile';

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
  const [newArticlesCount, setNewArticlesCount] = useState(0);
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const [timeSinceUpdate, setTimeSinceUpdate] = useState(0);

  useEffect(() => {
    setMounted(true);
    fetchNews();
    
    // Restore scroll position when navigating back
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        // Page was loaded from cache (back button)
        const savedPosition = sessionStorage.getItem('neuroloom-scroll-position');
        if (savedPosition) {
          window.scrollTo(0, parseInt(savedPosition));
        }
      }
    };

    // Save scroll position before leaving
    const saveScrollPosition = () => {
      sessionStorage.setItem('neuroloom-scroll-position', window.scrollY.toString());
    };

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('beforeunload', saveScrollPosition);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, []);

  useEffect(() => {
    filterNews();
  }, [news, selectedSource, searchQuery]);

  // Live timer to show seconds since last update
  useEffect(() => {
    if (!lastFetchTime) return;

    const interval = setInterval(() => {
      setTimeSinceUpdate(Math.floor((Date.now() - lastFetchTime.getTime()) / 1000));
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [lastFetchTime]);

  // Auto-refresh every 1 minute for real-time updates
  useEffect(() => {
    if (!autoRefreshEnabled) return;

    const interval = setInterval(() => {
      checkForNewArticles();
    }, 1 * 60 * 1000); // 1 minute

    return () => clearInterval(interval);
  }, [news, autoRefreshEnabled]);

  const fetchNews = async (silent: boolean = false, forceRefresh: boolean = false) => {
    try {
      if (!silent) setLoading(true);
      const url = forceRefresh ? '/api/news?refresh=true' : '/api/news';
      const response = await fetch(url, { cache: 'no-store' });
      const data = await response.json();
      setNews(data.articles || []);
      setFilteredNews(data.articles || []);
      setLastFetchTime(new Date());
      
      // Show success feedback
      if (forceRefresh && !silent) {
        setNewArticlesCount(0);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const checkForNewArticles = async () => {
    try {
      const response = await fetch('/api/news?refresh=true', { cache: 'no-store' });
      const data = await response.json();
      const newArticles = data.articles || [];
      
      // Compare with current news to find new articles
      const currentLinks = new Set(news.map(item => item.link));
      const freshArticles = newArticles.filter((article: NewsItem) => !currentLinks.has(article.link));
      
      if (freshArticles.length > 0) {
        setNewArticlesCount(freshArticles.length);
        // Auto-update the news feed with new articles
        setNews(newArticles);
        setFilteredNews(newArticles);
        setLastFetchTime(new Date());
        
        // Play a subtle notification sound effect (optional)
        if (typeof Audio !== 'undefined') {
          try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUhELTKXh8bdlHAU7k9ryynksBSh+zPLaizsIHGO56eSbTxELTqvn8rVnGgU+l9z1xnMpBSx3yPDajDwIHmS76+OaThELUq3n8rJiGAQ/nt31y3gnBSyCzvHajz0IH2a97Oefkg');
            audio.volume = 0.3;
            audio.play().catch(() => {}); // Ignore if autoplay blocked
          } catch (e) {
            // Ignore audio errors
          }
        }
      }
    } catch (error) {
      console.error('Error checking for new articles:', error);
    }
  };

  const handleRefresh = () => {
    setNewArticlesCount(0);
    fetchNews(false, true); // Force refresh bypasses cache
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
      {/* Floating Profile */}
      <FloatingProfile />
      
      {/* Theme Switcher */}
      <ThemeSwitcher />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            {/* Main title - MASSIVE UPGRADE */}
            <div className="mb-12 relative animate-fadeIn group">
              <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tight relative z-10 
                           transition-all duration-700 cursor-default"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 25%, #ec4899 50%, #f59e0b 75%, #10b981 100%)',
                    backgroundSize: '300% 300%',
                    animation: 'gradient-shift 8s ease infinite',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 10px 40px rgba(59, 130, 246, 0.3))',
                    textShadow: '0 0 80px rgba(139, 92, 246, 0.5)'
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.backgroundPosition = `${x}% ${y}%`;
                  }}>
                NeuroLoom
              </h1>
              
              {/* Animated rings around title */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
                <div className="absolute w-96 h-96 rounded-full border-2 border-blue-500/20 animate-ping"
                     style={{ animationDuration: '3s' }}></div>
                <div className="absolute w-[500px] h-[500px] rounded-full border-2 border-purple-500/20 animate-ping"
                     style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
                <div className="absolute w-[600px] h-[600px] rounded-full border-2 border-pink-500/20 animate-ping"
                     style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
              </div>
              
              {/* Pulsing glow orb */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                            w-96 h-96 rounded-full blur-3xl -z-10 opacity-60"
                   style={{
                     background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(139,92,246,0.3) 50%, transparent 100%)',
                     animation: 'pulse 4s ease-in-out infinite'
                   }}></div>
            </div>

            {/* Tagline with character animation */}
            <p style={{ color: 'var(--text-secondary)' }} 
               className="text-3xl md:text-5xl font-black mb-8 tracking-tight animate-fadeInUp animation-delay-100
                        relative inline-block">
              <span className="inline-block hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default">S</span>
              <span className="inline-block hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default">t</span>
              <span className="inline-block hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default">o</span>
              <span className="inline-block hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default">p</span>
              <span className="inline-block mx-2"></span>
              <span className="inline-block hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default">D</span>
              <span className="inline-block hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default">o</span>
              <span className="inline-block hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default">o</span>
              <span className="inline-block hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default">m</span>
              <span className="inline-block mx-2"></span>
              <span className="inline-block hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default">S</span>
              <span className="inline-block hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default">c</span>
              <span className="inline-block hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default">r</span>
              <span className="inline-block hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default">o</span>
              <span className="inline-block hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default">l</span>
              <span className="inline-block hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default">l</span>
              <span className="inline-block hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default">i</span>
              <span className="inline-block hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default">n</span>
              <span className="inline-block hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default">g</span>
              <span className="inline-block hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-default">.</span>
              <span className="inline-block mx-3"></span>
              <span className="inline-block hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-default gradient-text">
                S
              </span>
              <span className="inline-block hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-default gradient-text">
                t
              </span>
              <span className="inline-block hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-default gradient-text">
                a
              </span>
              <span className="inline-block hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-default gradient-text">
                r
              </span>
              <span className="inline-block hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-default gradient-text">
                t
              </span>
              <span className="inline-block mx-2"></span>
              <span className="inline-block hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-default gradient-text">
                L
              </span>
              <span className="inline-block hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-default gradient-text">
                e
              </span>
              <span className="inline-block hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-default gradient-text">
                a
              </span>
              <span className="inline-block hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-default gradient-text">
                r
              </span>
              <span className="inline-block hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-default gradient-text">
                n
              </span>
              <span className="inline-block hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-default gradient-text">
                i
              </span>
              <span className="inline-block hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-default gradient-text">
                n
              </span>
              <span className="inline-block hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-default gradient-text">
                g
              </span>
              <span className="inline-block hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-default gradient-text">
                .
              </span>
              <span className="inline-block mx-2"></span>
              <span className="inline-block text-6xl animate-pulse cursor-default">⚡</span>
            </p>
            
            {/* Description with highlighted words */}
            <p style={{ color: 'var(--text-muted)' }} 
               className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed animate-fadeInUp animation-delay-200
                        font-medium">
              Your <span className="gradient-text font-black text-2xl md:text-3xl px-2 inline-block 
                               hover:scale-110 hover:rotate-2 transition-all duration-300 cursor-default
                               relative">
                daily AI & tech news hub
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></span>
              </span>. Aggregating the latest from{' '}
              <span style={{ color: 'var(--accent-primary)' }} 
                    className="font-black text-2xl md:text-3xl inline-block hover:scale-110 transition-all duration-300 cursor-default
                             px-2 py-1 rounded-xl border-2 border-blue-500/30 bg-blue-500/10">
                10 premium sources
              </span>{' '}
              in real-time. Bookmark and visit once daily—
              <span style={{ color: 'var(--accent-warning)' }} 
                    className="font-black text-2xl md:text-3xl inline-block hover:scale-110 hover:-rotate-3 
                             transition-all duration-300 cursor-default relative">
                no more endless scrolling!
                <svg className="absolute -right-10 top-0 w-10 h-10 text-orange-500 animate-bounce" 
                     fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </span>
            </p>

            {/* CTA Buttons - EXPLOSIVE UPGRADE */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fadeInUp animation-delay-300">
              {/* REFRESH FEED - Primary Action */}
              <button
                onClick={handleRefresh}
                className="relative px-10 py-5 rounded-2xl font-black text-lg
                         bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                         text-white overflow-hidden group
                         transition-all duration-500 hover:scale-110 hover:shadow-2xl
                         border-2 border-white/20"
                style={{
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 3s ease infinite',
                  boxShadow: '0 10px 40px rgba(139, 92, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.3)',
                  filter: 'drop-shadow(0 5px 15px rgba(139, 92, 246, 0.5))'
                }}>
                {/* Animated background waves */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                                transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
                
                {/* Rotating particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} 
                         className="absolute w-1 h-1 bg-white rounded-full"
                         style={{
                           left: `${15 + i * 15}%`,
                           top: '50%',
                           animation: `float ${2 + Math.random()}s ease-in-out infinite`,
                           animationDelay: `${i * 0.2}s`
                         }}></div>
                  ))}
                </div>
                
                {/* Content */}
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <svg className="w-6 h-6 group-hover:rotate-[360deg] transition-transform duration-700
                                group-hover:scale-125" 
                       fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" 
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="tracking-wide">Refresh Feed</span>
                  {newArticlesCount > 0 && (
                    <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold
                                   animate-pulse border-2 border-white shadow-lg">
                      +{newArticlesCount}
                    </span>
                  )}
                  <span className="inline-block group-hover:translate-x-2 transition-transform duration-300">✨</span>
                </span>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                     style={{
                       background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)',
                       filter: 'blur(20px)',
                       transform: 'scale(1.2)'
                     }}></div>
              </button>
              
              {/* BROWSE NEWS - Secondary Action */}
              <a
                href="#news-feed"
                className="relative px-10 py-5 rounded-2xl font-black text-lg
                         glass border-2 overflow-hidden group
                         transition-all duration-500 hover:scale-110 hover:shadow-2xl
                         flex items-center justify-center gap-3"
                style={{ 
                  color: 'var(--accent-secondary)',
                  borderColor: 'var(--accent-secondary)',
                  boxShadow: '0 10px 30px rgba(139, 92, 246, 0.2)'
                }}>
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{
                       background: 'linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.3) 50%, transparent 70%)',
                       backgroundSize: '200% 200%',
                       animation: 'gradient-shift 2s ease infinite'
                     }}></div>
                
                {/* Sliding background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20
                              transform translate-y-full group-hover:translate-y-0 
                              transition-transform duration-500 rounded-2xl"></div>
                
                {/* Floating arrow particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                  {[...Array(4)].map((_, i) => (
                    <div key={i}
                         className="absolute text-purple-400 font-bold text-xl"
                         style={{
                           left: `${20 + i * 20}%`,
                           top: '50%',
                           animation: `float ${2.5 + i * 0.3}s ease-in-out infinite`,
                           animationDelay: `${i * 0.15}s`,
                           transform: 'translateY(-50%)'
                         }}>
                      ↓
                    </div>
                  ))}
                </div>
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-3">
                  <span className="tracking-wide">Browse News</span>
                  <svg className="w-6 h-6 group-hover:translate-y-3 transition-transform duration-500
                                group-hover:scale-125 group-hover:rotate-12" 
                       fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
                
                {/* Pulsing rings */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-2xl border-2 border-purple-400 animate-ping"
                       style={{ animationDuration: '2s' }}></div>
                </div>
              </a>
            </div>

            {/* Feature Cards - ULTRA INTERACTIVE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {/* Card 1: Premium Sources */}
              <div className="glass rounded-3xl p-8 relative overflow-hidden group animate-scaleUp animation-delay-100 
                            transition-all duration-500 hover:scale-110 cursor-pointer
                            hover:shadow-2xl border-2"
                   style={{ 
                     borderColor: 'var(--border-color)',
                     transformStyle: 'preserve-3d'
                   }}
                   onMouseMove={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
                     const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
                     e.currentTarget.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) scale(1.1)`;
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
                   }}>
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Glow orb */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl 
                              opacity-0 group-hover:opacity-100 transition-all duration-700 
                              group-hover:scale-150 group-hover:animate-pulse"></div>
                
                {/* Icon with 3D effect - GLOBE ALWAYS ROLLING */}
                <div className="text-7xl mb-6 relative z-10 transition-all duration-500 
                              group-hover:scale-125 animate-globe-roll"
                     style={{ 
                       filter: 'drop-shadow(0 10px 20px rgba(59, 130, 246, 0.5))',
                       transformStyle: 'preserve-3d'
                     }}>
                  🌐
                </div>
                
                <h3 className="text-2xl font-black mb-4 relative z-10 transition-all duration-500 
                             group-hover:scale-105 bg-clip-text text-transparent bg-gradient-to-r 
                             from-blue-400 via-purple-400 to-cyan-400"
                    style={{ transform: 'translateZ(30px)' }}>
                  10 Premium Sources
                </h3>
                
                <p style={{ color: 'var(--text-muted)' }} 
                   className="text-base relative z-10 leading-relaxed transition-all duration-500
                            group-hover:text-opacity-100 font-medium"
                   >
                  TechCrunch, MIT AI Lab, Wired, Economic Times, Indian Express & 5 more
                </p>
                
                {/* Bottom accent with shimmer */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500
                              transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left">
                  <div className="shimmer-effect absolute inset-0"></div>
                </div>
                
                {/* Particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
                         style={{
                           left: `${20 + i * 15}%`,
                           top: `${50 + i * 10}%`,
                           animationDelay: `${i * 0.2}s`,
                           animationDuration: '3s'
                         }}></div>
                  ))}
                </div>
              </div>
              
              {/* Card 2: Real-Time Updates */}
              <div className="glass rounded-3xl p-8 relative overflow-hidden group animate-scaleUp animation-delay-200 
                            transition-all duration-500 hover:scale-110 cursor-pointer
                            hover:shadow-2xl border-2"
                   style={{ 
                     borderColor: 'var(--border-color)',
                     transformStyle: 'preserve-3d'
                   }}
                   onMouseMove={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
                     const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
                     e.currentTarget.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) scale(1.1)`;
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
                   }}>
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Glow orb */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl 
                              opacity-0 group-hover:opacity-100 transition-all duration-700 
                              group-hover:scale-150 group-hover:animate-pulse"></div>
                
                {/* Icon with rotation - REAL THUNDER STRIKING */}
                <div className="text-7xl mb-6 relative z-10 transition-all duration-500 
                              group-hover:scale-150 animate-thunder-strike"
                     style={{ 
                       transformStyle: 'preserve-3d'
                     }}>
                  ⚡
                </div>
                
                {/* MASSIVE Lightning flash effect - like real lightning */}
                <div className="absolute inset-0 bg-white animate-lightning-flash
                              pointer-events-none rounded-3xl z-20"
                     style={{
                       mixBlendMode: 'screen',
                       boxShadow: '0 0 100px 50px rgba(255, 255, 255, 0.8)'
                     }}></div>
                
                {/* Purple glow flash */}
                <div className="absolute inset-0 bg-purple-400 animate-lightning-flash
                              pointer-events-none rounded-3xl opacity-50"
                     style={{
                       animationDelay: '0.05s'
                     }}></div>
                
                <h3 className="text-2xl font-black mb-4 relative z-10 transition-all duration-500 
                             group-hover:scale-105 bg-clip-text text-transparent bg-gradient-to-r 
                             from-purple-400 via-pink-400 to-orange-400"
                    style={{ transform: 'translateZ(30px)' }}>
                  Real-Time Updates
                </h3>
                
                <p style={{ color: 'var(--text-muted)' }} 
                   className="text-base relative z-10 leading-relaxed transition-all duration-500
                            group-hover:text-opacity-100 font-medium">
                  Lightning-fast RSS aggregation. Fresh content on demand
                </p>
                
                {/* Bottom accent with shimmer */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500
                              transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left">
                  <div className="shimmer-effect absolute inset-0"></div>
                </div>
                
                {/* Lightning particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} 
                         className="absolute bg-gradient-to-b from-purple-400 via-pink-400 to-transparent"
                         style={{
                           width: `${1 + Math.random() * 2}px`,
                           height: `${15 + Math.random() * 25}px`,
                           left: `${10 + i * 11}%`,
                           top: `${20 + Math.random() * 40}%`,
                           animation: `float ${2 + Math.random()}s ease-in-out infinite`,
                           animationDelay: `${i * 0.1}s`,
                           transform: `rotate(${-20 + Math.random() * 40}deg)`,
                           boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)'
                         }}></div>
                  ))}
                </div>
              </div>
              
              {/* Card 3: Zero Noise */}
              <div className="glass rounded-3xl p-8 relative overflow-hidden group animate-scaleUp animation-delay-300 
                            transition-all duration-500 hover:scale-110 cursor-pointer
                            hover:shadow-2xl border-2"
                   style={{ 
                     borderColor: 'var(--border-color)',
                     transformStyle: 'preserve-3d'
                   }}
                   onMouseMove={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
                     const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
                     e.currentTarget.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) scale(1.1)`;
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
                   }}>
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Glow orb */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/30 rounded-full blur-3xl 
                              opacity-0 group-hover:opacity-100 transition-all duration-700 
                              group-hover:scale-150 group-hover:animate-pulse"></div>
                
                {/* Icon - DART FLYING IN AND HITTING */}
                <div className="text-7xl mb-6 relative z-10 transition-all duration-500 
                              group-hover:scale-125 animate-dart-fly-in"
                     style={{ 
                       filter: 'drop-shadow(0 10px 20px rgba(16, 185, 129, 0.5))',
                       transformStyle: 'preserve-3d',
                       transformOrigin: 'center center'
                     }}>
                  🎯
                </div>
                
                {/* Impact rings when dart hits */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="absolute w-20 h-20 border-4 border-green-400 rounded-full opacity-0"
                       style={{ 
                         animation: 'ping 0.8s cubic-bezier(0, 0, 0.2, 1) infinite',
                         animationDelay: '2.55s' // Right when dart hits
                       }}></div>
                  <div className="absolute w-32 h-32 border-4 border-emerald-400 rounded-full opacity-0"
                       style={{ 
                         animation: 'ping 0.8s cubic-bezier(0, 0, 0.2, 1) infinite',
                         animationDelay: '2.6s'
                       }}></div>
                  <div className="absolute w-44 h-44 border-4 border-teal-400 rounded-full opacity-0"
                       style={{ 
                         animation: 'ping 0.8s cubic-bezier(0, 0, 0.2, 1) infinite',
                         animationDelay: '2.65s'
                       }}></div>
                </div>
                
                <h3 className="text-2xl font-black mb-4 relative z-10 transition-all duration-500 
                             group-hover:scale-105 bg-clip-text text-transparent bg-gradient-to-r 
                             from-green-400 via-emerald-400 to-teal-400"
                    style={{ transform: 'translateZ(30px)' }}>
                  Zero Noise
                </h3>
                
                <p style={{ color: 'var(--text-muted)' }} 
                   className="text-base relative z-10 leading-relaxed transition-all duration-500
                            group-hover:text-opacity-100 font-medium">
                  Ad-free, curated content. Smart filters. Pure tech news
                </p>
                
                {/* Bottom accent with shimmer */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500
                              transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left">
                  <div className="shimmer-effect absolute inset-0"></div>
                </div>
                
                {/* Target particles with trail effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                  {/* Concentric rings */}
                  {[...Array(5)].map((_, i) => (
                    <div key={`ring-${i}`} 
                         className="absolute rounded-full border-2"
                         style={{
                           width: `${40 + i * 25}px`,
                           height: `${40 + i * 25}px`,
                           borderColor: `rgba(16, 185, 129, ${0.6 - i * 0.1})`,
                           left: '50%',
                           top: '25%',
                           transform: 'translate(-50%, -50%)',
                           animation: `ping ${2 + i * 0.3}s cubic-bezier(0, 0, 0.2, 1) infinite`,
                           animationDelay: `${i * 0.2}s`
                         }}></div>
                  ))}
                  {/* Dart trails */}
                  {[...Array(3)].map((_, i) => (
                    <div key={`trail-${i}`}
                         className="absolute w-1 h-8 bg-gradient-to-b from-green-400 to-transparent"
                         style={{
                           left: `${35 + i * 15}%`,
                           top: `${15 + i * 10}%`,
                           animation: `float ${2.5 + i * 0.5}s ease-in-out infinite`,
                           animationDelay: `${i * 0.3}s`,
                           transform: `rotate(${135 + i * 10}deg)`,
                           opacity: 0.7
                         }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Feed Section - UPGRADED */}
      <div id="news-feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Section header - STUNNING */}
        <div className="text-center mb-16 animate-fadeInUp relative">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        w-[600px] h-[200px] rounded-full blur-3xl opacity-30 -z-10"
               style={{
                 background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(139,92,246,0.3) 50%, transparent 100%)',
                 animation: 'pulse 3s ease-in-out infinite'
               }}></div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight relative inline-block"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 25%, #ec4899 50%, #06b6d4 100%)',
                backgroundSize: '300% 300%',
                animation: 'gradient-shift 6s ease infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 5px 20px rgba(59, 130, 246, 0.3))'
              }}>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-default">L</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-default">a</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-default">t</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-default">e</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-default">s</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-default">t</span>
            <span className="inline-block mx-2"></span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-default">F</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-default">e</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-default">e</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-default">d</span>
            
            {/* Underline with shimmer */}
            <span className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full overflow-hidden">
              <span className="shimmer-effect absolute inset-0"></span>
            </span>
            
            {/* Floating sparkles */}
            <span className="absolute -top-8 -right-8 text-4xl animate-bounce">✨</span>
            <span className="absolute -top-6 -left-6 text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>⚡</span>
          </h2>
          
          <p className="text-xl md:text-2xl font-bold mt-8 relative inline-block group cursor-default"
             style={{ color: 'var(--accent-info)' }}>
            <span className="relative z-10 px-6 py-3 inline-block">
              Aggregated from the world's{' '}
              <span className="font-black text-2xl md:text-3xl gradient-text 
                           hover:scale-110 transition-all duration-300 inline-block
                           relative">
                top tech publications
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full
                               transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
              </span>
            </span>
            
            {/* Glass background on hover */}
            <span className="absolute inset-0 glass rounded-2xl opacity-0 group-hover:opacity-100 
                           transition-all duration-500 -z-10 border-2"
                  style={{ borderColor: 'var(--accent-info)' }}></span>
            
            {/* Orbiting dots */}
            <span className="absolute top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100
                           animate-ping" style={{ animationDuration: '2s' }}></span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100
                           animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></span>
            <span className="absolute bottom-0 left-0 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100
                           animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }}></span>
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100
                           animate-ping" style={{ animationDuration: '2s', animationDelay: '1.5s' }}></span>
          </p>
        </div>

        {/* Live Update Banner - NEW */}
        {newArticlesCount > 0 && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
            <button
              onClick={handleRefresh}
              className="px-8 py-4 rounded-full glass backdrop-blur-xl
                       bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                       text-white font-black text-lg shadow-2xl
                       border-2 border-white/30 hover:scale-110 transition-all duration-300
                       flex items-center gap-3 group"
              style={{
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease infinite',
                boxShadow: '0 10px 40px rgba(139, 92, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.4)'
              }}>
              <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" 
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{newArticlesCount} New Article{newArticlesCount > 1 ? 's' : ''} Available!</span>
              <span className="text-2xl group-hover:scale-125 transition-transform">🔥</span>
            </button>
          </div>
        )}

        {/* Auto-refresh toggle and last update info */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300
                        flex items-center gap-2 ${autoRefreshEnabled ? 'glass border-2' : 'opacity-50 glass'}`}
              style={{
                borderColor: autoRefreshEnabled ? 'var(--accent-primary)' : 'var(--border-color)',
                color: autoRefreshEnabled ? 'var(--accent-primary)' : 'var(--text-muted)'
              }}>
              <div className={`w-3 h-3 rounded-full ${autoRefreshEnabled ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
              <span>Auto-Refresh {autoRefreshEnabled ? 'ON' : 'OFF'}</span>
            </button>
            
            {lastFetchTime && (
              <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                Last updated: {lastFetchTime.toLocaleTimeString()}
              </span>
            )}
          </div>
          
          <span className="text-sm font-bold px-4 py-2 rounded-xl glass" 
                style={{ color: 'var(--accent-info)' }}>
            {filteredNews.length} Articles
          </span>
        </div>

        <FilterBar
          sources={sources}
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onRefresh={handleRefresh}
        />

        {/* Real-time Status Indicator */}
        {lastFetchTime && (
          <div className="flex justify-center items-center gap-4 mb-8 mt-6 animate-fadeIn">
            <div className="glass rounded-full px-6 py-3 flex items-center gap-3 border-2 hover:scale-105 transition-all duration-300"
                 style={{ borderColor: 'var(--accent-success)' }}>
              {/* Pulsing live indicator */}
              <div className="relative flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
              </div>
              
              <span style={{ color: 'var(--text-primary)' }} className="font-bold text-sm">
                LIVE
              </span>
              
              <span style={{ color: 'var(--text-muted)' }} className="text-sm">
                Updated {timeSinceUpdate}s ago
              </span>
              
              {/* Auto-refresh indicator */}
              {autoRefreshEnabled && (
                <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 border border-blue-500/50 font-semibold"
                      style={{ color: 'var(--accent-info)' }}>
                  Auto-refresh: 1min
                </span>
              )}
            </div>
            
            {/* New articles notification */}
            {newArticlesCount > 0 && (
              <div className="glass rounded-full px-4 py-2 flex items-center gap-2 border-2 animate-bounce-slow"
                   style={{ borderColor: 'var(--accent-warning)' }}>
                <span className="text-xl">🔥</span>
                <span style={{ color: 'var(--accent-warning)' }} className="font-bold text-sm">
                  {newArticlesCount} new articles available!
                </span>
              </div>
            )}
          </div>
        )}

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
