const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
    screens: {
      xs: '576px',
      sm: '768px',
      md: '992px',
      lg: '1450px',
      xl: '1850px',
      '2xl': '2200px',
      '3xl': '2900px',
    },
  },
  // plugins: [require('daisyui')],

  daisyui: {
    themes: [
      "dark", "light",
      {
        bloom: {
          primary: '#8193b2',
          'primary-content': '#1b1e25',
          secondary: '#b48eae',
          'secondary-content': '#1b1e25',
          accent: '#609d9f',
          'accent-content': '#1b1e25',
          neutral: '#3d4451',
          'neutral-content': '#ebddbc',
          'base-100': '#1b1e25',
          'base-content': '#ebddbc',
          info: '#63b3ed',
          'info-content': '#1b1e25',
          success: '#8fbc8f',
          'success-content': '#1b1e25',
          warning: '#ecc94b',
          'warning-content': '#1b1e25',
          error: '#e75f50',
          'error-content': '#1b1e25',
        },
      },
    ],
    darkTheme: "bloom"
  },
};
