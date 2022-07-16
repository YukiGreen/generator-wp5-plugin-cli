var fse = require('fs-extra');

Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'H+': this.getHours(), //小时
    'h+': this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  return fmt;
};

var moduleName = process.env.CI_PROJECT_NAME;
var version = process.env.CI_BUILD_REF_NAME;
if (!version.match(/(beta|release)/i)) {
  version = new Date().Format('yyyy.MMdd.HHmmss');
}

var sonarProjectPropertiesString = fse.readFileSync('./ci_script/sonar-project.properties', 'utf8');

sonarProjectPropertiesString = sonarProjectPropertiesString
  .replace(/sonar.projectKey=.*/, `sonar.projectKey=${moduleName}`)
  .replace(/sonar.projectName=.*/, `sonar.projectName=${moduleName}`)
  .replace(/sonar.projectVersion=.*/, `sonar.projectVersion=${version}`);

fse.outputFileSync('./sonar-project.properties', sonarProjectPropertiesString);