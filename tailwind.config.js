module.exports = {
    purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'warm-black': '#0d1117'
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': {transform: 'rotate(-3deg)'},
                    '50%': {transform: 'rotate(3deg)'},
                }
            },
            animation: {
                wiggle: 'wiggle 1s ease-in-out infinite',
            },
        },
        variants: {
            extend: {
                animation: ['hover']
            },
        },
        plugins: [],
    }
}
