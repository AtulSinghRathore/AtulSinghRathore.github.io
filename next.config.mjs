/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: This is for Vercel. Do NOT set `output: "export"` here.
  reactStrictMode: true,
  images: {
    // Use Vercel Image Optimization (default). Keep domains empty unless you load remote images.
    remotePatterns: [],
  },
  experimental: {
    // If you had this earlier for dev warnings you can keep or remove.
    // typedRoutes: false,
  },
};

export default nextConfig;
