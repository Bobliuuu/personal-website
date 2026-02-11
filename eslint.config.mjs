import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

export default [
  ...coreWebVitals,
  ...typescript,
  // Project-specific relaxations to match prior `next lint` behavior.
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "import/no-anonymous-default-export": "off",
    },
  },
  {
    files: ["tailwind.config.ts", "postcss.config.mjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
