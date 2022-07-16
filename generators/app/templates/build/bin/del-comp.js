"use strict";

console.log();
process.on("exit", () => {
  console.log();
});

if (!process.argv[2]) {
  console.error("[组件名]必填 - Please enter new component name");
  process.exit(1);
}

/**
 * [camelCaseToHyphen 将驼峰命名转换为连字符]
 * @param  {[string]} str [驼峰命名的字符串]
 * @return {[string]}     [连字符的字符串]
 */
function camelCaseToHyphen(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

const path = require("path");
const fs = require("fs");
const fileSave = require("file-save");
const uppercamelcase = require("uppercamelcase");
const componentname = process.argv[2];
const ComponentName = uppercamelcase(componentname);
const PackagePath = path.resolve(__dirname, "../../packages", componentname);
const Files = [
  {
    filename: "index.js",
    content: `import ${ComponentName} from './src/index';

/* istanbul ignore next */
${ComponentName}.install = function(Vue) {
  Vue.component(${ComponentName}.name, ${ComponentName});
};

export default ${ComponentName};`
  },
  {
    filename: "src/index.vue",
    content: ``
  },
  {
    filename: "index.less",
    content: ""
  },
  {
    filename: path.join("../../docs/docs", `${componentname}.md`),
    content: `## `
  },
  {
    filename: path.join(
      "../../examples/template",
      `${componentname}/index.vue`
    ),
    content: `<template>
  <div><${camelCaseToHyphen(componentname)} /></div>
</template>`
  },
  {
    filename: path.join("../../test/unit/specs", `${componentname}.spec.js`),
    content: `import { createTest, destroyVM } from '../util';
import ${ComponentName} from 'packages/${componentname}';

describe('${ComponentName}', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(${ComponentName}, true);
    expect(vm.$el).to.exist;
  });
});
`
  },

  {
    filename: path.join(`../../src/i18ns/en/`, `${componentname}.ts`),
    content: `export default {}`
  },
  {
    filename: path.join(`../../src/i18ns/zh-CN/`, `${componentname}.ts`),
    content: `export default {}`
  },
  {
    filename: path.join(`../../src/services/`, `${componentname}/API.ts`),
    content: `import ComponentAPI from '../ComponentAPI.json';
const API = {
};
export default API;`
  },
  {
    filename: path.join(`../../src/services/`, `${componentname}/index.ts`),
    content: `import API from "./API";
import HttpClientHelper from "../../utils/httpClientHelper";
class ${ComponentName}Service {
}

export default new ${ComponentName}Service();`
  }
];

/**
 * @param {*} path 必传参数可以使文件夹可以是文件
 * @param {*} reservePath 保存path目录， path值与reservePath值一样就保存
*/
function delFile(path, reservePath) {
  if (fs.existsSync(path)) {
    if(fs.statSync(path).isDirectory()) {
      let files = fs.readdirSync(path);
      files.forEach((file, index) => {
        let currentPath = path + "/" + file;
        if (fs.statSync(currentPath).isDirectory()) {
          delFile(currentPath, reservePath);
        } else {
          fs.unlinkSync(currentPath);
        }
      });
      if (path != reservePath) {
        fs.rmdirSync(path);
      }
    } else {
      fs.unlinkSync(path);
    }
  }
}

// 1、删除components.json的指定组件
const componentsFile = require("../../components.json");
if (componentsFile[componentname]) {
  // console.error(`${componentname} 已存在.`);
  // process.exit(1);
  delete componentsFile[componentname];
}
fileSave(path.join(__dirname, "../../components.json"))
  .write(JSON.stringify(componentsFile, null, "  "), "utf8")
  .end("\n");

// // 2、删除exposeComponents.json的指定组件
// const exposesFile = require("../../exposeComponents.json");
// delete exposesFile[`./${componentname}`];
// fileSave(path.join(__dirname, "../../exposeComponents.json"))
//   .write(JSON.stringify(exposesFile, null, "  "), "utf8")
//   .end("\n");

// 3、删除package中的组件
Files.forEach(file => {
  delFile(path.join(PackagePath, file.filename), path.join(PackagePath, file.filename));
});

// 4、添加到 nav.config.json
const navConfigFile = require("../../docs/nav.config.json");
Object.keys(navConfigFile).forEach(lang => {
  let children = navConfigFile[lang][2].children;
  let index = children.forEach((obj, index) => {
    if (obj.path === `/${componentname}`) {
      return index;
    }
    return -1;
  });

  if (index > -1) { 
    children.splice(index, 1);
  }
});

fileSave(path.join(__dirname, "../../docs/nav.config.json"))
  .write(JSON.stringify(navConfigFile, null, "  "), "utf8")
  .end("\n");

console.log("DONE!");

// 5、导入services/index.ts
var render = require("json-templater/string");
var endOfLine = require("os").EOL;
var OUTPUT_PATH = path.join(__dirname, "../../src/services/index.ts");
var IMPORT_TEMPLATE =
  "export { default as {{packageUpper}}Service } from './{{package}}';";
var MAIN_TEMPLATE = `/* Automatically generated by './build/bin/build-service.js' */
{{include}}
`;

delete componentsFile.font;
function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}
var ComponentNames = Object.keys(componentsFile);

var includeComponentTemplate = [];

ComponentNames.forEach(name => {
  var filePath = path.resolve(
    __dirname,
    "../../src/services/" + name + "/index.ts"
  );
  if (fileExists(filePath)) {
    includeComponentTemplate.push(
      render(IMPORT_TEMPLATE, {
        packageUpper: uppercamelcase(name),
        package: name
      })
    );
  }
});

var template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine)
});

fs.writeFileSync(OUTPUT_PATH, template);
/**
del-comp.js脚本主要做了下面几件事：

删除components.json中记录的组件
删除 package
删除 index.less
删除 国际化文件
删除 Service文件
删除 nav.config.json中组件记录
删除service/index.ts
删除generators\app\templates\exposeComponents.json
*/