const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'alihsan.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '/projects/**'
      },
      {
        protocol: 'https',
        hostname: 'alihsan.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '/images/**'
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**'
      }
    ]
  }
}

module.exports = withNextIntl(nextConfig)
