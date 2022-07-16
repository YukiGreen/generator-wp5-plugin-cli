import Controls from '../../utils/Controls.json';
import Tools from '../../../src/utils/tools.js';
import _ from 'lodash';
import { LoginService } from '../../services';
import Messages from '../../utils/Message.js';

function loginFinish(accessToken, refreshToken, menu, language) {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
  localStorage.setItem('LAYOUT_PARAM', menu);
  // 设置产品code
  localStorage.setItem('X-Edsp-Project', Controls.productCode); // 产品code
  // 本地语言
  if (language) {
    localStorage.setItem('LANGUAGE_STYLE', language.slice(0, 2));
  } else {
    if (
      !localStorage.getItem('LANGUAGE_STYLE') ||
      localStorage.getItem('LANGUAGE_STYLE') === ''
    ) {
      localStorage.setItem('LANGUAGE_STYLE', Tools.getLanguage());
    }
  }
}

const user_info = JSON.parse(localStorage.getItem('user_info'));

function getNum(str, firstStr, secondStr) {
  if (str === '' || str == null) {
    // "",null,undefined
    return '';
  }
  if (str.indexOf(firstStr) < 0) {
    return '';
  }
  const subFirstStr = str.substring(
    str.indexOf(firstStr) + firstStr.length,
    str.length
  );
  return subFirstStr.substring(0, subFirstStr.indexOf(secondStr));
}

const user = {
  state: {
    name: Controls.isShell
      ? user_info && user_info.name
      : user_info && user_info.userCode,
    showSwitchRoleMenu: false,
    iconUrl: localStorage.getItem('icon') || '', // icon地址
    domainUrlName: getNum(window.location.hash, '/app/', '/')
  },

  mutations: {
    SET_NAME(state, value) {
      state.name = value;
    },
    SET_ICON(state, value) {
      state.iconUrl = value;
      localStorage.setItem('icon', value);
    },
    SET_SHOWSWITCHROLEMENU(state, value) {
      state.showSwitchRoleMenu = value;
    },
    SET_DOMAINURLNAME(state, value) {
      state.domainUrlName = value;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const headers = {
        'x-edsp-language':
          localStorage.getItem('LANGUAGE_STYLE') === 'zh' ? 'zh_CN' : 'en_US'
      };
      return new Promise((resolve, reject) => {
        LoginService.localLogin({ userInfo, headers }, res => {
          if (res && res.accessToken) {
            // const homePageParam = Tools.getParams(config.homePageParams);
            const access_token = res.accessToken;
            const refresh_token = res.refreshToken;
            // 保存后台返回的权限位（注意要保证权限位不能重复）
            let permissions = [];
            res['roles'].forEach(element => {
              if(element.roleName === 'super'){
                permissions = [{ name: 'super','permissionGroup': 'super' }];
              }else{
                let permissionsArray = element.permissions.map(item => { return { 'name': item.name,'permissionGroup': item.permissionGroup }; });
                permissions = [...permissions,...permissionsArray]; 
              }
            });
            localStorage.setItem('permissions', JSON.stringify(permissions));
            const user_info = {
              language: 'zh_CN',
              pageSize: 10,
              theme: 'mazarine',
              userCode: res.userName,
              userName: res.userName
            };
            const menu = user_info.layout;
            const laguage = user_info.language;
            commit('SET_NAME', user_info.userCode);
            localStorage.setItem('user_info', JSON.stringify(user_info));
            localStorage.setItem('role_name', JSON.stringify(res.roles));
            loginFinish(access_token, refresh_token, menu, laguage);
            resolve(res);
            // resolve(urlRootPath() + '/#/' + config.home + '?' + homePageParam);
          } else {
            reject(res);
          }
        });
      });
    },

    // 登出
    // eslint-disable-next-line no-empty-pattern
    LogOut({}, param) {
      return new Promise(() => {
        LoginService.localLogout(param).then(res => {
          Messages(res, () => {
            let retainKey = [
              'languagePack',
              'hide_gateway_resource_binding_dialog',
              'home-logo',
              'title-logo',
              'copyright',
              'title-text'
            ];
            _.forIn(localStorage, function(value, key) {
              if (!retainKey.includes(key)) {
                localStorage.removeItem(key);
              }
            });
            location.href = `/login`;
          });
        });
      });
    }
  }
};

export default user;
