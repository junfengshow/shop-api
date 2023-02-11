/**
 * 测试sql
 */

const Controller = require('egg').Controller;

class OTest extends Controller {
  async getList () {
    const { ctx } = this;
    const rows = await ctx.app.model.OTest.findAll();
    ctx.body = {
      result: 0,
      success: true,
      data: rows
    };
  }
  async multiUpdate () {
    const { ctx } = this;
    try {
      const { list } = ctx.request.body;
      // console.log(ctx.request.body)
      // console.log(ctx.app.model.OTest.bulkCreate)
      await ctx.app.model.OTest.bulkCreate(list, { updateOnDuplicate: true })
      // const rows = await ctx.app.model.OTest.findAll();
      ctx.body = {
        result: 0,
        success: true,
      };
    } catch (e) {
      ctx.body = {
        result: 1,
        success: false,
        msg: e,
      };
    }
  }
}
module.exports = OTest;
