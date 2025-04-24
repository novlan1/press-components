module.exports = {
  root: true,
  extends: ['eslint-config-light-vue3'],
  plugins: ['tailwindcss'],
  globals: {
    getCurrentPages: true,
    uni: true,
    globalThis: true,
    qq: true,
    $t: 'readonly',

    Recordable: 'readonly',
    __PLATFORM__: true,
    __DEV__: true,
    __NODE_JS__: true,
    __X__: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    extraFileExtensions: ['.vue'],
  },
  overrides: [
    {
      files: ['*.js', '*.ts'],
      excludedFiles: ['*.test.js', '*.spec.js'],
      parserOptions: {
        project: 'tsconfig.eslint.json',
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          // 这里参照webpack的别名配置映射
          ['src', './src'],
          ['press-element-plus', './packages/element-plus'],
          ['press-tdesign-vue-next', './packages/tdesign-vue-next'],
          ['press-shared', './packages/shared'],
        ],
        // 告诉resolver-alias有哪些后缀的文件要解析
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.vue'],
      },
    },
    'import/ignore': ['node_modules'],
  },
  rules: {
    'tailwindcss/classnames-order': 'error', // 强制类名顺序
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always-and-inside-groups',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: 'vue',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'vite',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
};
