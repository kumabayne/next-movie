import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "linear-gradient(0deg, rgba(2,6,23,1) 0%, rgba(0,0,0,0) 32%)",
      },
      gridTemplateColumns: {
        credits: "auto 1fr auto",
        person: "67px 1fr 24px",
        profile: "88px 1fr",
        search: "67px 1fr",
      },
      maxHeight: {
        available: "-webkit-fill-available",
      },
      width: {
        "movie-card": "120px",
      },
    },
  },
  plugins: [],
};
export default config;
