/**
 * 
 * 分类列表
 */
const Controller = require('egg').Controller;

class AsCategory extends Controller {
  async getCategories () {
    const { ctx } = this;
    const categories = await ctx.model.AsCategory.findAll();

    ctx.body = {
      success: true,
      data: categories,
      result: 0,
    }
  }
  async createCategory () {
    const _res = {};
    const { service, ctx } = this;
    try {
      const { 
        category_name, 
      } = ctx.request.body;
      if (!category_name) {
        _res.msg = '类目名称不能为空';
        _res.success = false;
        return ctx.body = _res;
      }
      
      await ctx.app.model.AsCategory.create({
        category_name,
      });
      _res.success = true;
    } catch (e) {
      console.log(e);
      _res.success = false;
    }
    ctx.body = _res;
  }
  async updateCategory () {
    const _res = {};
    const { service, ctx } = this;
    try {
      const { category_name, category_id } = ctx.request.body;
      
      if (!category_name) {
        _res.msg = '类目名称不能为空';
        _res.success = false;
        return ctx.body = _res;
      }
      if (!category_id) {
        _res.msg = 'id不能为空';
        _res.success = false;
        return ctx.body = _res;
      }
      await this.app.model.AsCategory.update({
        category_name,
      }, {
        where: { category_id: category_id }
      });

      _res.success = true;
    } catch (e) {
      console.log(e);
      _res.success = false;
    }
    ctx.body = _res;
  }
}
module.exports = AsCategory;
