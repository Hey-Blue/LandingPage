import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.csv$/,
      use: 'raw-loader',
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'uuxoro55gq.ufs.sh',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '0tkp56z0pn.ufs.sh',
        pathname: '/f/xPb29TA7HRGZc7kuMGVWeUbsDjS4r2vpq9kOMCYP6GiTZ85a',
      },
      {
        protocol: 'https',
        hostname: 'pc9ssga0xu.ufs.sh',
        pathname: '/**'
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: 'https://portal.heyblue.us',
        permanent: true, 
      },
      {
        source: '/register',
        destination: 'https://portal.heyblue.us/register',
        permanent: true,
      },
      {
        source: '/signup',
        destination: 'https://portal.heyblue.us/register',
        permanent: true,
      },
      {
        source: '/signin',
        destination: 'https://portal.heyblue.us/',
        permanent: true,
      }
    ]
  },
};

export default nextConfig;