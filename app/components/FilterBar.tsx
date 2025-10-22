interface Source {
  id: string;
  name: string;
}

interface FilterBarProps {
  sources: Source[];
  selectedSource: string;
  setSelectedSource: (source: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onRefresh: () => void;
}

export default function FilterBar({
  sources,
  selectedSource,
  setSelectedSource,
  searchQuery,
  setSearchQuery,
  onRefresh,
}: FilterBarProps) {
  return (
    <div className="mb-16 space-y-8">
      {/* Search Bar - MEGA UPGRADE */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative group">
          {/* Glowing rings that appear on focus */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-focus-within:opacity-100 
                        transition-opacity duration-500 -z-10">
            <div className="absolute inset-0 rounded-2xl border-4 border-blue-400 animate-ping"
                 style={{ animationDuration: '2s' }}></div>
            <div className="absolute inset-0 rounded-2xl border-4 border-purple-400 animate-ping"
                 style={{ animationDuration: '2.5s', animationDelay: '0.3s' }}></div>
            <div className="absolute inset-0 rounded-2xl border-4 border-cyan-400 animate-ping"
                 style={{ animationDuration: '3s', animationDelay: '0.6s' }}></div>
          </div>
          
          {/* Main search input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for AI, tech, startups..."
            className="w-full px-10 py-7 pl-20 rounded-2xl glass border-4 focus:outline-none 
                     transition-all duration-700 text-xl font-bold
                     hover:scale-[1.03] focus:scale-[1.05]
                     placeholder:text-lg placeholder:font-medium"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--glass-bg)',
              boxShadow: '0 15px 40px rgba(59, 130, 246, 0.15)',
              backdropFilter: 'blur(20px) saturate(180%)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--accent-primary)';
              e.target.style.boxShadow = `
                0 30px 60px rgba(59, 130, 246, 0.5),
                0 0 100px rgba(139, 92, 246, 0.4),
                inset 0 0 40px rgba(59, 130, 246, 0.1)
              `;
              e.target.style.transform = 'scale(1.05) translateY(-2px)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.15)';
              e.target.style.transform = 'scale(1)';
            }}
          />
          
          {/* Animated search icon - way more dramatic */}
          <div className="absolute left-7 top-1/2 transform -translate-y-1/2">
            {/* Pulsing background circle */}
            <div className="absolute inset-0 w-10 h-10 -m-2 rounded-full 
                          bg-gradient-to-r from-blue-500/30 to-purple-500/30
                          opacity-0 group-focus-within:opacity-100 group-focus-within:animate-pulse"
                 style={{ animationDuration: '1.5s' }}></div>
            
            {/* Main icon */}
            <svg
              className="w-7 h-7 relative z-10 transition-all duration-700 
                       group-hover:scale-150 group-hover:rotate-[360deg]
                       group-focus-within:scale-125 group-focus-within:rotate-12"
              style={{ 
                color: 'var(--accent-primary)',
                filter: 'drop-shadow(0 4px 12px rgba(59, 130, 246, 0.6))'
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            
            {/* Multiple pulsing rings */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-400 
                          opacity-0 group-focus-within:opacity-100 animate-ping -m-3"
                 style={{ animationDuration: '1.5s' }}></div>
            <div className="absolute inset-0 rounded-full border-2 border-purple-400 
                          opacity-0 group-focus-within:opacity-100 animate-ping -m-4"
                 style={{ animationDuration: '2s', animationDelay: '0.3s' }}></div>
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 
                          opacity-0 group-focus-within:opacity-100 animate-ping -m-5"
                 style={{ animationDuration: '2.5s', animationDelay: '0.6s' }}></div>
          </div>
          
          {/* Clear button - more explosive */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 
                       transition-all duration-500 hover:scale-150 hover:rotate-180
                       p-3 rounded-full group/clear relative overflow-hidden
                       border-2 border-transparent hover:border-red-500"
              style={{ 
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.2))',
                boxShadow: '0 5px 20px rgba(239, 68, 68, 0.3)'
              }}>
              {/* Explosion effect on hover */}
              <div className="absolute inset-0 bg-red-500 opacity-0 group-hover/clear:opacity-20 
                            transition-opacity duration-300 rounded-full"></div>
              
              {/* Pulsing rings */}
              <div className="absolute inset-0 rounded-full border-2 border-red-500 
                            opacity-0 group-hover/clear:opacity-100 group-hover/clear:animate-ping -m-2"
                   style={{ animationDuration: '0.8s' }}></div>
              
              <svg className="w-7 h-7 relative z-10 transition-colors duration-300 
                            group-hover/clear:text-red-500 group-hover/clear:scale-125" 
                   fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                   style={{ color: 'var(--accent-secondary)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          {/* MASSIVE animated border glow on focus */}
          <div className="absolute -inset-1 rounded-2xl opacity-0 group-focus-within:opacity-100 
                        transition-opacity duration-700 pointer-events-none -z-10"
               style={{
                 background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6)',
                 backgroundSize: '400% 400%',
                 animation: 'gradient-shift 3s ease infinite',
                 filter: 'blur(30px)'
               }}></div>
          
          {/* Floating sparkles on focus */}
          <div className="absolute inset-0 opacity-0 group-focus-within:opacity-100 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div key={i}
                   className="absolute text-2xl"
                   style={{
                     left: `${(i * 8.33)}%`,
                     top: i % 2 === 0 ? '-20px' : 'calc(100% + 10px)',
                     animation: `float ${2 + Math.random()}s ease-in-out infinite`,
                     animationDelay: `${i * 0.15}s`,
                     filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.8))'
                   }}>
                {['✨', '⚡', '💫', '🌟'][i % 4]}
              </div>
            ))}
          </div>
        </div>
        
        {/* Refresh Button - EXPLOSIVE */}
        <button
          onClick={onRefresh}
          className="relative px-8 py-6 rounded-2xl font-black text-lg
                   bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500
                   text-white overflow-hidden group/refresh
                   transition-all duration-500 hover:scale-110 hover:shadow-2xl
                   border-2 border-white/20 sm:px-10"
          style={{
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 4s ease infinite',
            boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)',
            minWidth: '140px'
          }}>
          {/* Rotating particles */}
          <div className="absolute inset-0 opacity-0 group-hover/refresh:opacity-100">
            {[...Array(8)].map((_, i) => (
              <div key={i} 
                   className="absolute w-1 h-1 bg-white rounded-full"
                   style={{
                     left: `${12.5 * i}%`,
                     top: '50%',
                     animation: `float ${1.5 + Math.random()}s ease-in-out infinite`,
                     animationDelay: `${i * 0.1}s`
                   }}></div>
            ))}
          </div>
          
          {/* Sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                        transform -translate-x-full group-hover/refresh:translate-x-full 
                        transition-transform duration-1000"></div>
          
          {/* Content */}
          <span className="relative z-10 flex items-center justify-center gap-3">
            <svg className="w-6 h-6 group-hover/refresh:rotate-[360deg] transition-transform duration-700
                          group-hover/refresh:scale-125" 
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="hidden sm:inline tracking-wide">Refresh</span>
          </span>
          
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/refresh:opacity-100 
                        transition-opacity duration-500 -z-10"
               style={{
                 background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)',
                 filter: 'blur(25px)',
                 transform: 'scale(1.3)'
               }}></div>
        </button>
      </div>

