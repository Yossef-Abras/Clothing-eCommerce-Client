/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_API_URL: "https://api.saramoda.shop/api/v1",
  },
  images: {
    domains: ["api.saramoda.shop"],
  },
};

export default nextConfig;
