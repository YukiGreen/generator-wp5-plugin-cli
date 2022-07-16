const fse = require('fs-extra');
const _ = require('lodash');
const path = require('path');

const packageJson = require('../package.json');
const typedocJson = require('../typedoc.json');

if (process.env.CI_BUILD_REF_NAME.match(/.*-release$/i) || process.env.CI_BUILD_REF_NAME.match(/.*-beta_[0-9]$/i)) {
  packageJson.version = process.env.CI_BUILD_REF_NAME.replace(/-RELEASE/i, '').replace(/-beta_/i, '-beta.');
} else {
  packageJson.name = '@' + process.env.GITLAB_USER_EMAIL.split('@')[0] + '/' + packageJson.name;
}

typedocJson.name = packageJson.name + '-' + packageJson.version;

const newTypedoc = path.join(__dirname, '../', 'typedoc.json');

fse.writeFileSync(newTypedoc, JSON.stringify(typedocJson, undefined, 4));
