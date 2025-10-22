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
    <div className="mb-12 space-y-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="// Search the database..."
            className="w-full px-6 py-4 pl-14 rounded-xl glass-strong border-2 border-cyan-500/30 text-cyan-100 placeholder-cyan-400/50 focus:outline-none focus:border-magenta-500/50 transition-all duration-300 font-mono"
          />
          <svg
            className="w-5 h-5 text-cyan-400 absolute left-5 top-1/2 transform -translate-y-1/2 group-focus-within:text-magenta-400 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-magenta-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <button
          onClick={onRefresh}
          className="glass-strong px-6 py-4 hover-glow text-cyan-300 rounded-xl border-2 border-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-2 group font-bold"
        >
          <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="hidden sm:inline font-mono">REFRESH</span>
        </button>
      </div>

      {/* Source Filter Pills */}
      <div className="glass-strong rounded-2xl p-4 border-2 border-cyan-500/20 neon-border">
        <div className="flex items-center gap-3 mb-3">
          <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="text-sm font-bold text-cyan-300 font-mono tracking-wider">// FILTER SOURCES</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sources.map((source) => (
            <button
              key={source.id}
              onClick={() => setSelectedSource(source.id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 border-2 font-mono ${
                selectedSource === source.id
                  ? 'bg-gradient-to-r from-cyan-600 to-magenta-600 text-white border-transparent shadow-lg shadow-cyan-500/50'
                  : 'glass text-cyan-300 hover:text-white border-cyan-500/20 hover:border-magenta-500/50'
              }`}
            >
              {source.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
