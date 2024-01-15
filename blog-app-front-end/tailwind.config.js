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
            },
            boxShadow:{
                'inner-xl': "inset 0 2px 6px 0 rgb(0 0 0 / 0.5)"
            },
            cursor:{
                "pointer-special": "url(hand.cur), pointer"
            }
        },
    },
    plugins: [ 
        require('@tailwindcss/typography')
    ],
}

