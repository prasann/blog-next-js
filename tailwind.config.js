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
      colors: {
        "warm-black": "#0d1117",
        "twitter-blue": "#00ACEE",
        "linkedin-blue": "#0077B5",
        "heart-red": "#FE251B",
      },
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
        "ping-slow": "ping 1.5s infinite",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // Remove hardcoded colors - let our CSS custom properties handle theming
            color: 'inherit',
            a: {
              color: 'inherit',
              textDecoration: 'underline',
              '&:hover': {
                color: 'inherit',
              },
            },
            h1: {
              color: 'inherit',
            },
            h2: {
              color: 'inherit',
            },
            h3: {
              color: 'inherit',
            },
            h4: {
              color: 'inherit',
            },
            code: {
              color: 'inherit',
            },
            blockquote: {
              color: 'inherit',
              borderLeftColor: 'inherit',
            },
            strong: {
              color: 'inherit',
            },
            'thead th': {
              color: 'inherit',
            },
          },
        }
      }),
    },
  },
  variants: {
    extend: {
      animation: ["hover"],
      typography: ["dark"], 
    },
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
};