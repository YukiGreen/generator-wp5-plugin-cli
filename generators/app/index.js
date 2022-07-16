const Generator = require('yeoman-generator');
const commandExists = require('command-exists').sync;
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the wicked ${chalk.red('wp5-plugin-cli')} !`));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'name:',
        default: path.basename(process.cwd())
      },
      {
        type: 'input',
        name: 'description',
        message: 'description:',
        default: 'desc'
      },
      {
        type: 'input',
        name: 'repo',
        message: 'git repository:',
        default: '#'
      },
      {
        type: 'input',
        name: 'license',
        message: 'license:',
        default: 'ISC'
      },
      {
        type: 'input',
        name: 'author',
        message: 'author:',
        default: '#'
      },
      {
        type: 'input',
        name: 'productCode',
        message: 'product identification:',
        default: path.basename(process.cwd())
      },
      {
        type: 'input',
        name: 'zhCN',
        message: 'Chinese name of Engineering:',
        default: 'plugin脚手架工程'
      },
      {
        type: 'input',
        name: 'enUS',
        message: 'English name of Engineering:',
        default: 'Scaffolding works'
      },
      {
        type: 'list', // 提供判断
        name: 'mirrorSource',
        message: 'Please select the mirror source of project dependencies?',
        choices: [
          {
            name:
              'Intranet mirroring(https://registry.npmjs.org/)',
            value: 'i'
          },
          {
            name:
              'External network mirroring(https://registry.npm.taobao.org/)',
            value: 'o'
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      this.customParameters = props;
    });
  }

  writing() {
    this.log(this.customParameters);
    // 优化后的写法
    const templates = [
      'build/bin/build.js',
      'build/bin/build-entry.js',
      'build/bin/build-init.js',
      'build/bin/build-lang.js',
      'build/bin/build-link.js',
      'build/bin/build-service.js',
      'build/bin/build-style.js',
      'build/bin/del-comp.js',
      'build/bin/new-comp.js',
      'build/md-loader/config.js',
      'build/md-loader/containers.js',
      'build/md-loader/fence.js',
      'build/md-loader/index.js',
      'build/md-loader/util.js',
      'build/check-versions.js',
      'build/paths.js',
      'build/thread-loader.conf.js',
      'build/utils.js',
      'build/vue-loader.conf.js',
      'build/webpack.base.conf.js',
      'build/webpack.conf.js',
      'build/webpack.dev.conf.js',
      'build/webpack.lib.conf.js',
      'build/webpack.prod.conf.js',
      'build/webpack.prod.lib.conf.js',
      'ci_script/build.sh',
      'ci_script/changeVersion.js',
      'ci_script/change_version.sh',
      'ci_script/env.sh',
      'ci_script/genPackage.js',
      'ci_script/genSonar.js',
      'ci_script/genTypedoc.js',
      'ci_script/getSonarInfo.js',
      'ci_script/prepare.sh',
      'ci_script/publish.sh',
      'ci_script/publish_api_docs.sh',
      'ci_script/sonar-project.properties',
      'ci_script/switch_source.sh',
      'config/dev.env.js',
      'config/dllEntry.json',
      'config/index.js',
      'config/prod.env.js',
      'config/test.env.js',
      'docs/App.vue',
      'docs/docs/changelog.md',
      'docs/docs/edspHelloModule.md',
      'docs/docs/internationalization.md',
      'docs/docs/quickstart.md',
      'docs/docs/router-instructions.md',
      'docs/docs/vuex-instructions.md',
      'docs/i18ns/en/login.ts',
      'docs/i18ns/en/packages.ts',
      'docs/i18ns/en/public.ts',
      'docs/i18ns/index.ts',
      'docs/i18ns/zh/login.ts',
      'docs/i18ns/zh/packages.ts',
      'docs/i18ns/zh/public.ts',
      'docs/layout/assets/images/sunline_logo.png',
      'docs/layout/assets/styles/common.css',
      'docs/layout/assets/styles/fonts/icomoon.eot',
      'docs/layout/assets/styles/fonts/icomoon.svg',
      'docs/layout/assets/styles/fonts/icomoon.ttf',
      'docs/layout/assets/styles/fonts/icomoon.woff',
      'docs/layout/assets/styles/fonts/style.css',
      'docs/layout/components/demo-block.vue',
      'docs/layout/components/errorPage/404.vue',
      'docs/layout/components/login/index.vue',
      'docs/layout/components/selectDomainDialog.vue',
      'docs/layout/index.vue',
      'docs/layout/util.js',
      'docs/main.ts',
      'docs/nav.config.json',
      'docs/route.config.js',
      'docs/services/index.ts',
      'docs/services/edspLogin/API.ts',
      'docs/services/edspLogin/index.ts',
      'docs/services/login/API.js',
      'docs/services/login/index.js',
      'docs/services/userCenter/API.ts',
      'docs/services/userCenter/index.ts',
      'docs/shims-tsx.d.ts',
      'docs/shims-vue.d.ts',
      'docs/store/index.ts',
      'docs/store/modules/user.js',
      'docs/store/mutation-types.ts',
      'docs/utils/config.js',
      'docs/utils/Controls.json',
      'docs/utils/des.js',
      'docs/utils/domainHelper.ts',
      'docs/utils/loaderJson.js',
      'docs/utils/Message.js',
      'docs/utils/urlHelpers.js',
      'docs/utils/validate.js',
      'examples/App.vue',
      'examples/components/selectDomainDialog.vue',
      'examples/dashbord.vue',
      'examples/i18ns/en/login.ts',
      'examples/i18ns/en/packages.ts',
      'examples/i18ns/en/public.ts',
      'examples/i18ns/index.ts',
      'examples/i18ns/zh/login.ts',
      'examples/i18ns/zh/packages.ts',
      'examples/i18ns/zh/public.ts',
      'examples/images/errors-bottom-bg.png',
      'examples/images/errors-pic-404.png',
      'examples/images/pic-404.png',
      'examples/images/sunline_logo.png',
      'examples/images/sunline_logo_mini.png',
      'examples/main.ts',
      'examples/route.config.js',
      'examples/services/index.ts',
      'examples/services/edspLogin/API.ts',
      'examples/services/edspLogin/index.ts',
      'examples/services/login/API.js',
      'examples/services/login/index.js',
      'examples/services/userCenter/API.ts',
      'examples/services/userCenter/index.ts',
      'examples/shims-tsx.d.ts',
      'examples/shims-vue.d.ts',
      'examples/store/index.ts',
      'examples/store/modules/user.js',
      'examples/store/mutation-types.ts',
      'examples/template/edspHelloModule/index.vue',
      'examples/utils/config.js',
      'examples/utils/Controls.json',
      'examples/utils/des.js',
      'examples/utils/domainHelper.ts',
      'examples/utils/loaderJson.js',
      'examples/utils/Message.js',
      'examples/utils/urlHelpers.js',
      'examples/utils/validate.js',
      'examples/views/errorPage/404.vue',
      'examples/views/layout/index.vue',
      'examples/views/login/index.vue',
      'packages/edspHelloModule/index.js',
      'packages/edspHelloModule/index.less',
      'packages/edspHelloModule/src/index.vue',
      'packages/edspHelloModule/styles/edspHelloModule.less',
      'packages/shims-tsx.d.ts',
      'packages/shims-vue.d.ts',
      'public/favicon.ico',
      'public/images/sunline_logo.png',
      'public/index.html',
      'src/components/helloModule/helloEditDialog.vue',
      'src/Controls.json',
      'src/i18ns/en/edspHelloModule.ts',
      'src/i18ns/en/public.ts',
      'src/i18ns/index.js',
      'src/i18ns/zh-CN/edspHelloModule.ts',
      'src/i18ns/zh-CN/public.ts',
      'src/index.js',
      'src/locale/format.js',
      'src/locale/index.js',
      'src/mock/helloModule/helloList.json',
      'src/proxy.json',
      'src/services/ComponentAPI.json',
      'src/services/edspHelloModule/API.ts',
      'src/services/edspHelloModule/index.ts',
      'src/services/index.ts',
      'src/store/modules/edspPlugin/index.ts',
      'src/store/mutation-types.ts',
      'src/styles/componentsIndex.less',
      'src/styles/index.less',
      'src/styles/entry.less',
      'src/types/custom.d.ts',
      'src/types/hello.d.ts',
      'src/types/resResult.d.ts',
      'src/utils/docRootPathHelper.ts',
      'src/utils/domainHelper.ts',
      'src/utils/httpClientHelper.ts',
      'src/utils/InvalidToken.js',
      'src/utils/loaderJson.js',
      'src/utils/MyAxios.js',
      'src/utils/permissionMapping/permissionKeys.ts',
      'src/utils/permissionMapping/permissionMapping.ts',
      'src/utils/tools.js',
      'src/utils/urlHelper.ts',
      'src/utils/vueVMHelper.ts',
      'src/entry.js',
      'static/.gitkeep',
      'test/e2e/custom-assertions/elementCount.js',
      'test/e2e/nightwatch.conf.js',
      'test/e2e/runner.js',
      'test/e2e/specs/test.js',
      'test/unit/.eslintrc',
      'test/unit/jest.conf.js',
      'test/unit/setup.js',
      'test/unit/specs/edspHelloModule.spec.js',
      'web-reverse-proxy/app.js',
      'web-reverse-proxy/package-lock.json',
      'web-reverse-proxy/package.json',
      'web-reverse-proxy/README.md',
      '.babelrc',
      '.editorconfig',
      '.eslintignore',
      '.eslintrc.js',
      '.gitignore',
      '.npmrc',
      '.postcssrc.js',
      '.yarnrc',
      'components.json',
      'gulpfile.js',
      'package.json',
      'postcss.config.js',
      'README.md',
      'tsconfig.json',
      'tslint.json',
      'yarn.lock'
    ];
    templates.forEach(item => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(`./${this.customParameters.name}/${item}`),
        this.customParameters
      );
    });
  }

  end() {
    this.log(`
Success! Created ${this.customParameters.name} at ${path.basename(process.cwd())}.

Inside that directory, you can run several commands:
* cd ${this.customParameters.name} && yarn :download dependency.
* yarn dev: Start the development server.
* yarn deploy: Deploy the project.
`);
  }
};
