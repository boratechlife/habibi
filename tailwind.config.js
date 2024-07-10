module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js", // add this line
  ],
  theme: {
    extend: {   
      colors: {
      bimatoto: {
        darkPurple: '#210338',
        purple: '#4b2c59',
        gold: '#e5ac4f',
        darkGreen: '#294e3f',
        darkerGreen: '#0f382b',
        blue: '#325e84',
        darkGreen1: '#223c23',
        
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
