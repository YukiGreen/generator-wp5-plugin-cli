import API from "./API";
import HttpClientHelper from '../../../src/utils/httpClientHelper';
class EdspLoginService {
     // 获取验证码
  public getCaptcha = (query?, h?) =>
     HttpClientHelper.get({ url: `${API.captcha}`, query, h });
}

export default new EdspLoginService();
