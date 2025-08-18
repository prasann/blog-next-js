import React, { useEffect, useState } from 'react';

const AVAILABLE_THEMES = [
  'blog-dark',    // Your custom theme
  'dark',         // daisyUI built-in dark
  'light',        // daisyUI built-in light
  'corporate',    // Professional light theme
  'business',     // Professional dark theme
  'dracula',      // Popular purple dark theme
  'forest',       // Green dark theme
  'luxury',       // Elegant dark theme
  'synthwave',    // Retro neon theme
  'cyberpunk'     // Futuristic theme
];

export default function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState('dark')

  const themes = [
    { value: 'cupcake', name: 'Cupcake (Light)', type: 'light' },
    { value: 'dark', name: 'Dark', type: 'dark' },
    { value: 'halloween', name: 'Halloween (Dark)', type: 'dark' },
    { value: 'dracula', name: 'Dracula (Dark)', type: 'dark' },
    { value: 'autumn', name: 'Autumn (Light)', type: 'light' }
  ]

  const handleThemeChange = (theme: string) => {
    console.log('Changing theme to:', theme)
    setCurrentTheme(theme)
    // Apply theme immediately to document element
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme)
      console.log('Applied data-theme attribute:', document.documentElement.getAttribute('data-theme'))
    }
  }

  useEffect(() => {
    // Apply initial theme
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', currentTheme)
    }
  }, [currentTheme])

  return (
    <div className="fixed top-4 right-4 z-50 theme-bg-secondary p-4 rounded-lg shadow-lg max-w-xs">
      <h3 className="text-sm font-bold mb-2 theme-text-primary">🎨 Theme Selector</h3>
      <select 
        value={currentTheme}
        onChange={(e) => handleThemeChange(e.target.value)}
        className="w-full p-2 rounded border theme-border theme-bg-tertiary theme-text-primary"
      >
        {themes.map(theme => (
          <option key={theme.value} value={theme.value} className="theme-bg-tertiary theme-text-primary">
            {theme.name}
          </option>
        ))}
      </select>
      
      <p className="text-xs theme-text-muted">
        Testing {themes.length} daisyUI themes
      </p>
      <p className="text-xs theme-text-muted mt-1">
        Current: {currentTheme}
      </p>
      <p className="text-xs theme-text-muted mt-1">
        Type: {themes.find(t => t.value === currentTheme)?.type || 'unknown'}
      </p>
    </div>
  )
}
