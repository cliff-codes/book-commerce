/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "accidentallyretired.com"
        }]
    },
    typescript: {
        // !! WARN !! // Dangerously allow production builds to successfully complete even if your project has type errors.
        ignoreBuildErrors: true,
      },
};

export default nextConfig;
