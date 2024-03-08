/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "accidentallyretired.com"
        }]
    }
};

export default nextConfig;
