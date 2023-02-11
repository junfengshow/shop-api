
const jsonwebtoken = require('jsonwebtoken');
const secret = 'abdldldl1193kdll';

const jwtSign = (data) => {
  return jsonwebtoken.sign(data, secret, { expiresIn: '6h' });
}
// 1653551342
const jwtVerify = (token) => {
  try {
    return jsonwebtoken.verify(token, secret);
  } catch (err) {
    let msg = 'token校验失败';
    if (err && err.name === 'TokenExpiredError') {
      msg = 'token 失效'
    }
    return {
      msg,
    };
  }
}
module.exports = {
  jwtSign, 
  jwtVerify
}
