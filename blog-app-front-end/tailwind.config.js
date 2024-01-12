/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors:{
                "text-color": "#333333",
                "peach": "#fddfdf",
                "aquamarine": "#c0e5e1"
            },
            fontFamily:{
                montserrat: "'Montserrat', sans-serif;"
            },
            height:{
                featured: '32rem'
            }
        },
    },
    plugins: [],
}

