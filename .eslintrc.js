module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:jest-dom/recommended',
    'plugin:testing-library/react',
    'plugin:deprecation/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'jsx-a11y',
    'react',
    'react-hooks',
    'simple-import-sort',
    'testing-library',
  ],
  rules: {
    'import/group-exports': 'error',
    'import/no-anonymous-default-export': 'error',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/label-has-associated-control': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'import',
        next: 'import',
      },
      {
        blankLine: 'any',
        prev: 'export',
        next: 'export',
      },
      {
        blankLine: 'never',
        prev: 'case',
        next: 'case',
      },
      {
        blankLine: 'never',
        prev: 'case',
        next: 'default',
      },
    ],
    'max-len': [
      'error',
      {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    'no-console': 'error',
    'no-var': 'error',
    'no-unused-vars': 'off',
    'react/display-name': 'error',
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Node builtin modules:
          ['^node:\\w'],
          // Third party packages, with React and Next first:
          ['^react', '^next', '^\\w', '^@?\\w'],
          ['^@/\\w'],
          // Parent imports, with `..` first.
          ['^\\.\\./?$', '^\\.\\.(?!/?$)'],
          // Other relative imports with nested folders imports first and same folder imports last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Side effect imports.
          ['^\\u0000'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/consistent-type-exports': [
      'error',
      {
        fixMixedExportsWithInlineTypeSpecifier: false,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
      },
    ],
  },
  ignorePatterns: [
    '!.*',
    'build',
    'coverage',
    'node_modules',
    'public',
    'prisma',
    'commitlint.config.js',
    '.eslintrc.js',
    'postcss.config.js',
    'jest.config.mjs',
    'jest.setup.js',
  ],
  globals: {
    expect: true,
    describe: true,
    it: true,
    beforeEach: true,
    afterEach: true,
    jest: true,
  },
};
