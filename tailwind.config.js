module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js", // add this line
  ],
  theme: {
    extend: {
      colors: {
        habibi: {
          brightYellow: "#f3b000",
          white: "#ffffff",
          green: "#377760",
          darkPurple: "#553140",
          darkGray: "#212121",
          darkGreen: "#183d21",
          darkerGreen: "#023e1e",
          lightGreen: "#8bc6a9",
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
