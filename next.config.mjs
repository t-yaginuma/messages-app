/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.jp",
        port: "",
      },
    ],
  },
  sassOptions: {
    prependData: `
    @use '@/styles/_variables' as *; @use "sass:map";
    `,
  },
};

export default nextConfig;
