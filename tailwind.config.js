/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        // Add the path to your Navbartwo.jsx file if it's elsewhere
        './components/Navbartwo.jsx',
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