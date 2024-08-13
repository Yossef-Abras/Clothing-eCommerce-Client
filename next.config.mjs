/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_API_URL: "https://clothing-ecommerce-server.onrender.com/api/v1"
  },
  images: {
    domains: ['clothing-ecommerce-server.onrender.com'],
  },
};


export default nextConfig;
