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
    'react-hooks',
    'jsx-a11y',
    'simple-import-sort',
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
  ],
};
