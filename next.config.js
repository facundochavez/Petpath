/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn2.thecatapi.com', 'imgfon.ru']
  }
};

module.exports = nextConfig;
