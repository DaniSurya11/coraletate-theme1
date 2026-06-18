/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
  images: {
    qualities: [75, 90, 92, 95],
  },
};

export default nextConfig;
