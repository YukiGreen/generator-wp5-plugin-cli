/***
 **工具类
 */
'use strict';
import jwtBuilder from 'jwt-builder';
import _ from 'lodash';
import moment from 'moment';
import { urlRootPath } from './urlHelper';

class Tools {
  getCurLocale() {
    return localStorage.getItem('LANGUAGE_STYLE') || 'en';
  }

  /**
   *将毫秒数转成对应日期字符串
   */
  timeToDate(time) {
    if (!time) {
      return;
    }
    return moment(time).format('YYYY-MM-DD HH:mm:ss');
  }

  // utc时间
  timeToUTC() {
    const date = new Date();
    const y = date.getUTCFullYear(); // 年
    const m = date.getUTCMonth(); // 月
    const d = date.getUTCDate(); // 日
    const h = date.getUTCHours(); // 时
    const M = date.getUTCMinutes(); // 分
    const s = date.getUTCSeconds(); // 秒
    return Date.UTC(y, m, d, h, M, s);
  }

  // 获取两个时间的时间差异
  timeToTime(dateOne, dateTwo) {
    let totalTime;
    let total;
    if (dateTwo && dateOne) {
      total = dateTwo - dateOne;
    }

    //	day
    let days = Math.floor(total / (24 * 3600 * 1000));
    //	hour
    //	计算天之后剩下的毫秒数
    let leave1 = total % (24 * 3600 * 1000);
    let hours = Math.floor(leave1 / (3600 * 1000));
    //  min
    //	计算小时数后剩余的毫秒数
    let leave2 = leave1 % (3600 * 1000);
    let minutes = Math.floor(leave2 / (60 * 1000));
    //	second
    //	计算分钟数后剩余的毫秒数
    let leave3 = leave2 % (60 * 1000);
    let seconds = Math.round(leave3 / 1000);
    //	去掉第一个0
    if (days === 0 && hours !== 0) {
      totalTime = 'day' + hours + 'h' + minutes + 'm' + seconds + 's';
    } else if (days === 0 && hours === 0 && minutes !== 0) {
      totalTime = 'h' + minutes + 'm' + seconds + 's';
    } else if (days === 0 && hours === 0 && minutes === 0) {
      totalTime = seconds + 's';
    } else {
      totalTime = days + 'day' + hours + 'h' + minutes + 'm' + seconds + 's';
    }
    return totalTime;
  }

  /**
   * 生成本地token
   * @param {*} userInfo 用戶信息
   * @param {*} expire 过期时间
   */
  createLocalToken(userInfo, expire) {
    let access_token = jwtBuilder({
      nbf: true, // can't be used before current time
      algorithm: 'HS256', // 算法类型
      secret: 'super-secret', // 算法的密钥
      userId: userInfo, // 用户信息
      headers: {
        time: '2019-4-8'
      }
    });
    let refresh_token = jwtBuilder({
      nbf: true, // can't be used before current time
      algorithm: 'HS256',
      secret: 'super-secret',
      userId: userInfo,
      exp: expire,
      headers: {
        time: '2019-4-8'
      }
    });
    return { access_token, refresh_token };
  }

  /**
   * json格式化
   */
  jsonFormat(json) {
    if (typeof json === 'string') {
      json = JSON.parse(json);
    }
    return JSON.stringify(json, undefined, 2);
  }

  // 返回到登录
  backupLogin() {
    // 返回
    const hash = window.location.hash;
    if (hash.indexOf('login') === -1) {
      localStorage.clear();
      location.href = `${urlRootPath()}/#/login`;
    }
  }

  // 获取头部信息，提供给后端,token可以是访问token和刷新token
  getHeader(token, isFile) {
    // isFile是否文件类型
    let header = {
      'If-Modified-Since': 0,
      'x-edsp-language': this.getCurLocale() === 'zh' ? 'zh_CN' : 'en_US',
      Accept: '*/*',
      token
    };
    if (!isFile) {
      Object.assign(header, {
        'Content-Type': 'application/json'
      });
    }
    return header;
  }

  // 导航栏搜索数据处理
  formatTreeSelect(arr) {
    const cloneData = _.cloneDeep(arr);
    const targetData = [];
    if (!_.isArray(cloneData)) {
      return [];
    }
    _.forEach(cloneData, (item) => {
      let isDisabled = !item.filePath;
      const isLeaf = item.isLeaf;
      const scene = item.scene;
      const isBeta = item.isBeta;
      const id = item.id;
      const label = item.label;
      const params = item.params;
      if (!item.children) {
      } else if (item.children && item.children.length === 0) {
        delete item.children;
      } else if (item.children && item.children.length === 1) {
        // 根节点下只有一个children时参数放在最外层
        item = item.children[0];
        delete item.children;
        item.isLeaf = isLeaf;
        item.scene = scene;
        item.isBeta = isBeta;
        item.id = id;
        item.label = label;
        item.params = params;
      } else {
        this.formatTreeSelect(item.children);
      }
      item.isDisabled = isDisabled;
      targetData.push(item);
    });
    return targetData;
  }
  /**
   *
   * @param {data} 需要转的对象
   * @param {isPrefix} 转成键值对后是否要在开头加‘？前缀’
   */
  queryParams(data, isPrefix = false) {
    let prefix = isPrefix ? '?' : '';
    let _result = [];
    for (let key in data) {
      let value = data[key];
      // 去掉为空的参数
      if (['', undefined, null].includes(value)) {
        continue;
      }
      if (value.constructor === Array) {
        // 数组类型参数通常默认'[]='拼接目前项目有其他处理改为'='
        value.forEach((_value) => {
          _result.push(
            encodeURIComponent(key) + '=' + encodeURIComponent(_value)
          );
        });
      } else {
        _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
      }
    }

    return _result.length ? prefix + _result.join('&') : '';
  }

  /**
   * 根据请求路径判断是否是本地请求
   * @param {*} path 接口路径
   */
  checkUrlPathType(path) {
    return path.indexOf('.json') > -1;
  }

  /**
   * 返回日期
   */
  timeToCurDate(time) {
    if (!time) {
      return '';
    }
    return moment(time).format('YYYY-MM-DD');
  }

  // 操作成功提示
  operateSuccessTips(el) {
    el.$message.success(`${el.$t('logPublic.optionSuccess')}`);
  }
  // 操作失败提示
  operateFailTips(el, msg) {
    el.$message.error(`${el.$t('logPublic.optionFailure')} ${msg}`);
  }

  /**
   * 根据时间戳返回时分秒毫秒
   */
  timestampToTime(time) {
    if (!time) {
      return;
    }
    return moment(time).format('HH:mm:ss.SSS');
  }

  timestampToDateTime(time) {
    if (!time) {
      return;
    }
    return moment(time).format('YYYY-MM-DD HH:mm:ss.SSS');
  }

  
  format(timestamp) {
    return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
  }

}

export default new Tools();
