'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function FloatingProfile() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth follow effect
  useEffect(() => {
    const updatePosition = () => {
      setPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.05,
        y: prev.y + (mousePosition.y - prev.y) * 0.05
      }));
    };

    const interval = setInterval(updatePosition, 16);
    return () => clearInterval(interval);
  }, [mousePosition]);

  const socials = [
    { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/n-bharath-2b86311b9/', color: '#0A66C2' },
    { name: 'Instagram', icon: '📸', url: 'https://www.instagram.com/bharath_theunassailable/', color: '#E4405F' },
    { name: 'GitHub', icon: '🐙', url: 'https://github.com/nbharath1306', color: '#333333' },
    { name: 'X', icon: '🐦', url: 'https://x.com/nbharath_1306', color: '#1DA1F2' }
  ];

  return (
    <div
      className="fixed pointer-events-none z-50 transition-all duration-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div
        className="pointer-events-auto relative"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Collapsed State - Floating Profile Circle */}
        <div
          className={`glass-strong rounded-full border-4 overflow-hidden transition-all duration-500 cursor-pointer relative
                     ${isExpanded ? 'w-20 h-20 opacity-0 scale-0' : 'w-24 h-24 opacity-100 scale-100'}`}
          style={{
            borderColor: 'var(--accent-primary)',
            boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.3)'
          }}
        >
          {/* Rainbow spinning border */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 opacity-75 blur-sm"
               style={{
                 animation: 'spin 3s linear infinite'
               }}></div>
          
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src="/profile.jpg"
              alt="Bharath"
              fill
              className="object-cover"
            />
          </div>

          {/* Pulsing ring */}
          <div className="absolute -inset-2 rounded-full border-2 border-blue-500 opacity-50 animate-ping"></div>
        </div>

        {/* Expanded State - Card with Socials */}
        <div
          className={`glass-strong rounded-3xl border-2 overflow-hidden transition-all duration-500 absolute
                     ${isExpanded ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-50 pointer-events-none'}`}
          style={{
            borderColor: 'var(--accent-primary)',
            boxShadow: '0 20px 60px rgba(59, 130, 246, 0.5), 0 0 100px rgba(139, 92, 246, 0.4)',
            width: '280px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
          
          <div className="relative p-6">
            {/* Profile Image */}
            <div className="relative mx-auto mb-4 group/img">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75 blur-md animate-pulse"></div>
              
              <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4"
                   style={{ borderColor: 'var(--accent-primary)' }}>
                <Image
                  src="/profile.jpg"
                  alt="Bharath"
                  fill
                  className="object-cover group-hover/img:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Name */}
            <h3 className="text-2xl font-black text-center mb-1 gradient-text">
              N. Bharath
            </h3>
            
            {/* Title */}
            <p className="text-sm text-center mb-4 font-bold"
               style={{ color: 'var(--text-muted)' }}>
              Full Stack Developer & AI Enthusiast
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center
                           transition-all duration-300 hover:scale-125 hover:-rotate-12 border-2
                           relative overflow-hidden group"
                  style={{ borderColor: social.color }}
                  title={social.name}
                >
                  {/* Hover background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                       style={{ backgroundColor: `${social.color}20` }}></div>
                  
                  <span className="text-2xl relative z-10 group-hover:scale-125 transition-transform duration-300">
                    {social.icon}
                  </span>

                  {/* Pulsing ring on hover */}
                  <div className="absolute inset-0 rounded-xl border-2 opacity-0 group-hover:opacity-100 group-hover:animate-ping"
                       style={{ borderColor: social.color }}></div>
                </a>
              ))}
            </div>

            {/* Small badge */}
            <div className="mt-4 text-center">
              <span className="text-xs font-bold px-3 py-1 rounded-full glass border"
                    style={{ 
                      color: 'var(--accent-secondary)',
                      borderColor: 'var(--accent-secondary)'
                    }}>
                ✨ Creator of NeuroLoom
              </span>
            </div>
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                        transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000
                        pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
