const Controller = require('egg').Controller;
const { ignoreCategory } = require('../../utils');

class HomeController extends Controller {
  async index() {
    // const res = await this.ctx.model.User.findAll({
    //   limit: 10,
    //   offset: 0,
    // });
    // console.log('res', Array.isArray(res))
    this.ctx.body = 'Hello world';
  }
  async getPageDecorate () {
    const { ctx } = this;
    try {
      // 类目
      const categories = await ctx.model.Category.findAll({
        offset: 0,
        limit: 7,
        where: {
          parent_id: 0,
        },
        order: [['sort', 'ASC']],
      });
      // 可用文章
      const articles = await ctx.model.Article.findAll({
        limit: 8,
        offset: 0,
        where: {
          article_status: 101,
          article_category: {
            $notIn: ignoreCategory,
          }
        },
        order: [['created_at', 'DESC']],
      });
      // 订阅文章链接
      const links = await ctx.model.Links.findAll({
        offset: 0, // 查询的起始下标
        limit: 20, 
        order: [['created_at', 'DESC']],
        where: {
          link_type: 101,
        }
      }); 
      // 博客链接
      const blogLinks = await ctx.model.Links.findAll({
        offset: 0, // 查询的起始下标
        limit: 7, 
        order: [['sort', 'ASC'], ['created_at', 'DESC']],
        where: {
          link_type: 201,
        }
      });
      // banner 主题链接
      const swiperLinks = await ctx.model.Links.findAll({
        offset: 0, // 查询的起始下标
        limit: 7, 
        order: [['created_at', 'DESC']],
        where: {
          link_type: 301,
        }
      });  

      return ctx.body = {
        result: 0,
        success: true,
        data: {
          categories,
          articles,
          links,
          blogLinks,
          swiperLinks,
        }
      }
    } catch (e) {
      console.log(e);
    }
    ctx.body = {
      result: 1,
      success: false,
    }
  }
  // 左下古典文学模块
  async getGushiList () {
    const category_id = 23;
    const { ctx } = this;
    try {
      
      const res = await ctx.model.Category.findOne({
        where: {
          category_id: category_id,
        }
      });
      
      // const children = await ctx.model.Category.findAll({
      //   where: {
      //     parent_id: category_id,
      //   }
      // });
      const articles = await ctx.model.Article.findAll({
        where: {
          article_category: category_id,
        },
        offset: 0,
        limit: 20,
      });

      ctx.body = {
        result: 0,
        success: true,
        data: {
          category: res,
          articles,
        }
      }
    } catch (err) {
      console.log(err);
      ctx.body = {
        result: 1,
        success: false,
        msg: err
      }
    }
  }
}

module.exports = HomeController;