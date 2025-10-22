'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved) {
      setTheme(saved)
      applyTheme(saved)
    } else {
      applyTheme('system')
    }
  }, [])

  const applyTheme = (newTheme: Theme) => {
    if (newTheme === 'system') {
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', systemPreference)
    } else {
      document.documentElement.setAttribute('data-theme', newTheme)
    }
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  if (!mounted) return null

  return (
    <div className="fixed top-6 right-6 z-50 animate-fadeIn">
      <div className="glass rounded-xl p-2 flex gap-2 shadow-lg">
        <button
          onClick={() => handleThemeChange('light')}
          className={`p-2.5 rounded-lg transition-all duration-300 ${
            theme === 'light'
              ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title="Light Theme"
          aria-label="Switch to light theme"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        </button>

        <button
          onClick={() => handleThemeChange('dark')}
          className={`p-2.5 rounded-lg transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title="Dark Theme"
          aria-label="Switch to dark theme"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </button>

        <button
          onClick={() => handleThemeChange('system')}
          className={`p-2.5 rounded-lg transition-all duration-300 ${
            theme === 'system'
              ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title="System Theme"
          aria-label="Use system theme preference"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
