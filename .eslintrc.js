module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        // "google",
        // typescript 표준 규칙 모음
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        // import 관련 규칙 모음
        "plugin:prettier/recommended",
        "prettier",
        // "prettier/@typescript-eslint",
        // "pretter/react",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        "linebreak-style": 0,
        "import/prefer-default-export": 0,
        "import/extensions": 0,
        "no-use-before-define": 0,
        "import/no-unresolved": 0,
        "react/react-in-jsx-scope": 0,
        "import/no-extraneous-dependencies": 0,
        "no-shadow": 0,
        "react/prop-types": 0,
        "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
        "jsx-ally/no-noninteractive-element-interactions": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
    },
};
