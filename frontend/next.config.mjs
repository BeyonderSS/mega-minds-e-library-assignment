/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'example.com',

            },
        ],
        domains: ["utfs.io","6h2pb1bdn5.ufs.sh"],
    },
};

export default nextConfig;
