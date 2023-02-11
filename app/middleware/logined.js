const { jwtVerify } = require('../../utils/token');

module.exports = () => {
  return async (ctx, next) => {
    const token = ctx.headers.token;
    if (!token) {
      return ctx.body = {
        result: 101,
        msg: '请重新登录'
      };
    }
    const tokenDecode = jwtVerify(token);
  
    if (tokenDecode && tokenDecode.user_id) {
      // ctx.userInfo = {
      //   user_id: tokenDecode.user_id,
      // }
      ctx.locals.userId = tokenDecode.user_id;
      return await next();
    } 
    ctx.body = {
      result: 101,
      msg: tokenDecode.msg || '请重新登录'
    };
  }
};
