/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-normal',
    'bg-nottouch',
    'bg-awakeme',
    'bg-eaten',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'normal': '#4472e7',
        'nottouch': '#de3939',
        'awakeme': '#f1419c',
        'eaten': '#43dc6c',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderWidth: {
        "1": "1px",
      },
      width: {
        "crew": "1280px",
      },
      borderRadius:{
        "airplain": "7.5rem",
      },
    },
  },
  plugins: [],
};
