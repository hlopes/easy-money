module.exports = {
  extends: 'next/core-web-vitals',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'react',
    'jsx-a11y',
    'react-hooks',
    'simple-import-sort',
  ],
  ignorePatterns: [
    '!.*',
    'build',
    'coverage',
    'node_modules',
    'public',
    'storybook-static',
    '.lintstagedrc.js',
    'commitlint.config.js',
    '.eslintrc.js',
    'prisma',
  ],
  rules: {
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
    'import/group-exports': 'error',
    'import/no-anonymous-default-export': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-console': 'error',
    'no-var': 'error',
    'no-unused-vars': 'off',
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
};