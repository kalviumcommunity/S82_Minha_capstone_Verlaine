module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        rose: {
          dust: '#E8C8C4',
          blush: '#F4E7E2',
          mauve: '#B89CA0',
          silk: '#F8EDEB',
          petal: '#FCEBE5',
        },
        ivory: '#FBF7F4',
        plum: '#4F3E4D',
        gold: '#CBB994',
      },
      fontFamily: {
        elegant: ['"Playfair Display"', 'serif'],
        clean: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-in-out',
        'slide-up': 'slide-up 0.4s ease-in-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
