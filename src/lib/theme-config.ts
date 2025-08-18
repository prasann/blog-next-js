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
  selectedPalette: 'Monochrome', // Back to original since prose was the issue
  gradients: {
    landing: true,
    blog: true
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
