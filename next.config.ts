import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: false,

  async redirects() {
    return [
      // Old plural slug: this case study was renamed. Perfect 1:1 match.
      { source: "/works/spotify-features-updates", destination: "/work/spotify", permanent: true },

      // Retired blog namespace.
      { source: "/blog/:path*", destination: "/", permanent: true },

      // Old plural /works namespace — catch-all to home. Specific rules above win.
      { source: "/works", destination: "/", permanent: true },
      { source: "/works/:slug*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
