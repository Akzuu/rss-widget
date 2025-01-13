import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.sanoma-sndp.fi",
      },
    ],
  },
};

export default nextConfig;
