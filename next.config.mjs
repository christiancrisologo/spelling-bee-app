/** @type {import('next').NextConfig} */
const repoName = "spelling-bee-app";
const isProduction = ['production', 'github-pages'].includes(process.env.NODE_ENV);

const nextConfig = {
  reactStrictMode: true,
  // Enable static export for GitHub Pages
  ...(isProduction ? { output: 'export' } : {}),
  
  // Add trailing slash for GitHub Pages compatibility
  trailingSlash: true,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Configure base path and asset prefix for GitHub Pages
  basePath: isProduction ? `/${repoName}` : '',
  assetPrefix: isProduction ? `/${repoName}/` : '',
};

export default nextConfig;
