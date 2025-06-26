import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'
const repoName = 'portfolio' // change to your repo name

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
}

export default nextConfig
