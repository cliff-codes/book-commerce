/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'accidentallyretired.com',
            },
            {
                protocol: 'https',
                hostname: 'daisyui.com',
            },
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
            },
            {
                protocol: 'https',
                hostname: 'c8.alamy.com',
            },
            {
                protocol: 'https',
                hostname: 'media.glamour.com',
            },
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
            },
            {
                protocol: 'https',
                hostname: 'i.etsystatic.com',
            },
            {
                protocol: 'https',
                hostname: 'shop.penguin.co.uk',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            }
        ],
    },
    typescript: {
        // !! WARN !! // Dangerously allow production builds to successfully complete even if your project has type errors.
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
