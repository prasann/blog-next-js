const withPWA = require('next-pwa')
module.exports = withPWA({
    images: {
        domains: ['dev-to-uploads.s3.amazonaws.com'],
        formats: ['image/webp']
    },
    pwa: {
        dest: 'public'
    }
})
