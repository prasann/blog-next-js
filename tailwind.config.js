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
      // Typography improvements
      fontSize: {
        base: ["1.125rem", { lineHeight: "1.8" }],
      },
      letterSpacing: {
        heading: "-0.02em",
      },

      // Semantic color theme - change these to instantly refresh the site look
      colors: {
        // Social media brand colors (keep as-is)
        "twitter-blue": "#00ACEE",
        "linkedin-blue": "#0077B5",
        "heart-red": "#FE251B",
        
        // Theme colors - edit these for easy site-wide color changes
        theme: {
          // Accent colors (currently blue-based)
          accent: {
            light: "#93c5fd",     // blue-300 - lighter accent
            DEFAULT: "#60a5fa",   // blue-400 - main accent
            medium: "#3b82f6",    // blue-500 - medium accent
            dark: "#2563eb",      // blue-600 - darker accent
          },
          // Glass-morphism effects
          glass: {
            light: "rgba(255, 255, 255, 0.05)",   // bg-white/5
            medium: "rgba(255, 255, 255, 0.10)",  // bg-white/10
            dark: "rgba(255, 255, 255, 0.15)",    // bg-white/15
          },
          // Borders and dividers
          border: {
            light: "rgba(255, 255, 255, 0.05)",   // border-white/5
            medium: "rgba(255, 255, 255, 0.10)",  // border-white/10
            dark: "rgba(255, 255, 255, 0.15)",    // border-white/15
            accent: {
              light: "rgba(59, 130, 246, 0.2)",   // border-blue-500/20
              medium: "rgba(59, 130, 246, 0.3)",  // border-blue-500/30
              dark: "rgba(59, 130, 246, 0.4)",    // border-blue-400/40
            },
          },
          // Text colors
          text: {
            primary: "#f3f4f6",     // gray-100 - main text
            secondary: "#d1d5db",   // gray-300 - secondary text
            muted: "#9ca3af",       // gray-400 - muted text
            accent: {
              light: "#93c5fd",     // blue-300
              medium: "#60a5fa",    // blue-400
            },
          },
          // Background accents
          bg: {
            accent: {
              light: "rgba(59, 130, 246, 0.1)",   // bg-blue-500/10
              medium: "rgba(59, 130, 246, 0.2)",  // bg-blue-500/20
              dark: "rgba(59, 130, 246, 0.3)",    // bg-blue-500/30
            },
            pink: {
              light: "rgba(236, 72, 153, 0.2)",   // bg-pink-500/20
              medium: "rgba(236, 72, 153, 0.3)",  // bg-pink-500/30
            },
          },
        },
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
          // Base colors (backgrounds and text)
          "base-100": "#111827",      // gray-900 - darkest background
          "base-200": "#1f2937",      // gray-800 - card backgrounds
          "base-300": "#374151",      // gray-700 - borders/dividers
          // Utility colors
          "success": "#10b981",       // green - used for email icon hover
        },
      },
      "winter", // Light theme option
    ],
    darkTheme: "prasanna",
    base: true,
    styled: true,
    utils: true,
  },
};