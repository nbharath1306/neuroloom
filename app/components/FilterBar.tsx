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
      {/* Search Bar - STUNNING UPGRADE */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative group">
          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full px-8 py-6 pl-16 rounded-2xl glass border-2 focus:outline-none 
                     transition-all duration-500 text-lg font-medium
                     hover:scale-[1.02] focus:scale-[1.02]"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--glass-bg)',
              boxShadow: '0 10px 30px rgba(59, 130, 246, 0.1)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--accent-primary)';
              e.target.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.1)';
            }}
          />
          
          {/* Search Icon with pulse */}
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-6 h-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12"
              style={{ color: 'var(--accent-primary)' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {/* Pulsing ring on focus */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-400 
                          opacity-0 group-focus-within:opacity-100 group-focus-within:animate-ping"
                 style={{ animationDuration: '2s' }}></div>
          </div>
          
          {/* Clear button with animation */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 
                       transition-all duration-300 hover:scale-125 hover:rotate-90
                       p-2 rounded-full hover:bg-red-500/20 group/clear"
              style={{ color: 'var(--accent-secondary)' }}>
              <svg className="w-6 h-6 group-hover/clear:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          {/* Animated border glow on focus */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-focus-within:opacity-100 
                        transition-opacity duration-500 pointer-events-none -z-10"
               style={{
                 background: 'linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)',
                 backgroundSize: '200% 200%',
                 animation: 'gradient-shift 3s ease infinite',
                 filter: 'blur(15px)'
               }}></div>
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

      {/* Source Filter Pills - UPGRADED */}
      <div className="glass rounded-2xl p-6 border-2 relative overflow-hidden group"
           style={{ 
             borderColor: 'var(--border-color)',
             boxShadow: '0 10px 30px rgba(139, 92, 246, 0.1)'
           }}>
        {/* Animated background on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <h3 className="text-base font-black mb-6 flex items-center gap-3 relative z-10" 
            style={{ color: 'var(--text-secondary)' }}>
          <span className="inline-block">Filter by Source</span>
          <span className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ 
                  backgroundColor: 'var(--accent-primary)',
                  color: 'white'
                }}>
            {sources.length + 1}
          </span>
        </h3>
        
        <div className="flex flex-wrap gap-3 relative z-10">
          {/* All Sources Button */}
          <button
            onClick={() => setSelectedSource('all')}
            className={`px-5 py-3 rounded-xl text-sm font-black transition-all duration-500 
                     hover:scale-110 hover:shadow-xl relative overflow-hidden group/pill
                     ${selectedSource === 'all' ? 'border-2' : 'border border-transparent'}`}
            style={selectedSource === 'all' 
              ? { 
                  borderColor: 'var(--accent-primary)', 
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                  color: 'var(--accent-primary)',
                  boxShadow: '0 5px 20px rgba(59, 130, 246, 0.3)'
                }
              : { 
                  color: 'var(--text-muted)', 
                  backgroundColor: 'var(--bg-secondary)' 
                }
            }>
            <span className="relative z-10">All Sources</span>
            {selectedSource === 'all' && (
              <>
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30
                              opacity-50"
                     style={{
                       backgroundSize: '200% 200%',
                       animation: 'gradient-shift 3s ease infinite'
                     }}></div>
                {/* Sparkles */}
                <span className="absolute -top-1 -right-1 text-xs animate-pulse">✨</span>
              </>
            )}
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                          transform -translate-x-full group-hover/pill:translate-x-full
                          transition-transform duration-700"></div>
          </button>
          
          {/* Source Pills */}
          {sources.map((source, index) => (
            <button
              key={source.id}
              onClick={() => setSelectedSource(source.id)}
              className={`px-5 py-3 rounded-xl text-sm font-black transition-all duration-500 
                       hover:scale-110 hover:shadow-xl relative overflow-hidden group/pill
                       ${selectedSource === source.id ? 'border-2' : 'border border-transparent'}`}
              style={selectedSource === source.id 
                ? { 
                    borderColor: 'var(--accent-secondary)', 
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))',
                    color: 'var(--accent-secondary)',
                    boxShadow: '0 5px 20px rgba(139, 92, 246, 0.3)',
                    animationDelay: `${index * 0.05}s`
                  }
                : { 
                    color: 'var(--text-muted)', 
                    backgroundColor: 'var(--bg-secondary)',
                    animationDelay: `${index * 0.05}s`
                  }
              }>
              <span className="relative z-10">{source.name}</span>
              {selectedSource === source.id && (
                <>
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30
                                opacity-50"
                       style={{
                         backgroundSize: '200% 200%',
                         animation: 'gradient-shift 3s ease infinite'
                       }}></div>
                  {/* Check mark */}
                  <span className="absolute -top-1 -right-1 text-xs">✓</span>
                </>
              )}
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                            transform -translate-x-full group-hover/pill:translate-x-full
                            transition-transform duration-700"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
