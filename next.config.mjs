/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_API_URL: "https://api.saramoda.shop/api/v1",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.saramoda.shop",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
