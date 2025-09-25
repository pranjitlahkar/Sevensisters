/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        '/app/**/*.{js,ts,jsx,tsx,mdx}',
        '/pages/**/*.{js,ts,jsx,tsx,mdx}',
        '/src/components/**/*.{js,ts,jsx,tsx,mdx}',
        // Add the path to your Navbartwo.jsx file if it's elsewhere
        '/src/components/Navbartwo.jsx',
    ],
    // This is the important part that fixes your mobile menu
    safelist: [
        'open',
        'active',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};