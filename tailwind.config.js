module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js", // add this line
  ],
  theme: {
    extend: {   
      colors: {
      indie: {
        lightGold: '#dac06d',
        gold: '#efd051',
        darkGold: '#976700',
        lightGray: '#b5b5b5',
        red: '#d30023',
        darkGray: '#212121',
        black: '#000000',
      },
    },
      keyframes: {
        "change-color": {
          "0%,50%": {
            color: "#fff",
          },
        },
        scroll: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
      },
    },
  },
  plugins: [
    require("flowbite/plugin"), // add this line
  ],
};
