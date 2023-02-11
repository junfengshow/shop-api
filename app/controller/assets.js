/**
 * 
 * 分类列表
 */
const Controller = require('egg').Controller;

class Assets extends Controller {
  // 后台获取列表
  async getAssets () {
    const { ctx } = this;
    const { category, current = 1, pageSize = 20 } = ctx.request.query;
    const _current = Number(current);
    const _pageSize = Number(pageSize);
    const _where = {}

    if (category) {
      _where.assets_category = category;
    }
    try {
      const dataRes = await ctx.model.Assets.findAndCountAll({
        offset: (_current - 1) * _pageSize, // 查询的起始下标
        limit: _pageSize, // 查询的条数
        order: [['created_at', 'DESC']],
        where: _where,
      });
     
      ctx.body = {
        success: true,
        result: 0,
        data: {
          list: dataRes.rows,
          current: _current,
          pageSize: _pageSize,
          total: dataRes.count,
        },
      }
    } catch (e) {
      console.log(e);
      ctx.body = {
        success: false,
        result: 1,
      }
    }
  }
  async createAssets () {
    const _res = {};
    const { service, ctx } = this;
    try {
      const { 
        assets_url, 
        assets_type, 
        assets_key,
        assets_category,
        assets_desc
      } = ctx.request.body;
      if (!assets_url) {
        _res.msg = '地址不能为空';
        _res.success = false;
        return ctx.body = _res;
      }
      
      await ctx.app.model.Assets.create({
        assets_url, 
        assets_type, 
        assets_key,
        assets_category,
        assets_desc
      });
      _res.success = true;
    } catch (e) {
      console.log(e);
      _res.success = false;
    }
    ctx.body = _res;
  }
  async updateAssets () {
    const _res = {};
    const { service, ctx } = this;
    try {
      const { 
        assets_url, 
        assets_type, 
        assets_key,
        assets_category,
        assets_desc,
        assets_id,
      } = ctx.request.body;
      if (!assets_url) {
        _res.msg = '地址不能为空';
        _res.success = false;
        return ctx.body = _res;
      }
      if (!assets_id) {
        _res.msg = 'id不能为空';
        _res.success = false;
        return ctx.body = _res;
      }
      
      await ctx.app.model.Assets.update({
        assets_url, 
        assets_type, 
        assets_key,
        assets_category,
        assets_desc
      }, {
        where: {
          assets_id
        }
      });
      _res.success = true;
    } catch (e) {
      console.log(e);
      _res.success = false;
    }
    ctx.body = _res;
  }
}
module.exports = Assets;
