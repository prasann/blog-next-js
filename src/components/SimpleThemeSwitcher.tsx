import { useState, useEffect } from 'react';
import { getThemeConfig, isUsingDaisyUIThemes } from '../lib/theme-config';

export default function SimpleThemeSwitcher() {
  const [isDark, setIsDark] = useState(true); // Default to dark
  const themeConfig = getThemeConfig();
  const useDaisyUI = isUsingDaisyUIThemes();

  // Apply CSS variables for the selected palette
  const applyCSSVariables = (isDarkMode: boolean) => {
    const colors = isDarkMode ? themeConfig.palette.dark : themeConfig.palette.light;
    const root = document.documentElement;
    
    root.style.setProperty('--bg-primary', colors.bgPrimary);
    root.style.setProperty('--bg-secondary', colors.bgSecondary);
    root.style.setProperty('--text-primary', colors.textPrimary);
    root.style.setProperty('--text-secondary', colors.textSecondary);
  };

  useEffect(() => {
    // Load theme preference from localStorage, default to dark
    const savedTheme = localStorage.getItem('theme-preference');
    if (savedTheme === 'light') {
      setIsDark(false);
      applyCSSVariables(false);
      document.documentElement.removeAttribute('data-theme');
    } else {
      // Default to dark theme
      setIsDark(true);
      applyCSSVariables(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, [themeConfig]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    // Apply the color palette
    applyCSSVariables(newIsDark);
    
    // Set data-theme attribute for any remaining theme-dependent styles
    if (newIsDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    
    localStorage.setItem('theme-preference', newIsDark ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-switcher-btn"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? (
        // Sun icon for switching to light
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        // Moon icon for switching to dark
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}
