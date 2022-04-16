module.exports = {
  content: ["index.html", "src/**/*.{js,jsx}"],
  theme: {
    screens: {
        desktop: '1440px',
    },
    colors: {
        white: 'hsl(0, 0%, 100%)',
        blue: {
            light: 'hsl(239, 57%, 85%)',
            DEFAULT: 'hsl(238, 40%, 52%)',
        },
        red: {
            light: 'hsl(357, 100%, 86%)',
            DEFAULT: 'hsl(358, 79%, 66%)',
        },
        gray: {
            lightest: 'hsl(228, 33%, 97%)',
            light: 'hsl(223, 19%, 93%)',
            DEFAULT: 'hsl(211, 10%, 45%)',
            dark: 'hsl(212, 24%, 26%)',
        }
    },
    fontFamily: {
        serif: ['Rubic', 'sans-serif'],
    },
    fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700,
    },
    extend: {},
  },
  plugins: [],
};