      {/* Source Filter Pills - MEGA UPGRADE */}
      <div className="glass rounded-2xl p-6 border-2 relative overflow-hidden group"
           style={{ 
             borderColor: 'var(--border-color)',
             boxShadow: '0 10px 30px rgba(139, 92, 246, 0.1)'
           }}>
        {/* Animated mesh background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-0 left-0 w-full h-full"
               style={{
                 background: `
                   radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
                   radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
                   radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)
                 `,
                 animation: 'pulse 4s ease-in-out infinite'
               }}></div>
        </div>
        
        <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10 group/header" 
            style={{ color: 'var(--text-secondary)' }}>
          <span className="inline-block relative">
            Filter by Source
            {/* Animated underline */}
            <div className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                          rounded-full transition-all duration-500 group-hover/header:w-full"
                 style={{
                   boxShadow: '0 0 10px rgba(139, 92, 246, 0.6)'
                 }}></div>
          </span>
          <span className="px-4 py-2 rounded-full text-sm font-bold
                         bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                         text-white relative overflow-hidden group/badge
                         transition-all duration-500 hover:scale-125 hover:rotate-12"
                style={{ 
                  boxShadow: '0 5px 20px rgba(59, 130, 246, 0.4), 0 0 30px rgba(139, 92, 246, 0.3)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 3s ease infinite'
                }}>
            <span className="relative z-10">{sources.length}</span>
            {/* Rotating glow */}
            <div className="absolute inset-0 opacity-50 animate-spin-slow"
                 style={{ 
                   background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.5), transparent)',
                   animationDuration: '3s'
                 }}></div>
            {/* Sparkle effect */}
            <span className="absolute -top-1 -right-1 text-xs animate-pulse">✨</span>
          </span>
        </h3>
        
        <div className="flex flex-wrap gap-3 relative z-10">
          {/* All Sources Button - EXPLOSIVE */}
          <button
            onClick={() => setSelectedSource('all')}
            className={`px-6 py-4 rounded-2xl text-sm font-black transition-all duration-500 
                     hover:scale-110 hover:shadow-2xl relative overflow-hidden group/pill
                     ${selectedSource === 'all' ? 'border-3' : 'border-2 border-transparent'}`}
            style={selectedSource === 'all' 
              ? { 
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
                  borderColor: 'var(--accent-primary)', 
                  color: 'var(--accent-primary)',
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 4s ease infinite'
                }
              : { 
                  color: 'var(--text-muted)', 
                  backgroundColor: 'var(--bg-secondary)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                }
            }>
            <span className="relative z-10 flex items-center gap-2">
              {selectedSource === 'all' && (
                <span className="text-lg animate-bounce">🌟</span>
              )}
              All Sources
              {selectedSource === 'all' && (
                <span className="text-lg animate-pulse">✨</span>
              )}
            </span>
            
            {selectedSource === 'all' && (
              <>
                {/* Mega animated gradient background */}
                <div className="absolute inset-0 opacity-60"
                     style={{
                       background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.4))',
                       backgroundSize: '400% 400%',
                       animation: 'gradient-shift 3s ease infinite'
                     }}></div>
                
                {/* Pulsing rings */}
                <div className="absolute inset-0 rounded-2xl border-2 border-blue-400 animate-ping opacity-30"></div>
                <div className="absolute inset-0 rounded-2xl border-2 border-purple-400 animate-ping opacity-20"
                     style={{ animationDelay: '0.5s' }}></div>
                
                {/* Sparkles floating around */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div key={i}
                         className="absolute text-sm"
                         style={{
                           left: `${(i * 16.66)}%`,
                           top: i % 2 === 0 ? '-10px' : 'calc(100% + 5px)',
                           animation: `float ${2 + Math.random()}s ease-in-out infinite`,
                           animationDelay: `${i * 0.2}s`
                         }}>
                      {['✨', '⚡', '💫'][i % 3]}
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {/* Hover sweep effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                          transform -translate-x-full group-hover/pill:translate-x-full
                          transition-transform duration-1000"></div>
          </button>
          
          {/* Source Pills - STUNNING UPGRADE */}
          {sources.map((source, index) => (
            <button
              key={source.id}
              onClick={() => setSelectedSource(source.id)}
              className={`px-6 py-4 rounded-2xl text-sm font-black transition-all duration-500 
                       hover:scale-110 hover:shadow-2xl hover:rotate-2 relative overflow-hidden group/pill
                       ${selectedSource === source.id ? 'border-3' : 'border-2 border-transparent'}`}
              style={selectedSource === source.id 
                ? { 
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
                    borderColor: 'var(--accent-secondary)', 
                    color: 'var(--accent-secondary)',
                    boxShadow: '0 10px 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(236, 72, 153, 0.3)',
                    animationDelay: `${index * 0.05}s`,
                    backgroundSize: '200% 200%',
                    animation: 'gradient-shift 4s ease infinite'
                  }
                : { 
                    color: 'var(--text-muted)', 
                    backgroundColor: 'var(--bg-secondary)',
                    animationDelay: `${index * 0.05}s`,
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                  }
              }>
              <span className="relative z-10 flex items-center gap-2">
                {selectedSource === source.id && (
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                        style={{
                          boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)'
                        }}></span>
                )}
                {source.name}
                {selectedSource === source.id && (
                  <span className="text-base animate-bounce">✓</span>
                )}
              </span>
              
              {selectedSource === source.id && (
                <>
                  {/* Mega animated gradient background */}
                  <div className="absolute inset-0 opacity-60"
                       style={{
                         background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.4), rgba(6, 182, 212, 0.4))',
                         backgroundSize: '400% 400%',
                         animation: 'gradient-shift 3s ease infinite'
                       }}></div>
                  
                  {/* Pulsing outer ring */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-purple-400 animate-ping opacity-40"></div>
                  
                  {/* Rotating shine effect */}
                  <div className="absolute inset-0 opacity-50"
                       style={{
                         background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255, 255, 255, 0.3) 90deg, transparent 180deg)',
                         animation: 'spin 3s linear infinite'
                       }}></div>
                </>
              )}
              
              {/* Hover sweep effect - enhanced */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                            transform -translate-x-full group-hover/pill:translate-x-full
                            transition-transform duration-1000"></div>
              
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/pill:opacity-100 
                            transition-opacity duration-500 -z-10"
                   style={{
                     background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
                     filter: 'blur(20px)',
                     transform: 'scale(1.2)'
                   }}></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
