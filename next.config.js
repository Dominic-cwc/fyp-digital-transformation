/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: "http://localhost:5000/api/:path*",
    },
  ],
};

module.exports = nextConfig;
