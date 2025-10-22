'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen animated-gradient flex items-center justify-center px-4">
      <div className="glass-strong rounded-2xl p-12 max-w-2xl w-full text-center neon-border">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-400 mb-8">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="glass-strong px-8 py-4 rounded-xl font-semibold text-white hover-glow neon-border"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="glass px-8 py-4 rounded-xl font-semibold text-white hover-glow border border-purple-500/50"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
