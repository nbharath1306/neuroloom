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
            placeholder="Search articles..."
            className="w-full px-6 py-4 pl-14 rounded-xl glass border-2 focus:outline-none transition-all duration-300"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--glass-bg)'
            }}
          />
          <svg
            className="w-5 h-5 absolute left-5 top-1/2 transform -translate-y-1/2 transition-colors"
            style={{ color: 'var(--accent-primary)' }}
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
              className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors"
              style={{ color: 'var(--accent-secondary)' }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <button
          onClick={onRefresh}
          className="btn-primary flex items-center justify-center gap-2 sm:px-8 group"
        >
          <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Source Filter Pills */}
      <div className="glass rounded-xl p-4">
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>
          Filter by Source
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSource('all')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              selectedSource === 'all'
                ? 'gradient-text border-2'
                : ''
            }`}
            style={selectedSource === 'all' 
              ? { borderColor: 'var(--accent-primary)', backgroundColor: 'var(--bg-accent)' }
              : { color: 'var(--text-muted)', backgroundColor: 'var(--bg-secondary)' }
            }
          >
            All Sources
          </button>
          {sources.map((source) => (
            <button
              key={source.id}
              onClick={() => setSelectedSource(source.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                selectedSource === source.id
                  ? 'gradient-text border-2'
                  : ''
              }`}
              style={selectedSource === source.id 
                ? { borderColor: 'var(--accent-primary)', backgroundColor: 'var(--bg-accent)' }
                : { color: 'var(--text-muted)', backgroundColor: 'var(--bg-secondary)' }
              }
            >
              {source.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
