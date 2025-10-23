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
  const [isSummarized, setIsSummarized] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState<string>('');
  const [loadingSummary, setLoadingSummary] = useState(false);
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
    
    // Check if article has been summarized
    const summarizedArticles = JSON.parse(localStorage.getItem('neuroloom-summarized-articles') || '[]');
    setIsSummarized(summarizedArticles.includes(item.link));
  }, [item.pubDate, item.link]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    // Calculate position as percentage (0-100)
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Use requestAnimationFrame for buttery smooth updates
    requestAnimationFrame(() => {
      setMousePosition({ x, y });
    });
  };

  const handleMouseLeave = () => {
    // Reset to center position for smooth return animation
    requestAnimationFrame(() => {
      setMousePosition({ x: 50, y: 50 });
    });
  };

  const getSourceColor = (source: string) => {
    // MASSIVE COLOR PALETTE - Random vibrant colors! 🌈
    const colorPalette = [
      { bg: '#3b82f6', text: '#60a5fa', glow: 'rgba(59, 130, 246, 0.6)' },     // Blue
      { bg: '#8b5cf6', text: '#a78bfa', glow: 'rgba(139, 92, 246, 0.6)' },     // Purple
      { bg: '#10b981', text: '#34d399', glow: 'rgba(16, 185, 129, 0.6)' },     // Green
      { bg: '#f59e0b', text: '#fbbf24', glow: 'rgba(245, 158, 11, 0.6)' },     // Orange
      { bg: '#ef4444', text: '#f87171', glow: 'rgba(239, 68, 68, 0.6)' },      // Red
      { bg: '#06b6d4', text: '#22d3ee', glow: 'rgba(6, 182, 212, 0.6)' },      // Cyan
      { bg: '#14b8a6', text: '#2dd4bf', glow: 'rgba(20, 184, 166, 0.6)' },     // Teal
      { bg: '#6366f1', text: '#818cf8', glow: 'rgba(99, 102, 241, 0.6)' },     // Indigo
      { bg: '#ec4899', text: '#f472b6', glow: 'rgba(236, 72, 153, 0.6)' },     // Pink
      { bg: '#f43f5e', text: '#fb7185', glow: 'rgba(244, 63, 94, 0.6)' },      // Rose
      { bg: '#8b5cf6', text: '#a78bfa', glow: 'rgba(139, 92, 246, 0.6)' },     // Violet
      { bg: '#d946ef', text: '#e879f9', glow: 'rgba(217, 70, 239, 0.6)' },     // Fuchsia
      { bg: '#0ea5e9', text: '#38bdf8', glow: 'rgba(14, 165, 233, 0.6)' },     // Sky
      { bg: '#22c55e', text: '#4ade80', glow: 'rgba(34, 197, 94, 0.6)' },      // Lime
      { bg: '#eab308', text: '#facc15', glow: 'rgba(234, 179, 8, 0.6)' },      // Yellow
      { bg: '#f97316', text: '#fb923c', glow: 'rgba(249, 115, 22, 0.6)' },     // Amber
      { bg: '#84cc16', text: '#a3e635', glow: 'rgba(132, 204, 22, 0.6)' },     // Lime Green
      { bg: '#06b6d4', text: '#22d3ee', glow: 'rgba(6, 182, 212, 0.6)' },      // Cyan Blue
      { bg: '#a855f7', text: '#c084fc', glow: 'rgba(168, 85, 247, 0.6)' },     // Deep Purple
      { bg: '#db2777', text: '#f472b6', glow: 'rgba(219, 39, 119, 0.6)' },     // Hot Pink
    ];
    
    // Generate random but consistent color based on article link (so same article = same color)
    const hash = item.link.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colorIndex = hash % colorPalette.length;
    return colorPalette[colorIndex];
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

  // Generate AI summary
  const handleGenerateSummary = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (summary) {
      setShowSummary(!showSummary);
      return;
    }

    setLoadingSummary(true);
    setShowSummary(true);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: item.title,
          description: item.contentSnippet || ''
        })
      });

      const data = await response.json();
      setSummary(data.summary || 'Unable to generate summary');
      
      // Mark article as summarized
      const summarizedArticles = JSON.parse(localStorage.getItem('neuroloom-summarized-articles') || '[]');
      if (!summarizedArticles.includes(item.link)) {
        summarizedArticles.push(item.link);
        localStorage.setItem('neuroloom-summarized-articles', JSON.stringify(summarizedArticles));
      }
      setIsSummarized(true);
    } catch (error) {
      console.error('Summary error:', error);
      setSummary('Failed to generate summary. Please try again.');
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleCloseSummary = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSummary(false);
  };

  const handleCopySummary = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(summary);
  };

  // Calculate 3D tilt based on mouse position with enhanced sensitivity
  // Map from center (50, 50) to rotation angles
  const tiltX = (mousePosition.y - 50) / 3; // Reduced from 2.5 for smoother tilt
  const tiltY = (50 - mousePosition.x) / 3; // Reduced from 2.5 for smoother tilt
  
  // Calculate scale based on hover state
  const isHovering = mousePosition.x !== 50 || mousePosition.y !== 50;
  const scale = isHovering ? 1.05 : 1; // Reduced from 1.08 for smoothness

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
            ? 'box-shadow 0.2s ease-out, border-color 0.2s ease-out' 
            : 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: `
            0 ${20 + Math.abs(tiltX) * 2}px ${60 + Math.abs(tiltX) * 3}px -15px ${sourceColor.glow},
            0 0 ${isHovering ? '60' : '40'}px rgba(59, 130, 246, ${isHovering ? '0.4' : '0.2'}),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
          willChange: 'transform, box-shadow'
        }}>
        
        {/* Radial glow following mouse */}
        <div 
          className="absolute w-[400px] h-[400px] pointer-events-none blur-3xl"
          style={{ 
            background: `radial-gradient(circle, ${sourceColor.glow} 0%, transparent 70%)`,
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity: isHovering ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
            willChange: 'left, top, opacity'
          }}
        />
        
        {/* Dynamic shine effect following mouse */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle 200px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.15), transparent 70%)`,
            opacity: isHovering ? 1 : 0,
            transition: 'opacity 0.2s ease-out',
            willChange: 'opacity'
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
          transform: `translateZ(${isHovering ? '50' : '30'}px)`,
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          willChange: 'transform'
        }}>
          {/* Remove the checkmark badge completely */}
          
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
            <div className="flex flex-col items-end gap-1">
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
              {/* Status indicators under time */}
              <div className="flex flex-col gap-0.5">
                {isViewed && (
                  <span className="text-xs font-bold" 
                        style={{ color: 'var(--accent-success)' }}>
                    Read ✓
                  </span>
                )}
                {isSummarized && (
                  <span className="text-xs font-bold" 
                        style={{ color: 'var(--accent-info)' }}>
                    Summarized ✓
                  </span>
                )}
              </div>
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

          {/* AI Summary Section - REVOLUTION: Easy Close Button */}
          {showSummary && (
            <div className="mb-5 relative overflow-hidden rounded-2xl border-2 animate-fadeIn"
                 onClick={(e) => e.stopPropagation()}
                 style={{ 
                   borderColor: sourceColor.bg,
                   background: `linear-gradient(135deg, ${sourceColor.bg}15, ${sourceColor.text}10)`,
                   boxShadow: `0 0 30px ${sourceColor.glow}, inset 0 0 20px ${sourceColor.glow}`
                 }}>
              {/* Top accent bar */}
              <div className="h-1 w-full"
                   style={{ 
                     background: `linear-gradient(90deg, ${sourceColor.bg}, ${sourceColor.text})` 
                   }}>
                <div className="shimmer-effect absolute inset-0"></div>
              </div>
              
              <div className="p-5">
                {/* Header with BIG Close Button */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <svg className="w-5 h-5 animate-pulse" 
                           style={{ color: sourceColor.text }}
                           fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.001a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.001a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      {loadingSummary && (
                        <div className="absolute inset-0 rounded-full border-2 border-t-transparent animate-spin"
                             style={{ borderColor: sourceColor.bg }}></div>
                      )}
                    </div>
                    <span className="text-sm font-black" style={{ color: sourceColor.text }}>
                      AI Summary
                    </span>
                  </div>
                  
                  {/* Action Buttons Group */}
                  <div className="flex items-center gap-2">
                    {summary && !loadingSummary && (
                      <button
                        onClick={handleCopySummary}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300
                                 hover:scale-110 flex items-center gap-1.5"
                        style={{ 
                          backgroundColor: `${sourceColor.bg}30`,
                          color: sourceColor.text,
                          border: `2px solid ${sourceColor.bg}`
                        }}>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </button>
                    )}
                    
                    {/* BIG CLOSE BUTTON - Always Visible, Easy to Click */}
                    <button
                      onClick={handleCloseSummary}
                      className="w-8 h-8 rounded-lg flex items-center justify-center
                               transition-all duration-300 hover:scale-125 hover:rotate-90
                               relative overflow-hidden group/close"
                      style={{ 
                        backgroundColor: `${sourceColor.bg}40`,
                        border: `2px solid ${sourceColor.bg}`,
                        boxShadow: `0 0 15px ${sourceColor.glow}`
                      }}>
                      <svg className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover/close:scale-110" 
                           style={{ color: sourceColor.text }}
                           fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 opacity-0 group-hover/close:opacity-100 transition-opacity duration-300"
                           style={{ background: `radial-gradient(circle, ${sourceColor.glow}, transparent)` }}></div>
                    </button>
                  </div>
                </div>
                
                {/* Summary Content */}
                {loadingSummary ? (
                  <div className="space-y-2.5">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} 
                           className="h-3 rounded-full animate-pulse"
                           style={{ 
                             background: `linear-gradient(90deg, ${sourceColor.bg}30, ${sourceColor.text}20)`,
                             width: `${100 - i * 15}%`
                           }}></div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed font-medium"
                     style={{ color: 'var(--text-primary)' }}>
                    {summary}
                  </p>
                )}
              </div>
              
              {/* Click anywhere hint (subtle) */}
              <div className="absolute bottom-2 right-3 text-xs opacity-40 font-medium pointer-events-none"
                   style={{ color: sourceColor.text }}>
                Click ✕ to close
              </div>
            </div>
          )}

          {/* Action buttons row */}
          <div className="mt-auto pt-5 flex items-center justify-between gap-3"
               style={{ borderTop: `2px solid var(--border-color)` }}>
            {/* AI Summary Button - BIGGER & EASIER TO CLICK */}
            <button
              onClick={handleGenerateSummary}
              className="px-5 py-3 rounded-xl font-black text-sm flex items-center gap-2.5
                       transition-all duration-300 hover:scale-110 relative overflow-hidden
                       border-2 shadow-lg"
              style={{ 
                backgroundColor: summary ? `${sourceColor.bg}30` : `${sourceColor.bg}10`,
                color: sourceColor.text,
                borderColor: sourceColor.bg,
                boxShadow: summary ? `0 0 25px ${sourceColor.glow}` : `0 0 10px ${sourceColor.glow}`
              }}>
              <svg className={`w-5 h-5 ${loadingSummary ? 'animate-spin' : 'animate-pulse'}`} 
                   fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.001a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.001a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <span className="tracking-wide">
                {showSummary ? 'Hide Summary' : (summary ? 'Show Summary' : 'AI Summary')}
              </span>
              {!showSummary && summary && (
                <svg className="w-4 h-4 animate-bounce" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              )}
              {showSummary && (
                <svg className="w-4 h-4" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              )}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                   style={{ background: `linear-gradient(135deg, ${sourceColor.bg}30, transparent)` }}></div>
            </button>
            
            {/* Read Full Story - Clean Text Only */}
            <span className="text-sm font-black flex items-center gap-2 relative
                           transition-all duration-500 group-hover:translate-x-1"
                  style={{ 
                    color: sourceColor.text,
                    textShadow: `0 0 20px ${sourceColor.glow}`
                  }}>
              Read Full Story
            </span>
            
            {/* Arrow icon */}
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center 
                            transition-all duration-700 group-hover:scale-125 group-hover:rotate-[360deg]
                            group-hover:shadow-2xl relative overflow-hidden"
                 style={{ 
                   borderColor: sourceColor.bg,
                   background: `linear-gradient(135deg, ${sourceColor.bg}30, ${sourceColor.text}30)`,
                   boxShadow: `0 0 30px ${sourceColor.glow}`
                 }}>
              <svg className="w-5 h-5 transition-all duration-500 relative z-10" 
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
