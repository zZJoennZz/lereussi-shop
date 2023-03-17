const dotenv = require('dotenv');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'dawnbringer.lereussicakes.com',
      },
    ],
  },
  output: 'standalone',
};

dotenv.config();

module.exports = nextConfig;
