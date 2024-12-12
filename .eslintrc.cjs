module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['airbnb', 'airbnb/hooks', 'eslint:recommended', 'plugin:import/recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended', 'prettier'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['import', 'prettier'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['api', './src/api'],
          ['assets', './src/assets'],
          ['components', './src/components'],
          ['config', './src/config'],
          ['hooks', './src/hooks'],
          ['pages', './src/pages'],
          ['routes', './src/routes'],
          ['utils', './src/utils'],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',

    'react/jsx-one-expression-per-line': 'off',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/comma-dangle': 'off',
    'react/jsx-wrap-multilines': 'off',

    'react/require-default-props': 'off',
    'object-curly-newline': 'off',
    '@typescript-eslint/indent': 'off',
    'no-plusplus': 'off',
    'react/no-unstable-nested-components': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'react/jsx-props-no-spreading': 'off',
    'max-len': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
};
