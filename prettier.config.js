/** @type {import("prettier").Config} */

module.exports = {
  semi: false,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrderTypeScriptVersion: "5.0.0",

  tailwindFunctions: ["clsx"],
};
