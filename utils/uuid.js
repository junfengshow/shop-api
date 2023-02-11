const uuid = require('uuid');

const getRandomString = (length) => {
  if (!length) {
    length = 36;
  }
  let strings =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let stringsLen = strings.length;
  let str = '';
  for (let i = 0; i <= length; i++) {
    const idx = Math.floor(Math.random() * stringsLen);
    str += strings.charAt(idx);
  }
  return str;
};

const getUuid = () => {
  return uuid.v4().replaceAll('-', '') + getRandomString(4);
}

module.exports = {
  getUuid,
  getRandomString
}
