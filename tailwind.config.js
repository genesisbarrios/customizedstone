/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        // Modern stone-fabrication palette: charcoal (countertop-slab
        // color), warm bronze accent (fixtures/hardware), clean white/stone
        // -gray base. Swap these hex values per client to reuse this
        // template elsewhere.
        customizedstone: {
          primary: "#2B2B2E",
          "primary-content": "#F7F5F2",
          secondary: "#B08D57",
          "secondary-content": "#FFFFFF",
          accent: "#2B2B2E",
          "accent-content": "#F7F5F2",
          neutral: "#F7F5F2",
          "neutral-content": "#2B2B2E",
          "base-100": "#ffffff",
          "base-200": "#F5F3EF",
          "base-300": "#E5E1D8",
          "base-content": "#2B2B2E",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#e35d5d",
        },
      },
    ],
  },
};
