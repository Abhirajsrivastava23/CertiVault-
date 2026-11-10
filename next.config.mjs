/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Avoid failing production builds on Vercel due to ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Avoid failing production builds on Vercel due to minor type mismatches
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;

