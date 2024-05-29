/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["accidentallyretired.com", "daisyui.com"]
    },
    typescript: {
        // !! WARN !! // Dangerously allow production builds to successfully complete even if your project has type errors.
        ignoreBuildErrors: true,
      },
};

export default nextConfig;
