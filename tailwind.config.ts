import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        bold: ['var(--font-satoshiBold)'],
        light: ['var(--font-satoshiLight)'],
        regular: ['var(--font-satoshiRegular)'],
        medium: ['var(--font-satoshiMedium)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
