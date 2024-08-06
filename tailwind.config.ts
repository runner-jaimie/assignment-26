import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [require("daisyui"), require("@tailwindcss/forms")],

  // 플러그인이 하는 일이 base LayoutRouter, utility layer component layer를 확장하는 것이다.
};
export default config;
