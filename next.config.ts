import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "**.blob.vercel-storage.com",
      },
    ],
  },
  // The programmatic per-state and per-city ED pages were removed: for a
  // nationwide telehealth affiliate there is no genuinely location-specific
  // content, so they were near-duplicate boilerplate (doorway / thin-content
  // risk). Every old location URL now 308-redirects to the homepage, which is
  // the ED provider comparison - the most relevant surviving target.
  async redirects() {
    return [
      {
        source: "/online-ed-treatment/:state/:city",
        destination: "/",
        permanent: true,
      },
      {
        source: "/online-ed-treatment/:state",
        destination: "/",
        permanent: true,
      },
      {
        source: "/online-ed-treatment",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
