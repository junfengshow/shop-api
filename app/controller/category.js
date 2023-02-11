/**
 * 
 * 分类列表
 */
const Controller = require('egg').Controller;

class Category extends Controller {

  // 前台获取类目大类
  async getParentCategories () {
    const { ctx } = this;
    const categories = await ctx.model.Category.findAll({
      where: {
        parent_id: 0,
      },
      order: [['sort', 'ASC']],
    });
    ctx.body = {
      result: 0,
      success: true,
      data: categories,
    }
  }

  // 后台获取所有类目
  async getCategories () {
    const { ctx } = this;
    const categories = await ctx.model.Category.findAll({
      order: [['sort', 'ASC']],
    });
    const result = [];
    categories.forEach(item => {
      if (!item.parent_id) {
        result.push({
          category_name: item.category_name,
          category_id: item.category_id,
          parent_id: item.parent_id,
          category_avatar: item.category_avatar,
        });
      }
    });
    
    categories.forEach((item) => {
      const _item = {
        category_name: item.category_name,
        category_id: item.category_id,
        parent_id: item.parent_id,
        category_avatar: item.category_avatar,
      };
      const category = result.find((subItem) => subItem.category_id === _item.parent_id);
    
      if (!category) {
        // 大类
      } else if (Array.isArray(category.children)) {
        category.children.push(_item);
      } else {
        category.children = [_item];
      }
    });

    ctx.body = {
      success: true,
      data: result,
      result: 0,
    }
  }
  // 创建类目
  async createCategory () {
    const _res = {};
    const { service, ctx } = this;
    try {
      const { 
        category_name, 
        category_avatar = '', 
        parent_id = 0,
      } = ctx.request.body;
      if (!category_name) {
        _res.msg = '类目名称不能为空';
        _res.success = false;
        return ctx.body = _res;
      }
      
      await service.category.createCategory({
        category_name,
        category_avatar,
        parent_id,
      });
      _res.success = true;
    } catch (e) {
      console.log(e);
      _res.success = false;
    }
    ctx.body = _res;
  }
  // 更新类目
  async updateCategory () {
    const _res = {};
    const { service, ctx } = this;
    try {
      const { category_name, category_avatar, category_id } = ctx.request.body;
      
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
      await this.app.model.Category.update({
        category_name,
        category_avatar
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
  // 更新分组信息
  async updateGroupInfo () {
    const _res = {};
    const { service, ctx } = this;
    try {
      const { group_info, category_id } = ctx.request.body;
      if (!category_id) {
        return ctx.body = {
          success: false,
          result: 1,
          msg: 'category_id 不能为空',
        }
      }
      await this.app.model.Category.update({
        group_info
      }, {
        where: { category_id: category_id }
      });

      _res.success = true;
      _res.result = 0;
    } catch (e) {
      console.log(e);
      _res.success = false;
      _res.result = 1;
      _res.msg = e;
    }
    ctx.body = _res;
  }

  // 根据 id 查询类目信息
  async getCategoryInfo () {
    const _res = {};
    const { service, ctx } = this;
    try {
      const { category_id } = ctx.request.query;
      console.log('category_id', category_id)
      const res = await this.app.model.Category.findOne({
        where: {
          category_id: category_id
        }
      });
      _res.data = res;
      _res.success = true;
      _res.result = 0;
    } catch (e) {
      console.log(e);
      _res.success = false;
      _res.result = 1;
      _res.msg = e;
    }
    ctx.body = _res;
  }

  

  // 更新排序号
  async updateSort () {
    const { service, ctx } = this;
    try {
      const { list } = ctx.request.body;
      if (!list || list.some((item) => !item.category_id)) {
        return ctx.body = {
          result: 1,
          msg: '参数不合法',
          success: false,
        }
      }
      await this.app.model.Category.bulkCreate(list, {
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
module.exports = Category;