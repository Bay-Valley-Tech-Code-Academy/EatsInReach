/** @type {import('tailwindcss').Config} */
module.exports = {
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

      'Yellow-Green':'#AAD15F',
      'Orange(Pantone)': '#FF670E',
      'Chocolate-cosmos': '#4E070C',
      'Sinopia':'#D22701',
      'Almond': '#FDE4CE',
      
      'Electric-purple':'#BF00FF',
      'Mauveine':'#7900A2',
      'Reseda-green':'#5F6F52',
      'penn-red':'#990000',
      'Dartmouth-green':'#065E0C',
      'rosey-brown':'#CC9A86',
      'Kobicha':'#673d26'


      },
    },
  },
  plugins: [],
};
