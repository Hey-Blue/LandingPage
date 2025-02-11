import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
  // Allowed image quality values — include 95 and 100 since they're used in the code.
  qualities: [75, 95, 100],
    remotePatterns: [
      { protocol: "https", hostname: "utfs.io" },
      { protocol: "https", hostname: "*.ufs.sh" },
      { protocol: "https", hostname: "ufs.sh" },
      { protocol: "https", hostname: "0tkp56z0pn.ufs.sh" },
      { protocol: "https", hostname: "t930d35mct.ufs.sh" },
      { protocol: "https", hostname: "kgaduw4eg5.ufs.sh" },
      { protocol: "https", hostname: "utmbvtrp5h.ufs.sh" },
      { protocol: "https", hostname: "d1muf25xaso8hp.cloudfront.net" },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },

  // Required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
