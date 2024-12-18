/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          10: 'rgba(255, 255, 255, 1)',
          20: 'rgba(249, 249, 249, 1)',
          30: 'rgba(207, 207, 207, 1)',
          40: 'rgba(129, 129, 129, 1)',
          50: 'rgba(81, 81, 81, 1)',
          60: 'rgba(0, 0, 0, 1)',
        },
        brown: {
          10: 'rgba(245, 241, 238, 1)',
          20: 'rgba(228, 213, 201, 1)',
          30: 'rgba(199, 187, 181, 1)',
          40: 'rgba(84, 47, 26, 1)',
          50: 'rgba(52, 25, 9, 1)',
        },
        blue: {
          50: 'rgba(24, 119, 242, 1)',
        },
        yellow: {
          50: 'rgba(254, 229, 0, 1)',
        },
        red: {
          50: 'rgba(185, 51, 51, 1)',
        },
      },
      boxShadow: {
        '1pt': '0px 4px 4px 0px rgba(140, 140, 140, 0.25)',
        '2pt': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        '3pt': '0px 16px 20px 0px rgba(48, 48, 48, 0.62)',
      },
      animation: {
        'slide-up-fade': 'slideUpFade 0.5s ease-out, fadeOut 0.5s ease-out 4.6s',
      },
      keyframes: {
        slideUpFade: {
          '0%': { transform: 'translateX(-50%) translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateX(-50%) translateY(0px)', opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
