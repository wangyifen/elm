module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: [1, 4], // 缩进
        semi: 0, // 额外的分号
        'space-before-function-paren': 0, // 函数前加空格
        'no-trailing-spaces': 0, //不允许拖拽空格
        eqeqeq: 0, //全等于非等于
        'spaced-comment': 0,
        'no-multi-spaces': 0,
        'no-multiple-empty-lines': 0,//末行有太多空格
        'comma-spacing': 0//逗号后边一个空格
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        }
    ]
}
