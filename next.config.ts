import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // CMS media is validated server-side and intentionally capped at 10 MB.
    serverActions: {
      bodySizeLimit: "12mb",
    },
  },
};

export default nextConfig;
