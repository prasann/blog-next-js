module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
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
    },
    variants: {
      extend: {
        animation: ["hover"],
      },
    },
    plugins: [require("@tailwindcss/typography")],
  },
};
