/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      color: {
        primary: '#19364C',
        secondary: '#419AF2',
        danger: '#F27841',
        warning: '#F2C141',
      },
      fontSize: {
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
        '2xl': ['28px', '36px'],
      },
      backgroundColor: {
        primary: '#19364C',
        secondary: '#419AF2',
        danger: '#F27841',
        warning: '#F2C141',
      },
      screens: {
        xs: '375px',
        sm: '640px',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
