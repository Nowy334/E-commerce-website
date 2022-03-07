/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    domains: [
      "images.ctfassets.net",
      "scontent-waw1-1.cdninstagram.com",
      "video-waw1-1.cdninstagram.com",
    ],
  },
  trailingSlash: true,
};
