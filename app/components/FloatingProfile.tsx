'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function FloatingProfile() {
  const [isExpanded, setIsExpanded] = useState(false);

  const socials = [
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/n-bharath-2b86311b9/', 
      color: '#0A66C2',
      logo: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/bharath_theunassailable/', 
      color: '#E4405F',
      logo: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
        </svg>
      )
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com/nbharath1306', 
      color: '#333333',
      logo: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    { 
      name: 'X', 
      url: 'https://x.com/nbharath_1306', 
      color: '#000000',
      logo: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div
        className="relative"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Collapsed State - Small Profile Circle */}
        <div
          className={`absolute bottom-0 right-0 transition-all duration-700 ease-out cursor-pointer
                     ${isExpanded ? 'opacity-0 scale-0 -rotate-180' : 'opacity-100 scale-100 rotate-0'}`}
        >
          <div className="relative w-20 h-20 group">
            {/* Animated rainbow ring - always spinning */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-500"
                 style={{ animation: 'spin 3s linear infinite' }}></div>
            
            {/* Pulsing outer ring */}
            <div className="absolute -inset-3 rounded-full border-2 border-blue-500/50 animate-ping"></div>
            
            {/* Profile image */}
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 glass-strong"
                 style={{ 
                   borderColor: 'var(--accent-primary)',
                   boxShadow: '0 10px 40px rgba(59, 130, 246, 0.6)'
                 }}>
              <Image
                src="/profile.jpg"
                alt="Bharath"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Hover indicator dot */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"
                 style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.8)' }}></div>
          </div>
        </div>

        {/* Expanded State - Beautiful Card */}
        <div
          className={`glass-strong rounded-3xl border-3 overflow-hidden transition-all duration-700 ease-out
                     ${isExpanded ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-8 pointer-events-none'}`}
          style={{
            borderColor: 'var(--accent-primary)',
            boxShadow: isExpanded 
              ? '0 25px 80px rgba(59, 130, 246, 0.6), 0 0 120px rgba(139, 92, 246, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)' 
              : 'none',
            width: '320px',
            transformOrigin: 'bottom right'
          }}
        >
          {/* Mega animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-100"></div>
          
          {/* Floating orbs */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          
          <div className="relative p-8">
            {/* Profile Image */}
            <div className="relative mx-auto mb-5 w-28 h-28 group/img">
              {/* Mega glow */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75 blur-xl group-hover/img:opacity-100 transition-all duration-700"
                   style={{ animation: 'pulse 2s ease-in-out infinite' }}></div>
              
              {/* Rotating border */}
              <div className="absolute -inset-2 rounded-full border-4 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500"
                   style={{
                     animation: 'spin 4s linear infinite',
                     WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                     WebkitMaskComposite: 'xor',
                     maskComposite: 'exclude',
                     padding: '3px'
                   }}></div>
              
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 glass-strong"
                   style={{ borderColor: 'var(--accent-primary)' }}>
                <Image
                  src="/profile.jpg"
                  alt="Bharath"
                  fill
                  className="object-cover group-hover/img:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Active indicator */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white animate-pulse"
                   style={{ boxShadow: '0 0 25px rgba(34, 197, 94, 1)' }}></div>
            </div>

            {/* Name with gradient */}
            <h3 className="text-3xl font-black text-center mb-2 tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 5s ease infinite',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
              N. Bharath
            </h3>
            
            {/* Title badge */}
            <div className="flex flex-col gap-2 mb-6">
              <div className="glass rounded-xl px-4 py-2 text-center border-2 transition-all duration-500 hover:scale-105"
                   style={{ borderColor: 'var(--accent-secondary)' }}>
                <p className="text-sm font-bold"
                   style={{ color: 'var(--accent-secondary)' }}>
                  Full Stack Developer
                </p>
              </div>
              <div className="glass rounded-xl px-4 py-2 text-center border-2 transition-all duration-500 hover:scale-105"
                   style={{ borderColor: 'var(--accent-info)' }}>
                <p className="text-sm font-bold"
                   style={{ color: 'var(--accent-info)' }}>
                  AI Enthusiast
                </p>
              </div>
            </div>

            {/* Social Links - STUNNING */}
            <div className="flex justify-center gap-3 mb-5">
              {socials.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-14 h-14 rounded-2xl glass flex items-center justify-center
                           transition-all duration-500 hover:scale-125 hover:-translate-y-2 border-2
                           group/social cursor-pointer"
                  style={{ 
                    borderColor: social.color,
                    transitionDelay: `${index * 50}ms`,
                    color: social.color
                  }}
                  title={social.name}
                >
                  {/* Animated background on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/social:opacity-100 transition-all duration-500"
                       style={{ 
                         background: `linear-gradient(135deg, ${social.color}30, ${social.color}10)`,
                         filter: 'blur(8px)'
                       }}></div>
                  
                  {/* Logo */}
                  <div className="relative z-10 transform group-hover/social:rotate-12 group-hover/social:scale-110 transition-all duration-500">
                    {social.logo}
                  </div>

                  {/* Expanding rings on hover */}
                  <div className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover/social:opacity-100 group-hover/social:scale-150 transition-all duration-500"
                       style={{ borderColor: social.color }}></div>
                  <div className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover/social:opacity-50 group-hover/social:scale-[2] transition-all duration-700"
                       style={{ borderColor: social.color }}></div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/social:opacity-100 transition-opacity duration-500"
                       style={{ 
                         boxShadow: `0 0 30px ${social.color}`,
                         filter: 'blur(10px)'
                       }}></div>

                  {/* Floating particles on hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/social:opacity-100">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: social.color,
                          left: `${25 + i * 20}%`,
                          top: `${20 + i * 15}%`,
                          animation: `float ${2 + i * 0.3}s ease-in-out infinite`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </a>
              ))}
            </div>

            {/* Creator badge */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-2 transition-all duration-500 hover:scale-105"
                   style={{ 
                     borderColor: 'var(--accent-warning)',
                     color: 'var(--accent-warning)'
                   }}>
                <span className="text-xl animate-pulse">✨</span>
                <span className="text-sm font-black">Creator of NeuroLoom</span>
              </div>
            </div>
          </div>

          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                        opacity-0 group-hover:opacity-100 pointer-events-none"
               style={{
                 animation: 'shimmer-sweep 2s ease-in-out infinite',
               }}></div>
        </div>
      </div>
    </div>
  );
}

