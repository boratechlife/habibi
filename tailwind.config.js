module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js", // add this line
  ],
  theme: {
    extend: {
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
