const withPWA = require('next-pwa')
const prod = process.env.NODE_ENV === 'production'

module.exports = withPWA({
    images: {
        domains: ['dev-to-uploads.s3.amazonaws.com'],
        formats: ['image/webp']
    },
    pwa: {
        disable: !prod,
        dest: 'public'
    }
})
