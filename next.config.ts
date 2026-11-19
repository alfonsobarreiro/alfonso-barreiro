import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: false,

  async redirects() {
    return [
      // Old plural slug: this case study was renamed. Perfect 1:1 match.
      { source: "/works/spotify-features-updates", destination: "/work/spotify", permanent: true },

      // /hiring was removed before launch (Alfonso, 2026-11-18). Temporary,
      // so the path can come back; links already sent land on the homepage.
      { source: "/hiring", destination: "/", permanent: false },

      // Samples removed from /work (Alfonso, 2026-11-19). Temporary, so a
      // piece can come back; old links land on the index.
      { source: "/work/samples/vara-distributor-leave-behind", destination: "/work", permanent: false },
      { source: "/work/samples/vara-rack-card-tasting-cards", destination: "/work", permanent: false },
      { source: "/work/samples/boomtime-recession-playbook", destination: "/work", permanent: false },

      // Retired blog namespace.
      { source: "/blog/:path*", destination: "/", permanent: true },

      // Old plural /works namespace — catch-all to home. Specific rules above win.
      { source: "/works", destination: "/", permanent: true },
      { source: "/works/:slug*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
