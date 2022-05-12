/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: ["images.ctfassets.net"],
    domains: ["images.ctfassets.net"],
  },
  experimental: {
    concurrentFeatures: true,
  },
  swcMinify: false,
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "https://be.contentful.com/login",
        permanent: true,
      },
    ];
  },
};
