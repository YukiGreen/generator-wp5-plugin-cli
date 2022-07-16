import store from '../../examples/store/modules/user';
export class DomainHelper {
  getDomainName() {
    return store.state.domainUrlName;
  }
}

export default new DomainHelper();
