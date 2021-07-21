module.exports = {
    purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'warm-black': '#0d1117'
            }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
