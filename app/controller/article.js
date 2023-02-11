/**
 * 文章
 */
const Controller = require('egg').Controller;
const { getUuid } = require('../../utils/uuid');
const { ignoreCategory } = require('../../utils');

class Article extends Controller {

  // 前台获取可正常展示的文章
  async getArticlesEnabled () {
    const { ctx } = this;
    const { status, current = 1, pageSize = 20 } = ctx.request.query;
    const _current = Number(current);
    const _pageSize = Number(pageSize);
  
    try {
      const dataRes = await ctx.model.Article.findAndCountAll({
        offset: (_current - 1) * _pageSize, // 查询的起始下标
        limit: _pageSize, // 查询的条数
        where: {
          article_status: 101,
          article_category: {
            $notIn: ignoreCategory,
          }
        },
        include: [
          { 
            model: ctx.model.Category,
            as: 'category',
          },
          { 
            model: ctx.model.Category,
            as: 'sub_category',
          },
        ],
        order: [['created_at', 'DESC']],
      });
      // console.log('dataRes', dataRes)
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
  
  // 根据分类查询文章
  async getArticlesByCategory () {
    const { ctx } = this;
    const { status, current = 1, pageSize = 20, articleCategory, subCategory } = ctx.request.query;
    const _current = Number(current);
    const _pageSize = Number(pageSize);
    const _categoryWhere = {};
    const _articleWhere = {
      article_status: 101,
    };
    if (articleCategory) {
      _categoryWhere.category_id = articleCategory;
      _articleWhere.article_category = articleCategory;
    }
    if (subCategory) {
      _categoryWhere.category_id = subCategory;
      _articleWhere.article_sub_category = subCategory;
    }
    
    try {
      const categoryInfo = await ctx.model.Category.findOne({
        where: _categoryWhere
      });
      const dataRes = await ctx.model.Article.findAndCountAll({
        offset: (_current - 1) * _pageSize, // 查询的起始下标
        limit: _pageSize, // 查询的条数
        where: _articleWhere,
        attributes: [
          'article_id',
          'page_title',
          'article_category',
          'article_summary',
          'article_status',
          'updated_at',
          'created_at',
          this.app.Sequelize.col('blog_articles_sub.sort'),
          this.app.Sequelize.col('blog_articles_sub.sort_id'),
        ],
        include: [{ 
          model: ctx.model.ArticleSub,
          attributes: [],
        }],
        raw: true,
        order: [['blog_articles_sub', 'sort', 'ASC'],['created_at', 'DESC']],
      });
      ctx.body = {
        success: true,
        data: {
          categoryInfo,
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
        msg: e,
      }
    }

  }
  // 后台获取列表
  async getArticles () {
    const { ctx } = this;
    const { status, 
      current = 1, 
      pageSize = 20,
      article_category,
    } = ctx.request.query;
    const _current = Number(current);
    const _pageSize = Number(pageSize);
    
    const _where = {};
    if (status) {
      _where.article_status = status;
    }
    if (article_category) {
      _where.article_category = article_category;
    }
    try {
      const dataRes = await ctx.model.Article.findAndCountAll({
        offset: (_current - 1) * _pageSize, // 查询的起始下标
        limit: _pageSize, // 查询的条数
        where: _where,
        order: [['created_at', 'DESC']],
      });
      // console.log('dataRes', dataRes)
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

  async getArticle () {
    const { ctx } = this;
    const { id } = ctx.request.query;
    if (!id) {
      return;
    }
    const article = await ctx.model.Article.findOne({
      include: [
        { 
          model: ctx.model.Category,
          as: 'category',
        },
        { 
          model: ctx.model.Category,
          as: 'sub_category',
        },
      ],
      where: {
        article_id: id
      }
    });

    ctx.body = {
      success: true,
      data: article,
      result: 0,
    }
  }
  /**
   * 
   * 创建文章
   */
  async createArticle () {
    const _res = {};
    const { service, ctx } = this;
    try {
      const { 
        page_title, 
        page_description = '', 
        page_keywords = '',
        page_background = '',
        article_category,
        article_summary,
        article_content,
        article_sub_category,
        article_status,
      } = ctx.request.body;
      if (!page_title) {
        _res.msg = '页面标题不能为空';
        _res.success = false;
        return ctx.body = _res;
      }
      
      await this.app.model.Article.create({
        article_id: getUuid(),
        page_title, 
        page_description,
        page_keywords,
        page_background,
        article_category,
        article_sub_category,
        article_summary,
        article_content,
        article_status,
      });
      _res.success = true;
    } catch (e) {
      console.log(e);
      _res.success = false;
    }
    ctx.body = _res;
  }
  /**
   * 
   * 更新文章
   */
  async updateArticle () {
    const _res = {};
    const { service, ctx } = this;
    try {
      const { 
        page_title, 
        page_description = '', 
        page_keywords = '',
        page_background = '',
        article_category,
        article_sub_category,
        article_summary,
        article_content,
        article_id,
        article_status,
      } = ctx.request.body;
      if (!page_title) {
        _res.msg = '页面标题不能为空';
        _res.success = false;
        return ctx.body = _res;
      }
      if (!article_id) {
        _res.msg = 'id不能为空';
        _res.success = false;
        return ctx.body = _res;
      }
      
      await this.app.model.Article.update({
        page_title, 
        page_description,
        page_keywords,
        page_background,
        article_category,
        article_sub_category,
        article_summary,
        article_content,
        article_status,
      }, {
        where: { article_id: article_id }
      });
      _res.success = true;
      _res.result = 0;
    } catch (e) {
      console.log(e);
      _res.success = false;
      _res.result = 1;
    }
    ctx.body = _res;
  }
  /**
   * 改变文章状态
   */
  async changeStatus () {
    const _res = {};
    const { ctx } = this;
    const { article_status, article_id } = ctx.request.body;
    try {
      if (!article_id || !article_status) {
        return ctx.body = {
          result: 1,
          success: false,
          msg: '参数不能为用',
        }
      }
      await ctx.app.model.Article.update({
        article_status: article_status
      },{
        where: { article_id: article_id }
      });
      _res.success = true;
      _res.result = 0;
    } catch (e) { 
      console.log(e);
      _res.success = false;
      _res.result = 1;
    }
    ctx.body = _res;
  }
}
module.exports = Article;