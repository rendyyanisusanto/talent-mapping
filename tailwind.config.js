/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#5211d4",
                "primary-hover": "#420da8",
                "background-light": "#f6f6f8",
                "background-dark": "#161022",
                "surface-light": "#ffffff",
                "surface-dark": "#1e1a2e",
                "border-light": "#e5e7eb",
                "border-dark": "#374151",
            },
            fontFamily: {
                "display": ["Spline Sans", "Noto Sans", "sans-serif"]
            },
            borderRadius: {
                DEFAULT: "0.5rem",
                "lg": "1rem",
                "xl": "1.5rem",
                "full": "9999px"
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
