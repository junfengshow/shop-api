/**
 * 用户
 */
const Controller = require('egg').Controller;
const { jwtSign, jwtVerify } = require('../../utils/token');

class User extends Controller {
  // 登录
  async login () {
    const { ctx } = this;
    const { user_name, user_password } = ctx.request.body;
    const user = await ctx.app.model.User.findOne({
      where: {
        user_name, 
        user_password,
      }
    });
    if (!user) {
      ctx.body = {
        success: false,
        result: 1,
        msg: '用户名或密码错误'
      }
      return;
    }
    const token = jwtSign({ user_id: user.user_id });
    ctx.body = {
      success: true,
      data: {
        user_name: user.user_name,
        user_id: user.user_id,
        token: token,
      },
      result: 0,
    }
  }
  // 注册
  async registry () {
    const { ctx } = this;
    const { user_name, user_password } = ctx.request.body;
    const user = await ctx.app.model.User.findOne({
      where: {
        user_name, user_password,
      }
    });
    
    if (user) {
      ctx.body = {
        success: false,
        result: 1,
        msg: '用户已存在'
      }
      return;
    }

    const res = await ctx.app.model.User.create({
      user_name, user_password,
    });

    ctx.body = {
      success: true,
      data: res,
      result: 0,
    }
  }
  async getUserInfo () {
    const { ctx } = this;
    const user = await ctx.app.model.User.findOne({
      where: {
        user_id: ctx.locals.userId,
      }
    });
    if (!user) {
      return ctx.body = {
        success: false,
        msg: '用户不存在',
        result: 1,
      }
    }
    ctx.body = {
      success: true,
      data: user,
      result: 0,
    }
  }
}
module.exports = User;
