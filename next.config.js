/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dedas1ohg/**',
      },
      {
        protocol: 'https', // You can specify the protocol
        hostname: 'i.pinimg.com', // Add the domain here
      },
      {
        protocol: 'https', // You can specify the protocol
        hostname: 'daisycon.io', // Add the domain here
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_UR: process.env.NEXT_PUBLIC_API_UR,
  },
}
