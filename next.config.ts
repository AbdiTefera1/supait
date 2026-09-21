import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Add your production domain here alongside localhost
      allowedOrigins: [
        'localhost:3000',
        'www.supait.com',
        'supait.com',
        'supait.vercel.app',
      ],
    },
  },
  // Compress responses for faster delivery
  compress: true,
  // Allow serving SVG logos from public/
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

export default nextConfig
