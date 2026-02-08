import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ['i.ibb.co'], // Add your external domain here
  },
};

export default nextConfig;
