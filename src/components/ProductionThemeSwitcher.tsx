import { useState, useEffect } from 'react'

export default function ProductionThemeSwitcher() {
  const [isDark, setIsDark] = useState(true) // default to dark

  // Light and dark theme options - you can change these to your preferred themes
  const lightTheme = 'cupcake'  // or 'autumn'
  const darkTheme = 'dark'      // or 'halloween' or 'dracula'

  const handleToggle = () => {
    const newTheme = isDark ? lightTheme : darkTheme
    setIsDark(!isDark)
    
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme)
      // Optional: save preference to localStorage
      localStorage.setItem('theme-preference', newTheme)
    }
  }

  useEffect(() => {
    // Optional: load saved preference from localStorage
    if (typeof document !== 'undefined') {
      const saved = localStorage.getItem('theme-preference')
      if (saved) {
        document.documentElement.setAttribute('data-theme', saved)
        setIsDark(saved === darkTheme)
      } else {
        // Default theme
        document.documentElement.setAttribute('data-theme', darkTheme)
      }
    }
  }, [darkTheme])

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-4 right-4 p-3 rounded-full theme-bg-secondary theme-border border-2 shadow-lg hover:shadow-xl transition-all duration-200 z-50"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <span className="text-2xl">
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  )
}
