'use client';

import { useState, useEffect } from 'react';
import { getPaletteNames, getPalette } from '../lib/color-palettes';

export default function PaletteDemo() {
  const [selectedPalette, setSelectedPalette] = useState('Clean Slate');
  const [isVisible, setIsVisible] = useState(false);
  const paletteNames = getPaletteNames();

  // Only show in development
  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === 'development');
  }, []);

  if (!isVisible) return null;

  const previewPalette = (paletteName: string) => {
    const palette = getPalette(paletteName);
    if (!palette) return;

    // Get current theme (light/dark)
    const isDark = document.documentElement.hasAttribute('data-theme');
    const colors = isDark ? palette.dark : palette.light;
    const root = document.documentElement;
    
    // Apply the palette colors immediately
    root.style.setProperty('--bg-primary', colors.bgPrimary);
    root.style.setProperty('--bg-secondary', colors.bgSecondary);
    root.style.setProperty('--text-primary', colors.textPrimary);
    root.style.setProperty('--text-secondary', colors.textSecondary);
    
    setSelectedPalette(paletteName);
  };

  return (
    <div className="content-area rounded-xl mt-4 p-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {/* Use your existing greeting style */}
      <div className="mb-4">
        <span className="text-2xl lg:text-4xl font-bold greeting-color">
          🎨 Dev Color Palette Tester
        </span>
      </div>
      
      <div className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>
        Click any palette to instantly preview it across your entire site!
      </div>
      
      <div className="mb-4 p-4 rounded" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          Current Palette: <span className="greeting-color">{selectedPalette}</span>
        </div>
        
        {/* Sample components preview using your existing styles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Sample post title */}
          <div>
            <h3 className="text-2xl font-bold greeting-color mb-2">Sample Blog Post Title</h3>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Published on Jan 15, 2024 • 5 min read</div>
            <div className="mt-2" style={{ color: 'var(--text-primary)' }}>
              This is how your blog post descriptions will look with the selected color palette.
            </div>
          </div>
          
          {/* Sample navigation */}
          <div className="p-4 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Navigation Preview</div>
            <div className="space-y-2">
              <div className="highlight-animation cursor-pointer" style={{ color: 'var(--text-primary)' }}>About</div>
              <div className="highlight-animation cursor-pointer" style={{ color: 'var(--text-primary)' }}>Blog</div>
              <div className="highlight-animation cursor-pointer" style={{ color: 'var(--text-primary)' }}>Talks</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {paletteNames.map((name) => (
          <button
            key={name}
            onClick={() => previewPalette(name)}
            className={`p-3 rounded-lg border-2 transition-all hover:scale-105 highlight-animation ${
              selectedPalette === name 
                ? 'border-blue-500 shadow-lg' 
                : 'border-gray-300 dark:border-gray-600'
            }`}
            style={{ 
              backgroundColor: selectedPalette === name ? 'var(--bg-primary)' : 'var(--bg-secondary)',
              color: 'var(--text-primary)'
            }}
          >
            <div className="text-sm font-medium">{name}</div>
            {/* Color preview dots */}
            <div className="flex mt-2 space-x-1 justify-center">
              {(() => {
                const palette = getPalette(name);
                const isDark = document.documentElement.hasAttribute('data-theme');
                const colors = palette ? (isDark ? palette.dark : palette.light) : null;
                return colors ? (
                  <>
                    <div className="w-3 h-3 rounded-full border border-gray-400" style={{ backgroundColor: colors.bgPrimary }}></div>
                    <div className="w-3 h-3 rounded-full border border-gray-400" style={{ backgroundColor: colors.bgSecondary }}></div>
                    <div className="w-3 h-3 rounded-full border border-gray-400" style={{ backgroundColor: colors.textPrimary }}></div>
                    <div className="w-3 h-3 rounded-full border border-gray-400" style={{ backgroundColor: colors.textSecondary }}></div>
                  </>
                ) : null;
              })()}
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-6 p-4 rounded" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          💡 <strong>To save changes:</strong> Edit <code>selectedPalette</code> in <code>src/lib/theme-config.ts</code><br/>
          🚀 <strong>Production builds:</strong> This component is hidden in production (npm run build)
        </p>
      </div>
    </div>
  );
}
