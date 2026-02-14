// postcss.config.js
export default {
  plugins: {
    /**
     * Tailwind core
     */
    tailwindcss: {},

    /**
     * Modern CSS features
     */
    "postcss-preset-env": {
      stage: 3,
      features: {
        "nesting-rules": true,
      },
    },

    /**
     * Vendor prefixes
     */
    autoprefixer: {
      grid: "autoplace",
      flexbox: "no-2009",
    },

    /**
     * Minify only in production
     */
    ...(process.env.NODE_ENV === "production"
      ? {
          cssnano: {
            preset: "default",
          },
        }
      : {}),
  },
};
