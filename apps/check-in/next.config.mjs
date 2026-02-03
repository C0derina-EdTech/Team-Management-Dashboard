/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@coderina-ams/ui"],
  // output: "standalone",
  // output: "export",
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
