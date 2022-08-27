// https://eslint.org/docs/user-guide/configuring
"use strict";

module.exports = {
    root: true,
    env: {
        "browser": true,
        "es2021": true,
        "node": true,
    },
    // required to lint *.vue files
    extends: [
        "eslint:recommended",
        "@vue/typescript/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    globals: {
        defineProps: "readonly",
        defineEmits: "readonly",
        defineExpose: "readonly",
        withDefaults: "readonly",
        log: "readonly",
        debug: "readonly",
        error: "readonly",
        warn: "readonly",
        info: "readonly",
    },
    overrides: [
        {
            files: ["*.vue"],
            extends: [
                "plugin:vue/base",
                "plugin:vue/vue3-essential",
                "plugin:vue/vue3-strongly-recommended",
                "plugin:vue/vue3-recommended",
            ],
            parser: "vue-eslint-parser",
            parserOptions: {
                parser: "@typescript-eslint/parser",
                ecmaVersion: 2021
            },
            rules: {
                "@typescript-eslint/no-explicit-any": 0,
                "@typescript-eslint/no-unused-vars": 0,
                "vue/html-indent": ["error", 4],
                "vue/html-closing-bracket-newline": ["error", {
                    singleline: "never",
                    multiline: "never",
                }],
                "vue/max-attributes-per-line": ["error", {
                    singleline: 1,
                    multiline: 1,
                }],
                "vue/html-self-closing": 0,
                "vue/singleline-html-element-content-newline": 0,
                "vue/first-attribute-linebreak": 0,
            }
        },
        {
            files: ["*.ts"],
            rules: {
                "@typescript-eslint/no-explicit-any": 0,
                "@typescript-eslint/no-inferrable-types": 0,
                "@typescript-eslint/no-unused-vars": 0,
            },
        }
    ],
    parserOptions: {
        ecmaVersion: 2021
    },
    plugins: [
        "@typescript-eslint",
    ],
    ignorePatterns: [
        "**/*.d.ts"
    ],
    // add your custom rules here
    rules: {
        "jsx-quotes": ["error", "prefer-double"],
        "quotes": [
            "error",
            "double",
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            },
        ],
        "no-irregular-whitespace": 0,
        "space-before-function-parent": 0,
        "max-len": 0,
        "comma-dangle": ["error", "only-multiline"],
        "no-empty": 1,
        "prefer-const": 1,
        "@typescript-eslint/no-empty-function": 1,
        "@typescript-eslint/no-empty-interface": 1,
    },

    /*
    rulesForBuild: {
        "prefer-const": 2,
        "@typescript-eslint/no-empty-interface": 2,
    }
    */
};
