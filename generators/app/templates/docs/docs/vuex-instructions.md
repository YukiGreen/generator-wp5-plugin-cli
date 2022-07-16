
<h1 style="font-size: 30px;text-align: center">状态管理器使用说明</h1>

## 项目中状态管理器的使用
在 src 目录下的 store 中的 modules 文件夹配置全局状态管理的 module

```markdown
└── src
    ├── store # 全局状态管理
    │       └── modules
    │               ├── helloModule
    │               │       └── index.ts
    │               └── mutation-types.ts
    └── index.js  # store的Module导出， 更新store后，可直接在在项目目录下执行“yarn build:entry”, 自动生成该文件中的内容，无需手动导入
```
注册vuex
```javascript
import { pluginStore } from 'plugin-ui';

// 注册store
store.registerModule('pluginStore', pluginStore);
```
在插件中可正常使用vuex，如下示例。`pluginStore`为注册vuex时，注册的名字。
```javascript
<template>
  <div id="pte-hello-world">
    <span>{{ getUserId }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component
export default class helloModule extends Vue {
  @Getter('pluginStore/getUserId') getUserId;
  
}
</script>
```