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
            placeholder="Search across all articles..."
            className="w-full px-6 py-4 pl-14 rounded-xl glass-strong border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
          />
          <svg
            className="w-5 h-5 text-purple-400 absolute left-5 top-1/2 transform -translate-y-1/2 group-focus-within:text-pink-400 transition-colors"
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
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <button
          onClick={onRefresh}
          className="glass-strong px-6 py-4 hover-glow text-white rounded-xl border border-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Source Filter Pills */}
      <div className="glass-strong rounded-2xl p-4 border border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="text-sm font-semibold text-gray-300">Filter by Source</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sources.map((source) => (
            <button
              key={source.id}
              onClick={() => setSelectedSource(source.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                selectedSource === source.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg shadow-purple-500/50'
                  : 'glass text-gray-300 hover:text-white border-white/10 hover:border-purple-500/50'
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
