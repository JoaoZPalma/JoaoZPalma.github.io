import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Only add basePath and assetPrefix if deploying to GitHub Pages repo subdirectory
  // Replace 'your-repo-name' with your actual repository name
  // Remove these lines if deploying to username.github.io
  // basePath: '/your-repo-name',
  // assetPrefix: '/your-repo-name/',
}

export default nextConfig
