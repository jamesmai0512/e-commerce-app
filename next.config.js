/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    enableUndici: true,
  },

  images: {
    domains: ['loremflickr.com', 'raw.githubusercontent.com'],
  },

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },

  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      }
    }

    return config
  },
}

module.exports = nextConfig
