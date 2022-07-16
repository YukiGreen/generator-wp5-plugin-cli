import Controls from '../../../src/Controls.json';
import Constant from '../../../src/services/ComponentAPI.json';
import axios from 'axios';
import config from '.';
import loaderJson from '../../utils/loaderJson';
import MyAxios from '../../../src/utils/MyAxios.js';
import Tools from '../../../src/utils/tools';
import API from './API';
import UserCenter from '../userCenter';
import { encryptRsa } from '../../utils/des';
class LoginService {
  // edsp登录,此接口不含token,使用axios方法
  localLogin(options, callback) {
    let url = options.userInfo.url;

    delete options.userInfo.url;
    delete options.userInfo.loginSystem;
    let localToken = Tools.createLocalToken(
      config.loginParam,
      Controls.timeout
    );
    if (url && Tools.checkUrlPathType(url)) {
      loaderJson
        .loadUrl(url)
        .then(res => {
          // 调用本地接口服务
          res.data.access_token = localToken.access_token;
          res.data.refresh_token = localToken.refresh_token;
          callback && callback(res);
        })
        .catch(error => {
          callback && callback(error);
        });
    } else {
      // UserCenter.loginEncryptionKeys().then(res=>{console.log("获取秘钥结果",res)}).catch(error=>{console.log(error)})
      UserCenter.login(options.userInfo, undefined, undefined, resp => resp)
        .then(resp => {
          if (resp.data && resp.data.code && resp.data.code !== 200) {
            const e = new Error(
              `Request failed with edsp status code ${resp.data.code}, reason: ${resp.data.msg}'`
            );
            e.response = resp;
            throw e;
          } else {
            callback && callback(resp.data && resp.data.data);
          }
        })
        .catch(error => {
          callback && callback(error);
        });
    }
  }

  // 登出
  localLogout(url) {
    console.log(url, 'API.url');
    return MyAxios.invokeAPI(url, 'GET', {}, Constant.DEFAULTHEADERS);
    // return MyAxios.invokeAPI(`${API.logout}`, 'GET', {}, Constant.DEFAULTHEADERS)
  }

  // 菜单查询
  getMenuQuery(url) {
    return MyAxios.invokeAPI(url, 'GET', {}, Constant.DEFAULTHEADERS);
  }

  // 获取所有路由
  getAllRoute() {
    return MyAxios.invokeAPI(API.routes, 'GET', {}, Constant.DEFAULTHEADERS);
  }

  // 获取头像路径
  getIcon() {
    if (Tools.checkUrlPathType(API.iconUrl)) {
      return MyAxios.invokeAPI(API.iconUrl, 'get', {}, Constant.DEFAULTHEADERS);
    } else {
      return MyAxios.invokeAPI(
        API.iconUrl,
        'post',
        {},
        Constant.DEFAULTHEADERS
      );
    }
  }
}

export default new LoginService();
