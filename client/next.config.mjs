/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
    },
    async rewrites() {
        if (process.env.NODE_ENV === 'production') {
            return [
                {
                    source: '/api/:path*',
                    destination: '/.netlify/functions/:path*', // Points to Netlify function in production
                },
            ];
        }
        
        // In local development, proxy requests to localhost:3002
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3002/api/:path*',
            },
        ];
    },
};

export default nextConfig;
