'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  color: string;
  hoverColor: string;
}

export default function ProfileShowcase() {
  const [isHovered, setIsHovered] = useState(false);

  const socials: SocialLink[] = [
    {
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://www.linkedin.com/in/n-bharath-2b86311b9/',
      color: '#0A66C2',
      hoverColor: '#004182'
    },
    {
      name: 'Instagram',
      icon: '�',
      url: 'https://www.instagram.com/bharath_theunassailable/',
      color: '#E4405F',
      hoverColor: '#c13584'
    },
    {
      name: 'GitHub',
      icon: '�',
      url: 'https://github.com/nbharath1306',
      color: '#333333',
      hoverColor: '#000000'
    },
    {
      name: 'X (Twitter)',
      icon: '�',
      url: 'https://x.com/nbharath_1306',
      color: '#1DA1F2',
      hoverColor: '#0d8bd9'
    }
  ];

  return (
    <div className="relative w-full py-32 overflow-hidden">
      {/* Massive animated background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-pink-500/30 to-orange-500/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`profile-particle-${i}`}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              background: `var(--accent-${['primary', 'secondary', 'info', 'pink', 'warning'][i % 5]})`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-20 animate-fadeInUp">
          <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tight relative inline-block group cursor-default"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 25%, #ec4899 50%, #f59e0b 75%, #10b981 100%)',
                backgroundSize: '300% 300%',
                animation: 'gradient-shift 8s ease infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 10px 40px rgba(59, 130, 246, 0.3))',
              }}>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300">M</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300">e</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300">e</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300">t</span>
            <span className="inline-block mx-3"></span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300">T</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300">h</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300">e</span>
            <span className="inline-block mx-3"></span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300">C</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300">r</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300">e</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300">a</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300">t</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300">o</span>
            <span className="inline-block hover:scale-110 hover:rotate-3 transition-all duration-300">r</span>
            
            {/* Animated underline */}
            <span className="absolute -bottom-4 left-0 w-full h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full overflow-hidden">
              <span className="shimmer-effect absolute inset-0"></span>
            </span>
            
            {/* Floating emojis */}
            <span className="absolute -top-12 -right-12 text-5xl animate-bounce">👨‍💻</span>
            <span className="absolute -top-10 -left-10 text-4xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</span>
          </h2>
        </div>

        {/* Main Profile Card */}
        <div className="relative">
          {/* Glow rings */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="absolute w-[500px] h-[500px] rounded-full border-4 border-blue-500/20 animate-ping" style={{ animationDuration: '4s' }}></div>
            <div className="absolute w-[600px] h-[600px] rounded-full border-4 border-purple-500/20 animate-ping" style={{ animationDuration: '5s', animationDelay: '0.5s' }}></div>
            <div className="absolute w-[700px] h-[700px] rounded-full border-4 border-pink-500/20 animate-ping" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
          </div>

          <div 
            className="glass-strong rounded-[3rem] p-16 relative overflow-hidden group transition-all duration-700 border-4"
            style={{ 
              borderColor: 'var(--accent-primary)',
              transform: isHovered ? 'scale(1.02) translateY(-10px)' : 'scale(1)',
              boxShadow: isHovered 
                ? '0 40px 80px rgba(59, 130, 246, 0.4), 0 0 100px rgba(139, 92, 246, 0.3)' 
                : 'var(--shadow-2xl)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Epic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Mega rotating orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-spin-slow"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-spin-slow" style={{ animationDelay: '1s', animationDirection: 'reverse' }}></div>

            {/* Content Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Profile Image Section - LEFT SIDE */}
              <div className="relative">
                {/* Multiple layered frames with 3D effect */}
                <div className="relative group/image perspective-1000">
                  
                  {/* Outer glow ring */}
                  <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-2xl opacity-60 group-hover/image:opacity-100 transition-all duration-700 animate-pulse-slow"></div>
                  
                  {/* Rotating rainbow ring */}
                  <div className="absolute -inset-6 rounded-full border-4 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover/image:opacity-100 transition-opacity duration-700"
                       style={{
                         backgroundSize: '400% 400%',
                         animation: 'gradient-shift 3s linear infinite',
                         WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                         WebkitMaskComposite: 'xor',
                         maskComposite: 'exclude',
                         padding: '4px'
                       }}></div>
                  
                  {/* Main image container with epic effects */}
                  <div 
                    className="relative rounded-full overflow-hidden border-8 transition-all duration-700 transform-gpu"
                    style={{
                      borderColor: 'var(--accent-primary)',
                      width: '400px',
                      height: '400px',
                      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3), inset 0 0 40px rgba(59, 130, 246, 0.2)',
                      transform: isHovered ? 'rotateY(10deg) rotateX(-5deg) scale(1.05)' : 'rotateY(0deg) rotateX(0deg) scale(1)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover/image:translate-x-full transition-transform duration-1000 z-10 pointer-events-none"></div>
                    
                    {/* Your Profile Image - UPDATE THIS WITH YOUR PHOTO */}
                    <Image
                      src="/profile.jpg"
                      alt="Bharath's Profile Picture"
                      fill
                      className="object-cover"
                      priority
                    />
                    
                    {/* Vignette effect */}
                    <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"></div>
                  </div>

                  {/* Floating badges around image */}
                  <div className="absolute -top-4 -right-4 glass rounded-2xl px-6 py-3 border-2 animate-float"
                       style={{ 
                         borderColor: 'var(--accent-success)',
                         animationDelay: '0s',
                         boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
                       }}>
                    <span className="text-3xl">🚀</span>
                  </div>
                  
                  <div className="absolute -bottom-8 -left-8 glass rounded-2xl px-6 py-3 border-2 animate-float"
                       style={{ 
                         borderColor: 'var(--accent-warning)',
                         animationDelay: '1s',
                         boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)'
                       }}>
                    <span className="text-3xl">⚡</span>
                  </div>
                  
                  <div className="absolute top-1/2 -right-12 glass rounded-2xl px-6 py-3 border-2 animate-float"
                       style={{ 
                         borderColor: 'var(--accent-pink)',
                         animationDelay: '2s',
                         boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3)'
                       }}>
                    <span className="text-3xl">💡</span>
                  </div>

                  {/* Orbiting particles */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={`orbit-${i}`}
                        className="absolute w-3 h-3 rounded-full"
                        style={{
                          left: '50%',
                          top: '50%',
                          background: `var(--accent-${['primary', 'secondary', 'info', 'pink'][i % 4]})`,
                          animation: `orbit ${8 + i}s linear infinite`,
                          transformOrigin: `${150 + i * 10}px`,
                          opacity: 0.6,
                          boxShadow: '0 0 10px currentColor'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Info Section - RIGHT SIDE */}
              <div className="space-y-8">
                
                {/* Name with MEGA styling */}
                <div className="relative">
                  <h3 className="text-5xl md:text-7xl font-black mb-4 tracking-tight relative inline-block group/name cursor-default"
                      style={{
                        background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradient-shift 5s ease infinite',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 5px 20px rgba(59, 130, 246, 0.5))',
                      }}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        const y = ((e.clientY - rect.top) / rect.height) * 100;
                        e.currentTarget.style.backgroundPosition = `${x}% ${y}%`;
                      }}>
                    Your Name Here
                    
                    {/* Animated underline */}
                    <span className="absolute -bottom-2 left-0 w-0 group-hover/name:w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 overflow-hidden">
                      <span className="shimmer-effect absolute inset-0"></span>
                    </span>
                  </h3>
                </div>

                {/* Title/Role with badge effect */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="glass rounded-2xl px-8 py-4 border-2 relative overflow-hidden group/badge transition-all duration-500 hover:scale-105"
                       style={{ borderColor: 'var(--accent-secondary)' }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500"></div>
                    <p className="text-2xl font-black relative z-10"
                       style={{ color: 'var(--accent-secondary)' }}>
                      🎯 Full Stack Developer
                    </p>
                  </div>
                  
                  <div className="glass rounded-2xl px-8 py-4 border-2 relative overflow-hidden group/badge transition-all duration-500 hover:scale-105"
                       style={{ borderColor: 'var(--accent-info)' }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500"></div>
                    <p className="text-2xl font-black relative z-10"
                       style={{ color: 'var(--accent-info)' }}>
                      🤖 AI Enthusiast
                    </p>
                  </div>
                </div>

                {/* Bio with stunning design */}
                <div className="glass rounded-3xl p-8 border-2 relative overflow-hidden group/bio transition-all duration-500 hover:scale-102"
                     style={{ borderColor: 'var(--border-color)' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover/bio:opacity-100 transition-opacity duration-500"></div>
                  
                  <p className="text-xl md:text-2xl leading-relaxed font-medium relative z-10"
                     style={{ color: 'var(--text-secondary)' }}>
                    Passionate about building amazing web experiences and exploring the frontiers of{' '}
                    <span className="gradient-text font-black text-2xl md:text-3xl inline-block hover:scale-110 transition-all duration-300 cursor-default">
                      artificial intelligence
                    </span>
                    . Creator of{' '}
                    <span className="gradient-text font-black text-2xl md:text-3xl inline-block hover:scale-110 transition-all duration-300 cursor-default">
                      NeuroLoom
                    </span>
                    {' '}and many more innovative projects.
                  </p>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 text-4xl opacity-20 group-hover/bio:opacity-40 transition-opacity duration-500">💬</div>
                  <div className="absolute bottom-4 left-4 text-3xl opacity-20 group-hover/bio:opacity-40 transition-opacity duration-500">✨</div>
                </div>

                {/* Social Links - ULTRA INTERACTIVE */}
                <div>
                  <p className="text-2xl font-black mb-6"
                     style={{ color: 'var(--text-primary)' }}>
                    Connect With Me 🌐
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {socials.map((social, index) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass rounded-2xl p-6 border-2 relative overflow-hidden group/social transition-all duration-500 hover:scale-110 hover:-rotate-2"
                        style={{ 
                          borderColor: social.color,
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        {/* Animated background */}
                        <div className="absolute inset-0 opacity-0 group-hover/social:opacity-100 transition-opacity duration-500"
                             style={{ background: `linear-gradient(135deg, ${social.color}20, ${social.hoverColor}20)` }}></div>
                        
                        {/* Sliding overlay */}
                        <div className="absolute inset-0 transform translate-y-full group-hover/social:translate-y-0 transition-transform duration-500"
                             style={{ background: `linear-gradient(135deg, ${social.color}10, ${social.hoverColor}10)` }}></div>
                        
                        {/* Content */}
                        <div className="relative z-10 flex items-center gap-4">
                          <span className="text-5xl group-hover/social:scale-125 group-hover/social:rotate-12 transition-all duration-500">
                            {social.icon}
                          </span>
                          <div className="flex-1">
                            <p className="text-xl font-black"
                               style={{ color: social.color }}>
                              {social.name}
                            </p>
                            <p className="text-sm font-medium opacity-60"
                               style={{ color: 'var(--text-muted)' }}>
                              {social.name === 'LinkedIn' && '@n-bharath'}
                              {social.name === 'Instagram' && '@bharath_theunassailable'}
                              {social.name === 'GitHub' && '@nbharath1306'}
                              {social.name === 'X (Twitter)' && '@nbharath_1306'}
                            </p>
                          </div>
                          
                          {/* Arrow */}
                          <svg className="w-6 h-6 transform group-hover/social:translate-x-2 group-hover/social:scale-125 transition-all duration-500"
                               fill="none" viewBox="0 0 24 24" stroke={social.color} strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>

                        {/* Pulsing rings on hover */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/social:opacity-100 pointer-events-none">
                          <div className="absolute inset-0 rounded-2xl border-2 animate-ping"
                               style={{ 
                                 borderColor: social.color,
                                 animationDuration: '1.5s'
                               }}></div>
                        </div>

                        {/* Floating particles */}
                        <div className="absolute inset-0 opacity-0 group-hover/social:opacity-100 pointer-events-none">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={`social-particle-${i}`}
                              className="absolute w-1 h-1 rounded-full"
                              style={{
                                left: `${20 + i * 15}%`,
                                top: `${30 + i * 10}%`,
                                backgroundColor: social.color,
                                animation: `float ${2 + i * 0.3}s ease-in-out infinite`,
                                animationDelay: `${i * 0.1}s`
                              }}
                            ></div>
                          ))}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Call to Action Button */}
                <div className="pt-8">
                  <button
                    className="relative w-full px-12 py-6 rounded-2xl font-black text-2xl
                             bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                             text-white overflow-hidden group/cta
                             transition-all duration-500 hover:scale-105 hover:shadow-2xl
                             border-4 border-white/20"
                    style={{
                      backgroundSize: '200% 200%',
                      animation: 'gradient-shift 3s ease infinite',
                      boxShadow: '0 20px 60px rgba(139, 92, 246, 0.5), 0 0 80px rgba(59, 130, 246, 0.4)',
                    }}
                  >
                    {/* Animated background waves */}
                    <div className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                                    transform -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000"></div>
                    </div>
                    
                    {/* Pulsing orbs */}
                    <div className="absolute inset-0 opacity-0 group-hover/cta:opacity-100">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full"
                          style={{
                            left: `${10 + i * 12}%`,
                            top: '50%',
                            animation: `float ${2 + Math.random()}s ease-in-out infinite`,
                            animationDelay: `${i * 0.15}s`
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    {/* Content */}
                    <span className="relative z-10 flex items-center justify-center gap-4">
                      <span className="tracking-wide">Let's Build Something Amazing</span>
                      <span className="text-3xl group-hover/cta:scale-125 group-hover/cta:rotate-12 transition-all duration-300">🚀</span>
                    </span>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500 -z-10"
                         style={{
                           background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%)',
                           filter: 'blur(30px)',
                           transform: 'scale(1.3)'
                         }}></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom decorative line */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left">
              <div className="shimmer-effect absolute inset-0"></div>
            </div>
          </div>
        </div>

        {/* Fun Stats Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: '💻', label: 'Projects Built', value: '50+', color: 'var(--accent-primary)' },
            { icon: '🏆', label: 'Achievements', value: '25+', color: 'var(--accent-success)' },
            { icon: '☕', label: 'Coffee Consumed', value: '∞', color: 'var(--accent-warning)' },
            { icon: '🚀', label: 'Dreams Launched', value: '100+', color: 'var(--accent-pink)' }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="glass rounded-3xl p-8 text-center relative overflow-hidden group/stat transition-all duration-500 hover:scale-110 border-2 cursor-default animate-scaleUp"
              style={{ 
                borderColor: stat.color,
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Animated background */}
              <div className="absolute inset-0 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500"
                   style={{ background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)` }}></div>
              
              {/* Icon */}
              <div className="text-6xl mb-4 group-hover/stat:scale-125 group-hover/stat:rotate-12 transition-all duration-500">
                {stat.icon}
              </div>
              
              {/* Value */}
              <p className="text-5xl font-black mb-2 relative z-10 transition-all duration-500"
                 style={{ color: stat.color }}>
                {stat.value}
              </p>
              
              {/* Label */}
              <p className="text-lg font-bold relative z-10"
                 style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </p>

              {/* Pulsing ring */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover/stat:opacity-100">
                <div className="absolute inset-0 rounded-3xl border-4 animate-ping"
                     style={{ 
                       borderColor: stat.color,
                       animationDuration: '2s'
                     }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
