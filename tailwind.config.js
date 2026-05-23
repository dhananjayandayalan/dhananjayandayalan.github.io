/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-primary': '#2563EB',
        'accent-secondary': '#0F766E',
        'surface-muted': '#E2E8F0',
        'surface-subtle': '#CBD5E1',
        'foreground-primary': '#0F172A',
        'foreground-inverse': '#FFFFFF',
        'background-subtle': '#F8FAFC',
        'background-strong': '#111827',
        'foreground-muted': '#475569',
        'foreground-subtle': '#94A3B8',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '5': '5px',
      },
      boxShadow: {
        'soft-sm': '0 14px 28px -24px rgba(15, 23, 42, 0.24)',
        'soft-sm-strong': '0 14px 28px -24px rgba(15, 23, 42, 0.32)',
        'soft-md': '0 20px 40px -28px rgba(15, 23, 42, 0.28)',
        'soft-md-strong': '0 20px 40px -28px rgba(15, 23, 42, 0.36)',
        'soft-lg': '0 24px 50px -30px rgba(15, 23, 42, 0.3)',
        'soft-lg-strong': '0 24px 50px -30px rgba(15, 23, 42, 0.38)',
        'soft-sm-hover': '0 18px 34px -24px rgba(15, 23, 42, 0.28)',
        'soft-sm-hover-strong': '0 18px 34px -24px rgba(15, 23, 42, 0.36)',
        'soft-md-hover': '0 22px 42px -26px rgba(15, 23, 42, 0.3)',
        'soft-md-hover-strong': '0 22px 42px -26px rgba(15, 23, 42, 0.38)',
      },
      borderRadius: {
        'surface': '16px',
      },
      transitionDuration: {
        'smooth': '200ms',
      },
      transitionTimingFunction: {
        'smooth': 'ease',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
