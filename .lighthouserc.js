module.exports = {
  // Optimize bundle size
  webpack: (config, { isServer }) => {
    // Optimize bundle analyzer
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
  
  // Performance budgets
  performanceBudgets: [
    {
      path: '/',
      maxSize: 200000, // 200KB
    },
  ],
};
