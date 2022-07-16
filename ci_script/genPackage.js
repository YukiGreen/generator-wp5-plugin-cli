var fse = require('fs-extra');

var packageJson = require('../package.json');

// Date.prototype.Format = function (fmt) {
//   //author: meizz
//   var o = {
//     'M+': this.getMonth() + 1, //月份
//     'd+': this.getDate(), //日
//     'H+': this.getHours(), //小时
//     'h+': this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
//     'm+': this.getMinutes(), //分
//     's+': this.getSeconds(), //秒
//     'q+': Math.floor((this.getMonth() + 3) / 3), //季度
//     S: this.getMilliseconds() //毫秒
//   };
//   if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
//   for (var k in o)
//     if (new RegExp('(' + k + ')').test(fmt))
//       fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
//   return fmt;
// };

// const version = process.env.CI_BUILD_REF_NAME.toLocaleLowerCase();
// If (version.match(/(beta|release)/)) {
//   packageJson.version = process.env.CI_BUILD_REF_NAME.toLocaleLowerCase().replace('-beta_', '-beta.');
// } else {
//   packageJson.version = new Date().Format('yyyy.MMdd.HHmmss');
// }
packageJson.version = process.env.CI_BUILD_REF_NAME.toLocaleLowerCase().replace(
  '-beta_',
  '-beta.'
);
packageJson.main = 'app/index.js';
packageJson.files = 'app';

fse.writeFileSync('./generators/package.json', JSON.stringify(packageJson, undefined, 4));
