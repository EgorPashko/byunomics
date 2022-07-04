module.exports = {
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:react/recommended",
    "plugin:testing-library/recommended",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
  ],
  plugins: ["simple-import-sort", "import", "unused-imports", "i18next", "@emotion", "sonarjs"],
  env: {
    browser: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "no-plusplus": "off",
    "func-names": "off",
    "eslint-disable-next-line no-param-reassign": "off",
    "no-param-reassign": [2, { props: false }],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "consistent-return": "off",
    "@typescript-eslint/no-implied-eval": "off",
    "import/no-named-as-default-member": "off",
    "import/no-cycle": "off",

    "sort-imports": "off",
    "import/order": "off",
    "linebreak-style": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "import/prefer-default-export": "off",
    "react/display-name": "off",
    "no-void": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "import/no-named-as-default": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "import/no-useless-path-segments": [
      "error",
      {
        noUselessIndex: true,
      },
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
    ],
    "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
    "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
    "@typescript-eslint/prefer-ts-expect-error": "error",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
    ],
    "react/destructuring-assignment": "off",
    "react/forbid-dom-props": ["error", { forbid: ["style"] }],
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        reservedFirst: true,
      },
    ],
    "react/jsx-no-useless-fragment": "error",
    "react/jsx-fragments": "error",
    "no-nested-ternary": "off",
    "react/function-component-definition": [
      "error",
      { namedComponents: "arrow-function", unnamedComponents: "arrow-function" },
    ],

    "@typescript-eslint/ban-ts-comment": [
      "error",
      { "ts-expect-error": "allow-with-description", minimumDescriptionLength: 5 },
    ],
    "spaced-comment": ["error", "always", { markers: ["#region"], exceptions: ["#endregion"] }],

    "no-console": "warn",
    "eslint-comments/no-unlimited-disable": "error",
    "eslint-comments/disable-enable-pair": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: ["**/*.spec.ts*"] }],
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
  },
  overrides: [
    {
      files: [
        "src/components/common/*.tsx",
        "src/components/Table/**/*.ts*",
        "src/components/Form/*.ts*",
        "src/components/layout/components/*.ts*",
      ],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            paths: [
              "lib/swagger/generated",
              {
                name: "react",
                importNames: ["FC"],
                message: "Write Function Components as regular functions with props.",
              },
              {
                name: "@emotion/css",
                importNames: ["css"],
                message: "Import from @emotion/react.",
              },
            ],
            patterns: ["components/Form/*", "models/*", "lib/api/responses", "../../*"],
          },
        ],
      },
    },
    {
      files: ["src/models/*.ts", "src/lib/api/*.ts"],
      rules: {
        "no-restricted-imports": ["off"],
      },
    },
    {
      files: ["src/lib/swagger/generated.ts"],
      rules: {
        "eslint-comments/no-unlimited-disable": "off",
      },
    },
  ],
};
