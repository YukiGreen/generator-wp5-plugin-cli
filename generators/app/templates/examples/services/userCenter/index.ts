import API from './API';
import HttpClientHelper from '../../../src/utils/httpClientHelper';

export class DomainService {
  public listDomain = (query?, h?) => HttpClientHelper.get({ url: 'edsp/domains', query, h });
  public queryUser = (id, query?, h?) => HttpClientHelper.get({ url: `${API.user}/${id}`, query, h });
  public listUser = (query?, h?) => HttpClientHelper.get({ url: `${API.user}`, query, h });
  public deleteUser = (userName, data?, query?, h?) => HttpClientHelper.delete({
    url: `${API.user}/${userName}`,
    data,
    query,
    h,
  });
  public saveUser = (data, query?, h?) => HttpClientHelper.post({ url: `${API.user}`, query, data, h });
  public updateUser = (data, query?, h?) => HttpClientHelper.put({ url: `${API.user}`, query, data, h });
  public listRole = (query?, h?) => HttpClientHelper.get({ url: `${API.role}`, query, h });
  public login = (data?, query?, h?, callback?) => HttpClientHelper.post({
    url: `${API.login}`,
    query,
    data,
    h,
  }, callback);
  public loginEncryptionKeys = (query?, h?) => HttpClientHelper.get({ url: `${API.loginEncryptionKeys}`, query, h });
  public updatePassword = (data, query?, h?) => HttpClientHelper.put({ url: `${API.password}`, query, data, h });
  public getToken = (query?, h?) => HttpClientHelper.get({ url: `${API.getToken}`, query, h });
  public getApiKey = (id, query?, h?) => HttpClientHelper.get({
    url: `${API.users}/query-api-key/${id}`,
    query,
    h,
  });
  public reloadApiKey = (id, query?, h?) => HttpClientHelper.get({ url: `${API.users}/update-api-key/${id}`, query, h });
  public deleteApiKey = (id, query?, h?) => HttpClientHelper.delete({
    url: `${API.users}/delete-api-key/${id}`,
    query,
    h,
  });
  public getSetting = (data?, query?, h?) => HttpClientHelper.post({ url: `${API.getSetting}`, query, data, h });
  public getDomain = (query?, h?) => HttpClientHelper.get({ url: `edsp/domains`, query, h });
  public getDomainIns = (domainName?, query?, h?) => HttpClientHelper.get({ url: `edsp/domains`, query, h });
 //查询集群名跟集群ID
 public queryClusterInfo =(query?, h?) => HttpClientHelper.get({ url: `adm/gwProxy/cluster/queryNames`, query, h});
}

export default new DomainService();
