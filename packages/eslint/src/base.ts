import globals from "globals"
import tseslint from "typescript-eslint"

import baseConfig from "./configs/base"
import jsdocConfig from "./configs/jsdoc"
import perfectionistConfig from "./configs/perfectionist"
import promiseConfig from "./configs/promise"
import simpleImportSortConfig from "./configs/simple-import-sort"
import sonarjsConfig from "./configs/sonarjs"
import stylisticConfig from "./configs/stylistic"
import typescriptConfig from "./configs/typescript"
import unicornConfig from "./configs/unicorn"
import unusedImports from "./configs/unused-imports"

const config = tseslint.config(
  {
    ignores: [
      "**/dist/",
      "**/build/",
      "**/logs/",
      "tsconfig.**",
      "**/eslint.config.js",
      "**/eslint.config.mjs",
      "**/tsconfig.json",
      "**/tsconfig.build.json",
      "**/jest-e2e.json",
      "**/package.json",
      "**/prettier.config.js",
      "**/nest-cli.json",
      "**/prettier.config.mjs",
    ],
  },
  // ...jsonConfig,
  ...baseConfig,
  ...typescriptConfig,
  ...jsdocConfig,
  ...sonarjsConfig,
  ...unicornConfig,
  ...promiseConfig,
  ...unusedImports,
  ...stylisticConfig,
  ...perfectionistConfig,
  ...simpleImportSortConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 5,
      sourceType: "commonjs",

      parserOptions: {
        project: true,
      },
    },

    rules: {
      "@typescript-eslint/no-invalid-this": "off", // why?
      "@typescript-eslint/quotes": "off", // why?
      "sonarjs/function-return-type": "off",
    },
  }
)

export default config
