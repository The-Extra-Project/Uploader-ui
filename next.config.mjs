/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    logging: {
        level: 'info',
        fetches: {
            fullUrl: true
        },
    },
    experimental: {
        esmExternals: "loose"
    }
};

export default nextConfig;
