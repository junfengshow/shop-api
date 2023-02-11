const Controller = require('egg').Controller;

class ArticleSub extends Controller {
  async multiCreate () {
    const { ctx } = this;
    try {
      const { list } = ctx.request.body;
      
      await this.app.model.ArticleSub.bulkCreate(list, {
        updateOnDuplicate: ['sort'],
        // fields: ['id', 'sort']
      });
      ctx.body = {
        result: 0,
        success: true
      }
    } catch (e) {
      console.log(e)
      ctx.body = {
        result: 201,
        success: false,
        msg: e,
      }
    }
  }
}
module.exports = ArticleSub;
