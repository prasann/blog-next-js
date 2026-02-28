const prod = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: prod ? false : true,
});

module.exports = withPWA({
  // Enable Turbopack (Next.js 16 default)
  turbopack: {},
  async rewrites() {
    return [
      {
        source: '/resume',
        destination: '/resume.html',
      },
    ];
  },
});
