import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Add remote hosts here if stock photos are later served from a CMS/CDN.
    remotePatterns: [],
  },
};

export default nextConfig;
