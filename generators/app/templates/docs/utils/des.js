import Controls from './Controls.json';
import cryptoJs from 'crypto-js';
import CryptoJS from 'crypto-js/crypto-js';
import JSEncrypt from 'jsencrypt';

// RSA公钥加密
export const encryptRsa = (message) => {
  var pKey = Controls.publicKey;
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(pKey);
  return encrypt.encrypt(message);
};

//AES 加密
export const  encryptByAESMsg = (message) => {
  var key = Controls.desKey;
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var option = { mode: cryptoJs.mode.ECB, padding: cryptoJs.pad.Pkcs7 };
  var encrypted = CryptoJS.AES.encrypt(message, keyHex, option);
  return encrypted.toString();
};




