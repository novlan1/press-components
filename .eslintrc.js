module.exports = {
  root: true,
  extends: ['eslint-config-light-vue3'],
  plugins: ['tailwindcss'],
  globals: {
    getCurrentPages: true,
    uni: true,
    globalThis: true,
    qq: true,
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
    // 'import/order': [
    //   'error',
    //   {
    //     groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
    //     'newlines-between': 'always-and-inside-groups',
    //     named: true,
    //     alphabetize: {
    //       order: 'asc',
    //       caseInsensitive: false,
    //     },
    //     // sortTypesGroup: true,
    //     // 'newlines-between-types': 'always-and-inside-groups',
    //     pathGroups: [
    //       {
    //         pattern: 'vue',
    //         group: 'external',
    //         position: 'before',
    //       },
    //       {
    //         pattern: 'vite',
    //         group: 'external',
    //         position: 'before',
    //       },
    //       {
    //         pattern: 't-comm/**',
    //         group: 'external',
    //         position: 'before',
    //       },
    //       {
    //         pattern: 'press-ui/**',
    //         group: 'external',
    //         position: 'before',
    //       },
    //       {
    //         pattern: 'press-plus/**',
    //         group: 'external',
    //         position: 'before',
    //       },
    //       {
    //         pattern: 'press-next/**',
    //         group: 'external',
    //         position: 'before',
    //       },
    //       {
    //         pattern: '@/**',
    //         group: 'internal',
    //         position: 'before',
    //       },
    //     ],
    //     pathGroupsExcludedImportTypes: ['builtin'],
    //   },
    // ],
  },
};
