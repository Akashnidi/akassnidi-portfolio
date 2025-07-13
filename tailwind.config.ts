import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Default sans-serif font
        poppins: ['Poppins', 'sans-serif'], // Example of adding another font
      },
      colors: {
        'whitish-silver': '#E0E0E0', // Custom color for the name
        'pastel-blue': '#A7C7E7',
        'pastel-green': '#B2EBF2',
        'earth-brown': '#D2B48C',
        'earth-green': '#8FBC8F',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;