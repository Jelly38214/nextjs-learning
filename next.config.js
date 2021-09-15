module.exports = (phase, arg) => {
  return {
    serverRuntimeConfig: NextConfig.serverRuntimeConfig,
    async rewrites() {
      return [
        {
          source: "/cart(v2)?",
          destination: "/",
        },
      ];
    },
  };
};
