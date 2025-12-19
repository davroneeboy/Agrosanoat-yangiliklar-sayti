/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'zahq.uz',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'zahq.uz',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn4.telesco.pe',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn5.telesco.pe',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.telesco.pe',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn1.telesco.pe',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.telesco.pe',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn3.telesco.pe',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

