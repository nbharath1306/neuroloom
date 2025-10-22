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

export default function NewsCard({ item }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getSourceColor = (source: string) => {
    const colors: { [key: string]: string } = {
      'TechCrunch': 'bg-green-500/20 text-green-300',
      'AI News': 'bg-blue-500/20 text-blue-300',
      'MIT': 'bg-purple-500/20 text-purple-300',
      'Wired AI': 'bg-orange-500/20 text-orange-300',
      'Economic Times': 'bg-yellow-500/20 text-yellow-300',
      'Indian Express': 'bg-red-500/20 text-red-300',
      'Mint': 'bg-teal-500/20 text-teal-300',
      'Express Computer': 'bg-indigo-500/20 text-indigo-300',
      'Analytics India': 'bg-pink-500/20 text-pink-300',
      'The Verge': 'bg-cyan-500/20 text-cyan-300',
    };
    return colors[source] || 'bg-gray-500/20 text-gray-300';
  };

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="glass-strong rounded-2xl p-6 hover-glow border border-white/10 hover:border-purple-500/50 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
        
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${getSourceColor(item.source)} border border-white/20`}>
              {item.source}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatDate(item.pubDate)}
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
            {item.title}
          </h3>

          {item.contentSnippet && (
            <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
              {item.contentSnippet}
            </p>
          )}

          {item.categories && item.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {item.categories.slice(0, 3).map((category, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 glass rounded-lg text-xs text-gray-300 border border-white/10"
                >
                  #{category}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-purple-400 text-sm font-semibold group-hover:text-pink-400 transition-colors">
              Read Full Article
            </span>
            <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:bg-purple-500/20 transition-all">
              <svg className="w-4 h-4 text-purple-400 group-hover:translate-x-1 group-hover:text-pink-400 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
