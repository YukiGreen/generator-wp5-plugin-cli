'use strict';
import axios from 'axios';
import { Message } from 'element-ui';
import _ from 'lodash';
import InvalidToken from './InvalidToken';
import loaderJson from './loaderJson.js';
import Tools from './tools';
import { t } from 'plugin/locale';

// 返回的状态码
let successCode = '200';

class MyAxios {
  invokeAPI () {
    // 使用参数顺序：url, method, data = {}, headers = {}
    const _arguments = arguments;
    return new Promise((resolve, reject) => {
      this.checkOutToken(_arguments, resolve, reject);
    });
  }

  checkOutToken (_arguments, resolve, reject) {
    // if (![`edsp/login`, `edsp/logo`, `edsp/system-customize`, `edsp/license/status`, `edsp/license`, `edsp/login-encryption-keys`, 'adm/loginNew'].includes(_arguments[0])) {
    //   // 要登录
    //   const access_token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    //   const refresh_token = localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
    //   if (!access_token) {
    //     Tools.backupLogin();
    //     return;
    //   }
    //   if (access_token && refresh_token) {
    //     const min = InvalidToken(access_token, refresh_token);
    //     if (min.minutes < 5 && min.minutess >= 0) {
    //       this.refreshToken(_arguments, resolve, reject);
    //       return;
    //     } else if (min.minutess < 0) {
    //       Tools.backupLogin();
    //     }
    //   }
    // }
    this.core
      .apply(this, _arguments)
      .then(res => resolve(res), res => reject(res));
  }

  initParams (res, _arguments, resolve, reject) {
    if (res.code === parseInt(successCode)) {
      const access_token = res.data.accessToken;
      const refresh_token = res.data.refreshToken;
      let user_info = {
        'language': 'zh_CN',
        'layout': 'pte/json/layout/index1.json',
        'pageSize': 10,
        'theme': 'mazarine',
        'userCode': res.data.userName,
        'userName': res.data.userName
      };

      /* let privileges = res.data.user_info.privileges;
      let is_super = res.data.user_info.is_super;
      if (privileges) {
        privileges = JSON.stringify(privileges);
        localStorage.setItem('privileges', privileges);
      } */
      if (user_info) {
        user_info = JSON.stringify(user_info);
        localStorage.setItem('user_info', user_info);
      }
      /* if (is_super) {
        is_super = JSON.stringify(is_super);
        localStorage.setItem('is_super', is_super);
      } */
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      this.core
        .apply(this, _arguments)
        .then(res => resolve(res), res => reject(res));
    } else {
      Tools.backupLogin();
    }
  }

  refreshToken (_arguments, resolve, reject) {
    const refresh_token = localStorage.getItem('refresh_token');
    const fetchOpt = {
      method: 'POST',
      headers: Tools.getHeader(refresh_token, '')
    };
    const url = '/edsp/refreshToken';
    // 本地更新token服务
    if (Tools.checkUrlPathType(url)) {
      let localToken = Tools.createLocalToken({
        password: '888888',
        username: 'admin'
      }, 15000);
      return loaderJson.loadUrl(url).then(res => {
        res.data.access_token = localToken.access_token;
        res.data.refresh_token = localToken.refresh_token;
        this.initParams(res, _arguments, resolve, reject);
      });
    }
    fetchOpt['url'] = url;
    const instance = axios.create({
      timeout: 15000,
      headers: fetchOpt.headers
    });
    const method = 'get';
    return instance({
      url: fetchOpt.url + '?refreshToken=' + refresh_token,
      method: method,
      data: { refresh_token }
    })
      .then(res => {
        // 初始化参数
        this.initParams(res.data, _arguments, resolve, reject);
      })
      .catch(res => {
        const { response } = res;
        resolve(res);
        let errorMessage = '';
        if (response && response.status && (response.status === 401 || response.status === 403)) {
          errorMessage = `error：用户验证失败，将退出重新登录！`;
          Message({
            message: errorMessage,
            type: 'error',
            duration: 5 * 1000,
            onClose: () => {
              Tools.backupLogsin();
            }
          });
          // 无权限跳出登录
        } else {
          Message({
            message: res.message,
            type: 'error',
            duration: 5 * 1000
          });
        }
      });
  }

  core (url, method, data, headers, callback) {
    let isJson = _.endsWith(url, '.json');
    if (isJson) {
      return new Promise(resolve => {
        resolve(loaderJson.loadUrl(url));
      });
    }
    let fetchOpt = {
      method: method,
      headers: Object.assign(
        Tools.getHeader(localStorage.getItem('access_token', '')),
        headers
      )
    };
    let selfParams = data ? Tools.queryParams(data, true) : '';
    if (/^get$/i.test(fetchOpt.method)) {
      url += selfParams;
    }
    fetchOpt['url'] = url;
    // 创建实例
    const instance = axios.create({
      timeout: 15000,
      headers: fetchOpt.headers
    });
    return instance({
      url: fetchOpt.url,
      method: fetchOpt.method.toLowerCase(),
      data: data
    }).catch(resp => {
      const { response } = resp;
      let errorMessage = '';
      if (response && response.status && (response.status === 401 || response.status === 403)) {
        errorMessage = `error：用户验证失败，将退出重新登录！`;
        Message({
          message: errorMessage,
          type: 'error',
          duration: 2 * 1000,
          onClose: () => {
            Tools.backupLogin();
          }
        });
        // 无权限跳出登录
        
        Tools.backupLogin();
        return Promise.reject(resp);
      } else if (callback) {
        const result = callback(response);
        return {
          isExecuteCallback: true,
          result: result || Promise.resolve(response)
        };
      } else {
        return Promise.reject(resp);
      }
    })
      .then(res => {
        if (res && !res.isExecuteCallback && callback) {
          const result = callback(res);
          return result || Promise.resolve(res);
        } else if (this.isFailed(res)) {
          Message.error({
            showClose: true,
            message: res.data.msg || res.data.message || '系统错误！',
            type: 'error'
          });
          const e = { response: res, message: `Request failed with edsp status code ${res.data.code}, reason: ${res.data.msg}'` };
          console.warn(e);
        } else {
          return res && res.data;
        }
      }).catch(res => {
        const { response } = res;
        if (response && this.isFailed(response)) {
          Message.error({
            showClose: true,
            message: `${t('optionFailure')} ${response.data.msg || response.data.message || '系统错误！'}`,
            type: 'error'
          });
        } else {
          Message({
            message: res.message,
            type: 'error',
            duration: 5 * 1000
          });
        }
        return Promise.reject(res);
      });
  }

  isFailed (resp) {
    // res.data.code 不存在，说明是edsp以外的响应数据，应当为正常
    return resp && resp.data && resp.data.code && parseInt(resp.data.code) !== parseInt(successCode);
  }
}

export default new MyAxios();
