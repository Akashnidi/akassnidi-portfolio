/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any specific Next.js configurations here if needed
  // For example, to allow images from external domains:
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};