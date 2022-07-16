function getNum(str, firstStr, secondStr) {
  if (str === '' || str == null) { // "",null,undefined
    return '';
  }
  if (str.indexOf(firstStr) < 0) {
    return '';
  }
  const subFirstStr = str.substring(str.indexOf(firstStr) + firstStr.length, str.length);
  return subFirstStr.substring(0, subFirstStr.indexOf(secondStr));
}

export class DomainHelper {
  getDomainName() {
    return getNum(window.location.hash, '/app/', '/') || localStorage.getItem('domainName');
  }
}

export default new DomainHelper();
