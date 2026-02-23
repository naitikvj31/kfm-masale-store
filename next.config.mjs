/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep React Compiler for aggressive UI memoization & speed
  reactCompiler: true,

  // Optimize and cache external images out-of-the-box
  images: {
    minimumCacheTTL: 2592000, // 30 Days (huge caching boost)
    remotePatterns: [
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Add any other domains where your product images might live
    ],
  },

  // Apply strict HTTP Security Headers globally
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frames-Options',
            value: 'SAMEORIGIN' // Prevent Clickjacking attacks
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff' // Prevent MIME-sniffing exploits
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
