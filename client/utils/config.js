export const getApiUrl = () => {
    // Check if we're in development mode using Netlify Dev
    if (process.env.NEXT_PUBLIC_NETLIFY_DEV === 'true') {
      return 'http://localhost:8888/.netlify/functions';
    }
    // Otherwise, we're in production, use relative path
    return '/.netlify/functions';
  };