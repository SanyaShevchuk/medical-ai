/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    // Important: return the modified config
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          { test: /\.txt$/, use: 'raw-loader' }
        ],
      },
    };
  },
}

module.exports = nextConfig
