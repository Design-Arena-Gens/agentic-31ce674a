import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#dcecff',
          200: '#b6d7ff',
          300: '#86bbff',
          400: '#5094ff',
          500: '#2c6df5',
          600: '#1d51d1',
          700: '#1a3fa5',
          800: '#1b3582',
          900: '#1b306a'
        }
      }
    }
  },
  plugins: []
};

export default config;
