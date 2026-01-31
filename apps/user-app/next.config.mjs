/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@coderina-ams/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bundui-images.netlify.app",
      },
    ],
  },
}

export default nextConfig
