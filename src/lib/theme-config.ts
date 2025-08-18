// Theme configuration - simple color palette system
import { getPalette, getPaletteNames, type ColorPalette } from './color-palettes';

export interface BlogConfig {
  selectedPalette: string;
  gradients: {
    landing: boolean;
    blog: boolean;
  };
}

// You can easily change the color palette here
// Available palettes: "Clean Slate", "Ocean Breeze", "Forest Green", "Warm Sunset", 
//                    "Royal Purple", "Rose Garden", "Corporate Blue", "Monochrome"
const defaultConfig: BlogConfig = {
  selectedPalette: 'Clean Slate', // Change this to any palette name
  gradients: {
    landing: true,
    blog: false
  }
};

export function getBlogConfig(): BlogConfig {
  // In production, this could read from environment variables or package.json
  // For now, return the default config
  return defaultConfig;
}

export function getThemeConfig() {
  const config = getBlogConfig();
  const palette = getPalette(config.selectedPalette);
  
  if (!palette) {
    throw new Error(`Palette "${config.selectedPalette}" not found. Available palettes: ${getPaletteNames().join(', ')}`);
  }
  
  return {
    palette,
    hasLandingGradients: config.gradients.landing,
    hasBlogGradients: config.gradients.blog
  };
}

// Always use CSS variables now (no more daisyUI themes)
export function isUsingDaisyUIThemes(): boolean {
  return false; // We're using our custom color palette system
}
