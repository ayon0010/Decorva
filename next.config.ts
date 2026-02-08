import type { NextConfig } from "next";
import path from "path";

const floatingUiDir = path.dirname(require.resolve("@floating-ui/dom/package.json"));
const floatingUiEsm = path.join(floatingUiDir, "dist", "floating-ui.dom.esm.js");

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
        "@floating-ui/dom": floatingUiEsm,
      };
    }
    return config;
  },
  turbopack: {
    resolveAlias: {
      "@floating-ui/dom": floatingUiEsm,
    },
  },
};

export default nextConfig;
