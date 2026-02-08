import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ['i.ibb.co'], // Add your external domain here
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve?.alias,
        '@floating-ui/dom': require.resolve('@floating-ui/dom/dist/floating-ui.dom.esm.js'),
      };
    }
    return config;
  },
};

export default nextConfig;
