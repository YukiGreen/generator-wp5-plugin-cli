/**
 * 返回结果体
 */
import Controls from './Controls.json';
import { Message } from 'element-ui';

// 返回的状态码
let code = '200';
if (Controls.isShell) {
  code = 0;
}

export default function Messages(res, callBack) {
  if (res && res.code === code) {
    callBack && callBack(res.data);
  } else {
    Message.error({
      showClose: true,
      message: res && res.message,
      type: 'error',
    });
  }
}
