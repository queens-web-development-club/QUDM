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
                destination: 'http://localhost:3002/api/:path*', //this makes it so any api calls are referred to localhost:3002 + whatever path u set lol
            },
        ];
    },
};