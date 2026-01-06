module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mulish", "sans-serif"],
      },
      // Keep only essential custom colors not provided by DaisyUI
      colors: {
        "twitter-blue": "#00ACEE",
        "linkedin-blue": "#0077B5",
        "heart-red": "#FE251B",
      },
      // Keep wave animation as it's custom
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "15%": { transform: "rotate(14.0deg)" },
          "30%": { transform: "rotate(-8.0deg)" },
          "40%": { transform: "rotate(14.0deg)" },
          "50%": { transform: "rotate(-4.0deg)" },
          "60%": { transform: "rotate(10.0deg)" },
          "70%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
      },
      animation: {
        wave: "wave 2.5s infinite",
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        prasanna: {
          "primary": "#ec4899",        // pink-500 - brand color
          "secondary": "#f472b6",     // pink-400
          "accent": "#fb7185",        // rose-400
          "neutral": "#1f2937",       // gray-800
          "base-100": "#111827",      // gray-900 - darkest background
          "base-200": "#1f2937",      // gray-800 - card backgrounds
          "base-300": "#374151",      // gray-700 - borders/dividers
          "base-content": "#f3f4f6",  // gray-100 - main text
          "info": "#3b82f6",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
    ],
    darkTheme: "prasanna",
    base: true,
    styled: true,
    utils: true,
  },
};