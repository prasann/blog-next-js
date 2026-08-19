module.exports = {
  agentRules: false,
  // Enable Turbopack (Next.js 16 default)
  turbopack: {},
  async rewrites() {
    return [
      {
        source: "/resume",
        destination: "/resume.html",
      },
    ];
  },
};
