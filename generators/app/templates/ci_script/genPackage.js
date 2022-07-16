const fse = require('fs-extra');
const _ = require('lodash');
const path = require('path');

let packageJson = require('../package.json');

const CI_BUILD_REF_NAME = process.env.CI_BUILD_REF_NAME;

if (CI_BUILD_REF_NAME.match(/.*-release$/i) || CI_BUILD_REF_NAME.match(/.*-m[0-9]+$/i) || CI_BUILD_REF_NAME.match(/.*-beta_[0-9]+$/i) || CI_BUILD_REF_NAME.match(/.*-hotfix_[0-9]+$/i)) {
  packageJson.version = process.env.CI_BUILD_REF_NAME.replace(/-RELEASE/i, '').replace(/-beta_/i, '-beta.');
} else {
  packageJson.name = '@' + process.env.GITLAB_USER_EMAIL.split('@')[0] + '/' + packageJson.name;
}

console.log('packageJson: ', packageJson);
console.log('__dirname: ', __dirname);
let distDir = "deploy";

// 判断是否为模块联邦，如果是模块联邦，配置成模块联邦所需的package内容
if (process.env.IS_MF === "true") {
  distDir = "dist";
  packageJson.name = packageJson.name + "-mf";
  packageJson.main = './remoteEntry.js';
  packageJson = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    author: packageJson.author,
    license: packageJson.license,
    private: packageJson.private,
    repository: packageJson.repository,
    main: packageJson.main,
    keywords: packageJson.keywords
  }
  console.log('packageJsonMf: ', packageJson);
}

const newPackage = path.join(__dirname, '../', distDir, 'package.json');
console.log('newPackage: ', newPackage);

fse.writeFileSync(newPackage, JSON.stringify(packageJson, undefined, 4));
