import "./src/env.mjs"


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
    },
    publicRuntimeConfig: {
        GITHUB_SUPABASE_CALLBACK_URL_GOOGLE: process.env.GITHUB_SUPABASE_CALLBACK_URL_GOOGLE
    }
};

export default nextConfig;
