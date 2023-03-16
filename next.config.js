const { config } = require('process')

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

  webpack: (config) => {
    config.resolve.fallback = { fs: false }
    return config
  },
}

module.exports = nextConfig
