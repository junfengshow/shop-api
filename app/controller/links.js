
const Controller = require('egg').Controller;

class Links extends Controller {
  /**
   * 获取链接列表
   */
  async getLinks () {
    const { ctx } = this;
    const { current = 1, pageSize = 20, link_type } = ctx.request.query;
    const _current = Number(current);
    const _pageSize = Number(pageSize);
    const _where = {};
    if (link_type) {
      _where.link_type = link_type;
    }
    try {
      const dataRes = await ctx.model.Links.findAndCountAll({
        offset: (_current - 1) * _pageSize, // 查询的起始下标
        limit: _pageSize, // 查询的条数
        where: _where,
        order: [['sort', 'ASC'], ['created_at', 'DESC']],
      });

      ctx.body = {
        success: true,
        data: {
          list: dataRes.rows,
          current: _current,
          pageSize: _pageSize,
          total: dataRes.count,
        },
        result: 0,
      }
    } catch (e) {
      ctx.body = {
        success: false,
        result: 1,
      }
    }
  }
  /**
   * 创建链接
   */
  async createLink () {
    const { ctx } = this;
    const { link, title, desc, link_type, logo, } = ctx.request.body;
    const _res = {};
    try {
      await ctx.app.model.Links.create({
        link, title, desc, link_type, logo
      });
      ctx.body = {
        result: 0,
        success: true
      }
    } catch (e) {
      console.log(e)
      ctx.body = {
        result: 1,
        success: false,
        msg: e,
      }
    }
  }
  /**
   * 编辑链接
   */
   async updateLink () {
    const { ctx } = this;
    const { link, title, desc, link_type, id, logo } = ctx.request.body;
    const _res = {};
    if (!id) {
      return ctx.body = {
        result: 1,
        success: false,
        msg: 'id不能为空'
      }
    }
    try {
      await ctx.app.model.Links.update({
        link, title, desc, link_type, logo
      }, {
        where: { id }
      });
      return ctx.body = {
        result: 0,
        success: true
      }
    } catch (e) {
      console.log(e)
    }
    ctx.body = {
      result: 1,
      success: false,
      msg: '出现异常了',
    }
  }

  /**
   * 删除
   */
  async deleteLink () {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const _res = {};
    if (!id) {
      return ctx.body = {
        result: 1,
        success: false,
        msg: 'id不能为空'
      }
    }
    try {
      await ctx.app.model.Links.destroy({
        where: {
          id
        }
      });
      return ctx.body = {
        result: 0,
        success: true
      }
    } catch (e) {
      console.log(e)
    }
    ctx.body = {
      result: 1,
      success: false,
      msg: '出现异常了',
    }
  }

  // 更新排序号
  async updateSort () {
    const { service, ctx } = this;
    try {
      const { list } = ctx.request.body;
      if (!list || list.some((item) => !item.id)) {
        return ctx.body = {
          result: 1,
          msg: '参数不合法',
          success: false,
        }
      }
      await this.app.model.Links.bulkCreate(list, {
        updateOnDuplicate: ['sort'],
      });
      ctx.body = {
        result: 0,
        success: true,
      }
    } catch (e) {
      ctx.body = {
        result: 1,
        msg: e,
        success: false,
      }
    }
  }
}
module.exports = Links;
