// Color palettes inspired by popular design systems
// Each palette has light and dark variants with our 4 core colors

export interface ColorPalette {
  name: string;
  light: {
    bgPrimary: string;
    bgSecondary: string;
    textPrimary: string;
    textSecondary: string;
  };
  dark: {
    bgPrimary: string;
    bgSecondary: string;
    textPrimary: string;
    textSecondary: string;
  };
}

export const colorPalettes: ColorPalette[] = [
  {
    name: "Clean Slate",
    light: {
      bgPrimary: "#ffffff",
      bgSecondary: "#f8fafc",
      textPrimary: "#1f2937",
      textSecondary: "#6b7280"
    },
    dark: {
      bgPrimary: "#1f2937",
      bgSecondary: "#374151",
      textPrimary: "#f9fafb",
      textSecondary: "#d1d5db"
    }
  },
  {
    name: "Ocean Breeze",
    light: {
      bgPrimary: "#fefefe",
      bgSecondary: "#f0f9ff",
      textPrimary: "#0c4a6e",
      textSecondary: "#0369a1"
    },
    dark: {
      bgPrimary: "#0c4a6e",
      bgSecondary: "#075985",
      textPrimary: "#f0f9ff",
      textSecondary: "#bae6fd"
    }
  },
  {
    name: "Forest Green",
    light: {
      bgPrimary: "#fefefe",
      bgSecondary: "#f0fdf4",
      textPrimary: "#14532d",
      textSecondary: "#166534"
    },
    dark: {
      bgPrimary: "#14532d",
      bgSecondary: "#166534",
      textPrimary: "#f0fdf4",
      textSecondary: "#bbf7d0"
    }
  },
  {
    name: "Warm Sunset",
    light: {
      bgPrimary: "#fffbeb",
      bgSecondary: "#fef3c7",
      textPrimary: "#92400e",
      textSecondary: "#d97706"
    },
    dark: {
      bgPrimary: "#92400e",
      bgSecondary: "#b45309",
      textPrimary: "#fffbeb",
      textSecondary: "#fed7aa"
    }
  },
  {
    name: "Royal Purple",
    light: {
      bgPrimary: "#faf5ff",
      bgSecondary: "#f3e8ff",
      textPrimary: "#581c87",
      textSecondary: "#7c3aed"
    },
    dark: {
      bgPrimary: "#581c87",
      bgSecondary: "#6b21a8",
      textPrimary: "#faf5ff",
      textSecondary: "#d8b4fe"
    }
  },
  {
    name: "Rose Garden",
    light: {
      bgPrimary: "#fff1f2",
      bgSecondary: "#ffe4e6",
      textPrimary: "#881337",
      textSecondary: "#be185d"
    },
    dark: {
      bgPrimary: "#881337",
      bgSecondary: "#9f1239",
      textPrimary: "#fff1f2",
      textSecondary: "#fda4af"
    }
  },
  {
    name: "Corporate Blue",
    light: {
      bgPrimary: "#ffffff",
      bgSecondary: "#eff6ff",
      textPrimary: "#1e40af",
      textSecondary: "#3b82f6"
    },
    dark: {
      bgPrimary: "#1e3a8a",
      bgSecondary: "#1e40af",
      textPrimary: "#eff6ff",
      textSecondary: "#93c5fd"
    }
  },
  {
    name: "Monochrome",
    light: {
      bgPrimary: "#ffffff",
      bgSecondary: "#f9fafb",
      textPrimary: "#111827",
      textSecondary: "#4b5563"
    },
    dark: {
      bgPrimary: "#111827",
      bgSecondary: "#1f2937",
      textPrimary: "#f9fafb",
      textSecondary: "#9ca3af"
    }
  }
];

// Get palette by name
export function getPalette(name: string): ColorPalette | undefined {
  return colorPalettes.find(palette => palette.name === name);
}

// Get all palette names
export function getPaletteNames(): string[] {
  return colorPalettes.map(palette => palette.name);
}
