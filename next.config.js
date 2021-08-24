module.exports = (phase, arg) => {
  return {
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
