<h1 style="font-size: 30px;text-align: center">国际化开发及使用说明</h1>

## 1、国际化文件

在 src 目录下的 i18ns 文件夹内添加对应的国际化内容，一个模块一个国际化文件，建议使用模块名来命令。

国际化文件目录结构如下：

```markdown
└── src
├── i18ns # 国际化配置
├── en # 英文国际化的文件夹
│ ├── helloModule.ts # 模块一中文国际化映射表
│ └── **_.ts # 其他模块中文国际化映射表
├── zh-CN # 中文国际化的文件夹
│ ├── helloModule.ts # 模块一中文国际化映射表
│ └── _**.ts # 其他模块中文国际化映射表
└── index.js # 国际化配置导出, 可直接在项目目录下执行“yarn build:lang” 自动生成该文件中的内容，每次新增国际化文件后，可再执行一遍该命令
```

## 2、使用方式

插件导出了一个国际化对象，可使用如下方式导入：

```javascript
import { pluginLang } from "plugin-ui";
```

PS: `plugin-ui`为该插件自定义的插件名，假如取名为'plugin-ui',后面该插件名均用'plugin-ui'代替。
该 pluginLang 对象，结构如下：

```markdown
{
  'en': {
    demo: "demo",
    helloModule.address: "Address",
    helloModule.date: "Date",
    helloModule.edit: "Edit",
    helloModule.name: "Name",
    helloModule.option: "Option"
  },
  'zh-CN': {
    demo: "例子",
    helloModule.address: "地址",
    helloModule.date: "日期",
    helloModule.edit: "修改",
    helloModule.name: "姓名",
    helloModule.option: "操作"
  },
  ...
}
```

使用方式一：在目标项目的 main.ts 中引入

```javascript
import { pluginLang } from 'plugin-ui';

// 注册国际化对象
i18n.mergeLocaleMessage('zh', pluginLang["zh-CN"]);
i18n.mergeLocaleMessage('en', pluginLang.en);
```

使用方式二：在目标项目的国际化对象实例化的时候引入

```javascript
import { pluginLang } from "../../src/index";

localeLanguage["zh"] = { ...pluginLang["zh-CN"] };
localeLanguage["en"] = { ...pluginLang.en };
localeLanguage.zh = Object.assign(localeLanguage.zh, public_zh);
localeLanguage.en = Object.assign(localeLanguage.en, public_en);

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: localStorage.getItem("LANGUAGE_STYLE") || "zh",
  messages: localeLanguage, // set locale messages
  silentTranslationWarn: false
});
```

# 开发插件时国际化的使用

在\*.vue 文件中，使用方式如下：

```javascript
<div>
  <el-button>{{`${$t('logQuery.expandForwTime')}`}}</el-button>
</div>
```

在*.ts 或者*.js 文件中，使用方式如下：

```javascript
import { t } from 'plugin/locale';
  handleTimeStep(timeUnitsValue: number): { step: number; timesUnits: any } {
      return {
        step: 31536000000,
        timesUnits: t('dateTimePicker.years'),
      };
  }
```
