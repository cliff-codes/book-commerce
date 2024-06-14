/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["accidentallyretired.com", "daisyui.com", "encrypted-tbn0.gstatic.com", "c8.alamy.com", "media.glamour.com", "i.pinimg.com", "i.etsystatic.com"]
    },
    typescript: {
        // !! WARN !! // Dangerously allow production builds to successfully complete even if your project has type errors.
        ignoreBuildErrors: true,
      },
};

export default nextConfig;
