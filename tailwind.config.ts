import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emergency: {
          red: "#DC2626",
          dark: "#7F1D1D",
          light: "#FEE2E2",
        },
        medical: {
          blue: "#2563EB",
          dark: "#1E3A8A",
          light: "#DBEAFE",
        },
        dark: {
          bg: "#0F172A",
          card: "#1E293B",
          border: "#334155",
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
};

export default config;
