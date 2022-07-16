// 定义初始化需要的配置参数
export default {
  loginParam: { // 本地登陆用户认证信息
    password: '888888',
    username: 'admin',
  },
  home: 'dashboard', // 根据后端设置首页值前端定
  homePageParams: {},
  userInfo: 'personal', // 用户信息的路由值
  userInfoParams: {},
  changeUser: 'switchRole',
  changeUserParams: {
    pageCode: 'switchRole',
  },
  initLanguage: 'zh', // 默认初始化语言为中文
  isShowLanguage: true, // 默认是否开启多语言切换
  tagsMaxNumber: 15, // 页签最大显示数量
};
