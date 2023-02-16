/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_APP_API_URL: process.env.NEXT_APP_API_URL,
  },
};

module.exports = nextConfig;
