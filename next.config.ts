import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Add cache busting
  generateBuildId: async () => {
    return Date.now().toString()
  },
  // GitHub Actions will automatically handle basePath and assetPrefix
  // Remove manual configuration to let GitHub manage it
}

export default nextConfig
