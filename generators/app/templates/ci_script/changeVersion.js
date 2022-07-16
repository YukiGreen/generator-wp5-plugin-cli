var fs = require('fs');
var _ = require('lodash');

Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

var controlsJson = require('../src/Controls.json');
var proxyJson = require('../src/proxy.json');
var packageJson = require('../package.json');
var proxyJson = require('../src/proxy.json');

var moduleProject = process.env.CI_PROJECT_NAME;
var moduleVersion = process.env.CI_BUILD_REF_NAME.toLocaleLowerCase()
  .replace(/-/g, '_')
  .replace(/\./g, '_dot_');
var moduleI18nName = controlsJson.i18nName;

var moduleProxys = [];
_.forEach(proxyJson, function (proxyInfo, index, array) {
  if (proxyInfo.isModule) {
    var newProxyInfo = {};
    if (proxyInfo.notVersion) {
      newProxyInfo.url = proxyInfo.proxyUrl;
    } else {
      newProxyInfo.url = proxyInfo.proxyUrl + '/' + moduleVersion;
    }
    newProxyInfo.protocol = proxyInfo.protocol;
    newProxyInfo.defaultTargetApi = proxyInfo.defaultTargetApi;
    newProxyInfo.description = proxyInfo.description;
    moduleProxys.push(newProxyInfo);
  }
});

var moduleInfo = {
  moduleCode: moduleProject + '-' + moduleVersion,
  moduleProject: moduleProject,
  i18nName: moduleI18nName,
  version: moduleVersion,
  proxyUrls: moduleProxys,
  productCode: controlsJson.productCode
};

controlsJson.version = moduleVersion;

const version = process.env.CI_BUILD_REF_NAME.toLocaleLowerCase();
if (version.match(/(beta|release|m[0-9]{1,})|rc[0-9]{1,}|snapshoot/)) {
  packageJson.version = process.env.CI_BUILD_REF_NAME.toLocaleLowerCase().replace('-beta_', '-beta.');
} else {
  packageJson.version = new Date().Format('yyyy.MMdd.hhmmss');
}

fs.writeFileSync('./src/Controls.json', JSON.stringify(controlsJson, undefined, 4));
