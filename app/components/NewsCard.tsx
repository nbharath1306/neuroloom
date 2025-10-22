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

import { useState, useEffect, useRef } from 'react';

export default function NewsCard({ item }: NewsCardProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isViewed, setIsViewed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
    
    // Check if article has been viewed
    const viewedArticles = JSON.parse(localStorage.getItem('neuroloom-viewed-articles') || '[]');
    setIsViewed(viewedArticles.includes(item.link));
  }, [item.pubDate, item.link]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    // Calculate position as percentage (0-100)
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    // Reset to center position for smooth return animation
    setMousePosition({ x: 50, y: 50 });
  };

  const getSourceColor = (source: string) => {
    const colors: { [key: string]: { bg: string; text: string; glow: string } } = {
      'TechCrunch': { bg: '#3b82f6', text: '#60a5fa', glow: 'rgba(59, 130, 246, 0.6)' },
      'AI News': { bg: '#8b5cf6', text: '#a78bfa', glow: 'rgba(139, 92, 246, 0.6)' },
      'MIT': { bg: '#10b981', text: '#34d399', glow: 'rgba(16, 185, 129, 0.6)' },
      'Wired AI': { bg: '#f59e0b', text: '#fbbf24', glow: 'rgba(245, 158, 11, 0.6)' },
      'Economic Times': { bg: '#ef4444', text: '#f87171', glow: 'rgba(239, 68, 68, 0.6)' },
      'Indian Express': { bg: '#06b6d4', text: '#22d3ee', glow: 'rgba(6, 182, 212, 0.6)' },
      'Mint': { bg: '#14b8a6', text: '#2dd4bf', glow: 'rgba(20, 184, 166, 0.6)' },
      'Express Computer': { bg: '#6366f1', text: '#818cf8', glow: 'rgba(99, 102, 241, 0.6)' },
      'Analytics India': { bg: '#ec4899', text: '#f472b6', glow: 'rgba(236, 72, 153, 0.6)' },
      'The Verge': { bg: '#8b5cf6', text: '#a78bfa', glow: 'rgba(139, 92, 246, 0.6)' },
    };
    return colors[source] || { bg: '#6b7280', text: '#9ca3af', glow: 'rgba(107, 114, 128, 0.6)' };
  };

  const sourceColor = getSourceColor(item.source);

  // Save scroll position when clicking the link
  const handleClick = () => {
    sessionStorage.setItem('neuroloom-scroll-position', window.scrollY.toString());
    
    // Mark article as viewed
    const viewedArticles = JSON.parse(localStorage.getItem('neuroloom-viewed-articles') || '[]');
    if (!viewedArticles.includes(item.link)) {
      viewedArticles.push(item.link);
      localStorage.setItem('neuroloom-viewed-articles', JSON.stringify(viewedArticles));
    }
    setIsViewed(true);
  };

  // Calculate 3D tilt based on mouse position with enhanced sensitivity
  // Map from center (50, 50) to rotation angles
  const tiltX = (mousePosition.y - 50) / 2.5; // Vertical tilt (up/down)
  const tiltY = (50 - mousePosition.x) / 2.5; // Horizontal tilt (left/right)
  
  // Calculate scale based on hover state
  const isHovering = mousePosition.x !== 50 || mousePosition.y !== 50;
  const scale = isHovering ? 1.08 : 1;

  return (
    <a
      href={item.link}
      onClick={handleClick}
      className="block group perspective-1000"
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass rounded-3xl p-7 h-full flex flex-col relative overflow-hidden border-2"
        style={{ 
          borderColor: 'var(--border-color)',
          opacity: isViewed ? 0.7 : 1,
          transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`,
          transformStyle: 'preserve-3d',
          transition: isHovering 
            ? 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.1s ease-out' 
            : 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: `
            0 ${20 + Math.abs(tiltX) * 2}px ${60 + Math.abs(tiltX) * 3}px -15px ${sourceColor.glow},
            0 0 ${isHovering ? '60' : '40'}px rgba(59, 130, 246, ${isHovering ? '0.4' : '0.2'}),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
          willChange: 'transform'
        }}>
        
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 
                         animate-float"
              style={{
                background: sourceColor.bg,
                left: `${(i * 12.5)}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.15}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                boxShadow: `0 0 10px ${sourceColor.glow}`
              }}
            />
          ))}
        </div>
        
        {/* Radial glow following mouse */}
        <div 
          className="absolute w-[400px] h-[400px] opacity-0 group-hover:opacity-100 
                     transition-opacity duration-700 pointer-events-none blur-3xl"
          style={{ 
            background: `radial-gradient(circle, ${sourceColor.glow} 0%, transparent 70%)`,
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            transition: isHovering ? 'left 0.1s ease-out, top 0.1s ease-out' : 'opacity 0.7s ease'
          }}
        />
        
        {/* Dynamic shine effect following mouse */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: `radial-gradient(circle 200px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.15), transparent 70%)`,
            transition: isHovering ? 'left 0.05s ease-out, top 0.05s ease-out, opacity 0.3s ease' : 'opacity 0.5s ease'
          }}
        />
        
        {/* Neon border glow */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
                        transition-opacity duration-500"
             style={{ 
               boxShadow: `
                 inset 0 0 20px ${sourceColor.glow},
                 0 0 40px ${sourceColor.glow}
               `,
               pointerEvents: 'none'
             }}></div>

        {/* Top accent line with shimmer */}
        <div className="absolute top-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 
                        transition-transform duration-1000 ease-out origin-left overflow-hidden"
             style={{ background: `linear-gradient(90deg, ${sourceColor.bg}, ${sourceColor.text})` }}>
          <div className="absolute inset-0 shimmer-effect"></div>
        </div>

        <div className="relative z-10" style={{ 
          transform: `translateZ(${isHovering ? '60' : '30'}px)`,
          transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          {/* REVOLUTIONARY Viewed Badge */}
          {isViewed && (
            <div className="absolute top-2 right-2 z-20 animate-fadeIn">
              <div className="relative group/viewed">
                {/* Main badge with gradient */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full 
                              bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500
                              border-2 border-white shadow-xl backdrop-blur-sm
                              transition-all duration-500 hover:scale-110 hover:rotate-3"
                     style={{
                       boxShadow: '0 8px 25px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.3)',
                       backgroundSize: '200% 200%',
                       animation: 'gradient-shift 3s ease infinite'
                     }}>
                  {/* Checkmark icon */}
                  <svg className="w-5 h-5 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {/* "Read" text */}
                  <span className="text-xs font-black text-white tracking-wide drop-shadow-lg">
                    READ
                  </span>
                </div>
                
                {/* Pulsing rings */}
                <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-60"
                     style={{ animationDuration: '2s' }}></div>
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-40"
                     style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
                
                {/* Rotating shine effect */}
                <div className="absolute inset-0 rounded-full opacity-60 pointer-events-none overflow-hidden"
                     style={{
                       background: 'conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
                       animation: 'spin 3s linear infinite'
                     }}></div>
                
                {/* Floating sparkles */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/viewed:opacity-100 transition-opacity">
                  {[...Array(4)].map((_, i) => (
                    <div key={i}
                         className="absolute text-xs"
                         style={{
                           left: i % 2 === 0 ? '-10px' : 'calc(100% + 5px)',
                           top: `${25 + i * 15}%`,
                           animation: `float ${1.5 + Math.random()}s ease-in-out infinite`,
                           animationDelay: `${i * 0.2}s`
                         }}>
                      ✨
                    </div>
                  ))}
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover/viewed:opacity-100 
                              transition-opacity duration-500 -z-10 blur-xl"
                     style={{
                       background: 'radial-gradient(circle, rgba(34, 197, 94, 0.8) 0%, transparent 70%)',
                       transform: 'scale(1.5)'
                     }}></div>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between mb-5">
            <span className="px-4 py-2 rounded-xl text-xs font-bold border-2
                           transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl
                           relative overflow-hidden"
                  style={{ 
                    backgroundColor: `${sourceColor.bg}20`,
                    color: sourceColor.text,
                    borderColor: sourceColor.bg,
                    boxShadow: `0 0 20px ${sourceColor.glow}`
                  }}>
              <span className="relative z-10">{item.source}</span>
              {/* Animated background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{ 
                     background: `linear-gradient(45deg, ${sourceColor.bg}40, transparent)` 
                   }}></div>
            </span>
            <div className="flex items-center gap-2 text-xs transition-all duration-500 
                           group-hover:scale-110 group-hover:translate-x-1" 
                 style={{ color: 'var(--text-muted)' }}>
              <div className="relative">
                <svg className="w-4 h-4 transition-all duration-700 group-hover:rotate-[360deg]
                              group-hover:scale-125" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
                     style={{ filter: `drop-shadow(0 0 8px ${sourceColor.glow})` }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
                                animate-ping"
                     style={{ background: sourceColor.glow }}></div>
              </div>
              <span className="font-semibold">{formattedDate || 'Loading...'}</span>
            </div>
          </div>

          <h3 className="text-xl font-black mb-4 line-clamp-2 transition-all duration-500 
                       group-hover:scale-[1.03] leading-tight"
              style={{ 
                color: 'var(--text-primary)',
                textShadow: `0 0 30px ${sourceColor.glow}`
              }}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r 
                           group-hover:from-[var(--accent-primary)] group-hover:via-[var(--accent-secondary)] 
                           group-hover:to-[var(--accent-info)] transition-all duration-700"
                  style={{ 
                    backgroundImage: 'none',
                    WebkitTextFillColor: 'var(--text-primary)',
                    transition: 'all 0.7s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundImage = `linear-gradient(135deg, ${sourceColor.bg}, ${sourceColor.text})`;
                    (e.currentTarget.style as any).webkitTextFillColor = 'transparent';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundImage = 'none';
                    (e.currentTarget.style as any).webkitTextFillColor = 'var(--text-primary)';
                  }}>
              {item.title}
            </span>
          </h3>

          {item.contentSnippet && (
            <p className="text-sm line-clamp-3 mb-5 flex-grow leading-relaxed 
                          transition-all duration-500 group-hover:text-opacity-100
                          group-hover:translate-x-1"
               style={{ color: 'var(--text-muted)' }}>
              {item.contentSnippet}
            </p>
          )}

          {item.categories && item.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {item.categories.slice(0, 3).map((category, idx) => (
                <span
                  key={`${category}-${idx}`}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold
                           transition-all duration-500 hover:scale-125 hover:shadow-xl 
                           cursor-pointer relative overflow-hidden group/tag"
                  style={{ 
                    backgroundColor: 'var(--bg-accent)',
                    color: 'var(--text-muted)',
                    border: '2px solid var(--border-color)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = sourceColor.bg;
                    e.currentTarget.style.color = sourceColor.text;
                    e.currentTarget.style.boxShadow = `0 0 20px ${sourceColor.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                  <span className="relative z-10">#{category}</span>
                  {/* Sweep effect */}
                  <div className="absolute inset-0 transform -translate-x-full 
                                  group-hover/tag:translate-x-0 transition-transform duration-500"
                       style={{ 
                         background: `linear-gradient(90deg, transparent, ${sourceColor.bg}20, transparent)` 
                       }}></div>
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto pt-5 flex items-center justify-between 
                          transition-all duration-500 group-hover:translate-x-2"
               style={{ borderTop: `2px solid var(--border-color)` }}>
            <span className="text-base font-black flex items-center gap-2 relative"
                  style={{ 
                    color: sourceColor.text,
                    textShadow: `0 0 20px ${sourceColor.glow}`
                  }}>
              Read Full Story
              <svg className="w-5 h-5 transition-all duration-500 group-hover:translate-x-2" 
                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center 
                            transition-all duration-700 group-hover:scale-150 group-hover:rotate-[360deg]
                            group-hover:shadow-2xl relative overflow-hidden"
                 style={{ 
                   borderColor: sourceColor.bg,
                   background: `linear-gradient(135deg, ${sourceColor.bg}30, ${sourceColor.text}30)`,
                   boxShadow: `0 0 30px ${sourceColor.glow}`
                 }}>
              <svg className="w-6 h-6 transition-all duration-500 relative z-10" 
                   style={{ color: sourceColor.text }}
                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              {/* Rotating glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-500 animate-spin-slow"
                   style={{ 
                     background: `conic-gradient(from 0deg, transparent, ${sourceColor.glow}, transparent)` 
                   }}></div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
