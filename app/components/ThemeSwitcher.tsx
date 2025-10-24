'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'gray' | 'cyberpunk' | 'ocean' | 'sunset' | 'forest' | 'rose' | 'midnight' | 'arctic' | 'matrix' | 'amber' | 'crimson' | 'mint' | 'lavender' | 'mocha'

const themes = [
  { id: 'light' as Theme, name: 'Light', icon: '☀️', color: 'from-yellow-400 to-orange-500', desc: 'Clean & Bright' },
  { id: 'dark' as Theme, name: 'True Black', icon: '🌑', color: 'from-gray-800 to-black', desc: 'OLED Perfect' },
  { id: 'gray' as Theme, name: 'Soft Gray', icon: '🌙', color: 'from-slate-600 to-slate-800', desc: 'GitHub Style' },
  { id: 'cyberpunk' as Theme, name: 'Cyberpunk', icon: '💜', color: 'from-purple-600 to-indigo-800', desc: 'Futuristic' },
  { id: 'ocean' as Theme, name: 'Deep Ocean', icon: '🌊', color: 'from-blue-700 to-blue-900', desc: 'Calm Waters' },
  { id: 'sunset' as Theme, name: 'Sunset', icon: '🌅', color: 'from-orange-600 to-red-700', desc: 'Warm Glow' },
  { id: 'forest' as Theme, name: 'Forest', icon: '🌲', color: 'from-green-600 to-green-800', desc: 'Nature Fresh' },
  { id: 'rose' as Theme, name: 'Rose', icon: '🌹', color: 'from-pink-600 to-rose-800', desc: 'Elegant Pink' },
  { id: 'midnight' as Theme, name: 'Midnight', icon: '✨', color: 'from-purple-700 to-indigo-900', desc: 'Deep Purple' },
  { id: 'arctic' as Theme, name: 'Arctic', icon: '❄️', color: 'from-cyan-600 to-blue-800', desc: 'Ice Cool' },
  { id: 'matrix' as Theme, name: 'Matrix', icon: '💚', color: 'from-green-500 to-green-900', desc: 'Hacker Mode' },
  { id: 'amber' as Theme, name: 'Amber', icon: '🟡', color: 'from-amber-500 to-orange-700', desc: 'Golden Hour' },
  { id: 'crimson' as Theme, name: 'Crimson', icon: '❤️', color: 'from-red-600 to-red-900', desc: 'Bold Red' },
  { id: 'mint' as Theme, name: 'Mint', icon: '🍃', color: 'from-teal-500 to-teal-800', desc: 'Fresh Teal' },
  { id: 'lavender' as Theme, name: 'Lavender', icon: '💠', color: 'from-purple-400 to-purple-700', desc: 'Soft Purple' },
  { id: 'mocha' as Theme, name: 'Mocha', icon: '☕', color: 'from-amber-700 to-brown-900', desc: 'Cozy Brown' },
]

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved) {
      setTheme(saved)
      applyTheme(saved)
    } else {
      applyTheme('dark')
    }
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    root.setAttribute('data-theme', newTheme)
    
    // Force immediate style recalculation for instant switch
    root.style.transition = 'none'
    void root.offsetHeight
    root.style.transition = ''
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
    setShowMenu(false)
  }

  if (!mounted) return null

  const currentTheme = themes.find(t => t.id === theme) || themes[1]

  return (
    <div className="fixed top-6 right-6 z-50 animate-fadeIn">
      {/* Current Theme Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="glass rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-xl hover:scale-105 transition-all duration-300"
      >
        <span className="text-2xl">{currentTheme.icon}</span>
        <span className="font-semibold text-sm">{currentTheme.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${showMenu ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Theme Menu */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-full right-0 mt-2 w-72 glass-strong rounded-2xl p-3 shadow-2xl animate-scaleUp z-50 max-h-[80vh] overflow-y-auto custom-scrollbar">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-2 mb-2 flex items-center justify-between">
              <span>Choose Your Vibe ✨</span>
              <span className="text-[10px] opacity-70">{themes.length} themes</span>
            </div>
            
            <div className="space-y-1">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => handleThemeChange(themeOption.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                    theme === themeOption.id
                      ? `bg-gradient-to-r ${themeOption.color} text-white shadow-lg scale-[1.02]`
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:scale-[1.02]'
                  }`}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{themeOption.icon}</span>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-sm">{themeOption.name}</div>
                    <div className={`text-xs mt-0.5 ${
                      theme === themeOption.id 
                        ? 'text-white/80' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {themeOption.desc}
                    </div>
                  </div>
                  {theme === themeOption.id && (
                    <svg className="w-5 h-5 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            
            {/* Preview Info */}
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2 text-center">
                Theme changes instantly ⚡
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
