module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        base: "var(--bg-base)",
        elevated: "var(--bg-elevated)",
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        subtle: "var(--border-subtle)",
        accent: "var(--accent)",
        "accent-contrast": "var(--accent-contrast)",
      },
    },
  },
  safelist: [
    {
      pattern: /^(bg|text|border)-(base|elevated|primary|secondary|subtle|accent)$/,
    },
  ],
  plugins: [],
}
