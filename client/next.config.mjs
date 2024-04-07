/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com'], // added this just so I can use sample images on the front page
    }
};

export default {
    ...nextConfig,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3002/api/:path*', // Change this URL to match your backend server URL
            },
        ];
    },
};