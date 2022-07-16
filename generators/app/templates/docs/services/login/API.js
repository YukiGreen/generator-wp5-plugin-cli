import Constant from '../../../src/services/ComponentAPI.json';

const API = {
  routes: Constant.CommonApi.routes, // 路由
  loginAPI: `${Constant.EDSP}/refreshToken`,
  updateToken: Constant.CommonApi.updateToken, // 修改token
  iconUrl: Constant.CommonApi.iconUrl // 路由
};
export default API;
