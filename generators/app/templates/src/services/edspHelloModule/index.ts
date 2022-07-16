import API from "./API";
import HttpClientHelper from "../../utils/httpClientHelper";
class EdspHelloModuleService {
  public getList = (query?, h?) =>
    HttpClientHelper.get({ url: `${API.list}`, query, h });
}

export default new EdspHelloModuleService();
