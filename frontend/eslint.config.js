// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
    expoConfig,
    {
        ignores: ['dist/*'],
        settings: {
            'import/resolver': {
                typescript: {
                    project: './jsconfig.json',
                },
                node: true,
            },
        },
        rules: {
            'no-trailing-spaces': 'error',
            'eol-last': ['error', 'always'],
            'no-unused-vars': ['error', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            }],

            // =========================
            // Formatting (via ESLint, not Prettier)
            // =========================

            'comma-dangle': ['error', 'never'], // no trailing commas
            'indent': ['error', 4, {
                SwitchCase: 1,
            }],
            'no-multiple-empty-lines': ['error', {
                max: 1,
                maxEOF: 1,
            }]
        },
    },
]);