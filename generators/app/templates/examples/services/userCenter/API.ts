const userAPI = `edsp/user-domain-bind`;
const roleAPI = `edsp/roles`;
const loginAPI = `edsp/login`;
const passwordAPI = `edsp/users/password/change`;
const getNewTokenAPI = `edsp/refreshToken`;
const API = {
  user: userAPI,
  role: roleAPI,
  login: loginAPI,
  loginEncryptionKeys: `edsp/login-encryption-keys`,
  password: passwordAPI,
  getToken: getNewTokenAPI,
  users: `edsp/users`,
  getSetting: `edsp/users/settings`,
};
export default API;
