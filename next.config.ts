import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: '/github-actions',
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Add cache busting with timestamp
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
  // GitHub Actions will automatically handle basePath and assetPrefix
  // Remove manual configuration to let GitHub manage it
}

export default nextConfig
