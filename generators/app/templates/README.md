# 插件开发项目
## 项目目录结构
```markdown
.
├── build # webpack配置文件
├── config # 相关配置变量定义
├── docs # 前端文档视图层
├── examples # 前端视图层
├── packages # 主要插件定义目录
│   ├── helloModule # 欢迎模块
│   ├── ... # 等等其他模块
├── src # 插件相关其他配置如国际化、样式、store、services等
│   ├── components # 公共组件
│   ├── i18ns # 插件内国际化文件
│   ├── mock # mock数据文件
│   ├── services # 请求接口定义文件
│   ├── store # 状态管理文件
│   ├── styles # 样式文件汇总
│   ├── utils # 工具文件
│   ├── index.js # 导出插件资源
├── test # 测试文件
├── types # 类型定义文件
├── static # 静态文件
├── .babelrc # babel配置文件
├── .gitignore # git上传忽略文件
├── .npmrc # npm配置文件
├── .yarnrc # yarn配置文件
├── eslintrc.js # eslint配置文件
├── components.js # babel配置文件
├── package.json # 包管理文件
├── tsconfig.json # typescript配置文件
└── tslint.json # typescript校验文件
.
```
## 项目内相关命令说明
```bash
# 1. 初始化安装源
yarn source:init

# 2. 安装项目依赖
yarn

# 3. 初始化项目
yarn build:init

# 4. 本地启动本项目/启动example页面
yarn dev

# 5. 启动docs页面
yarn dev:docs

# 6. 自动创建子模块相关文件
yarn add:component [组件英文名-小驼峰命名(建议以有规定含义的单词开头)] [组件样式前缀-小写单词-不写时默认为空] [组件中文名-不写时默认显示组件英文名]

# 8. build lib（打插件包）
yarn deploy

# 9. build docs（暂时没有使用）
yarn dist

# 10. 插件本地和目标项目联调
yarn dev:link
```

## 插件项目打包发布
```bash
# 1. 安装依赖
yarn

# 2. 打包
echo "version", $version
npm version $version
yarn deploy

# 3. 发布
npm publish --registry=http://nexus.yfb.sunline.cn:8099/nexus3/repository/npm-private/
```

## 在目标项目中联调
```javascript
# 1. 在本项目中执行
yarn dev:link

# 2. 然后在本项目中执行(执行过一遍之后就不需要以后就不需要再执行了，解除链接yarn unlink后可再执行)
yarn link

# 3. 然后在在目标项目中执行(执行一遍即可，后面解除链接（yarn unlink edsp-plat-ui）后可再执行)
yarn link edsp-plat-ui

# 在目标项目main.ts中引入，代码如下
import EdspPlatUi, { edspPlatUiStore, edspPlatUiLang } from 'edsp-plat-ui';

Vue.use(EdspPlatUi, {
  i18n: (key, value) => i18n.t(key, value)
});
store.registerModule('edspPlatUiStore', edspPlatUiStore);

i18n.mergeLocaleMessage('zh', edspPlatUiLang["zh-CN"]);
i18n.mergeLocaleMessage('en', edspPlatUiLang.en);


# 另外一种引入国际化的方法是：在new I18ns对象的文件中
import { edspPlatUiLang } from "edsp-plat-ui";
 
localeLanguage["zh"] = { ...elementZhLocale, ...edspPlatUiLang["zh-CN"] };
localeLanguage["en"] = { ...elementEnLocale, ...edspPlatUiLang.en };
```

## 开发规范
1、typescript的接口定义规范文件在`src/types`下新建一个对应组件的`.d.ts`文件；
2、插件的英文名建议以特定含义开头比如edsp或fp等等开头；
