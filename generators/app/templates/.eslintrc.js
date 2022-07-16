// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    node: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: { // 0:关闭 1:警告 2:错误
    'generator-star-spacing': 'off', // allow async-await
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // allow debugger during development
    'arrow-parens': 0,                                              //箭头函数用小括号括起来
    'generator-star-spacing': 0,                                    //生成器函数*的前后空格
    'indent': 'off',
    'no-console': 0,                                                //console打印
    "no-undef": 1,                                                  //未定义的变量
    "no-unused-vars": [0, {                                         //声明后未被使用的变量或参数
      "vars": "local",
      "args": "none"
    }],
    'semi': ['error', 'always'], // 结尾有分号
    "comma-dangle": [2, "never"],
    "no-multiple-empty-lines": [0, {"max": 100}],                    //空行最多不能超过100行
    "no-mixed-spaces-and-tabs": [0],                                //禁止混用tab和空格
    "no-tabs": 'off',
    "comma-spacing": 0, //逗号前后的空格
    "keyword-spacing":0, //关键字前后必须有空格 如 } else {
    "no-irregular-whitespace": 0, //不能有不规则的空格
    "no-multi-spaces": 0, //不能用多余的空格
    "spaced-comment":0, 　　　　　　　　                              // 注释前必须有空格
    "indent": ["off", 2],
    "handle-callback-err":0,                                          //nodejs 处理错误
    "padded-blocks": 0,                                               //块语句内行首行尾是否要空行
    "camelcase": 0,                                                   //强制驼峰法命名
    "space-before-function-paren": 0,                                    //函数定义时括号前面要不要有空格
    "eqeqeq":0,                                                       //比较的时候使用严格等于
    "eol-last":0,
    "no-trailing-spaces": 0,                                             //一行最后不允许有空格
    "space-before-blocks":0,                                             //块前的空格
  },
}
