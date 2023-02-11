
const prefix = '/api/v1';

module.exports = (app) => {
  const { router, controller } = app;
  const logined = app.middleware.logined();

  // 测试sql
  router.get(`${prefix}/oTest/getList`, controller.oTest.getList);
  router.post(`${prefix}/oTest/multiUpdate`, controller.oTest.multiUpdate);
  
  router.get('/', controller.home.index);
  router.get(`${prefix}/home/getPageDecorate`, controller.home.getPageDecorate);
  router.get(`${prefix}/home/getGushiList`, controller.home.getGushiList);
  // 用户
  router.post(`${prefix}/user/login`, controller.user.login);
  router.post(`${prefix}/user/registry`, controller.user.registry);
  router.get(`${prefix}/user/getUserInfo`, logined, controller.user.getUserInfo);
  // 获取七牛配置
  router.get(`${prefix}/upload/getQiniuConfig`, logined, controller.uploadConfig.qiniuConfig);
  /**
   * 类目
   */
  router.get(`${prefix}/category/getCategories`, controller.category.getCategories);
  router.post(`${prefix}/category/createCategory`, logined, controller.category.createCategory);
  router.post(`${prefix}/category/updateCategory`, logined, controller.category.updateCategory);
  // 获取大类
  router.get(`${prefix}/category/getParentCategories`, controller.category.getParentCategories);
  router.post(`${prefix}/category/updateSort`, logined, controller.category.updateSort);
  router.post(`${prefix}/category/updateGroupInfo`, logined, controller.category.updateGroupInfo);
  router.get(`${prefix}/category/getCategoryInfo`, controller.category.getCategoryInfo);
  
  /**
   * 文章
   */
  router.post(`${prefix}/article/createArticle`, logined, controller.article.createArticle);
  router.post(`${prefix}/article/updateArticle`, logined, controller.article.updateArticle);
  router.get(`${prefix}/article/getArticles`, controller.article.getArticles);
  router.get(`${prefix}/article/getArticle`, controller.article.getArticle);
  router.post(`${prefix}/article/changeStatus`, logined, controller.article.changeStatus);
  // 前台获取可用文章列表
  router.get(`${prefix}/article/getArticlesEnabled`, controller.article.getArticlesEnabled);
  // 根据分类查询文章
  router.get(`${prefix}/article/getArticlesByCategory`, controller.article.getArticlesByCategory);
  // 批量更新
  router.post(`${prefix}/articleSub/multiCreate`, logined, controller.articleSub.multiCreate);

  /**
   * 链接
   */
  router.get(`${prefix}/links/getLinks`, controller.links.getLinks);
  router.post(`${prefix}/links/createLink`, logined, controller.links.createLink);
  router.post(`${prefix}/links/updateLink`, logined, controller.links.updateLink);
  router.post(`${prefix}/links/deleteLink`, logined, controller.links.deleteLink);
  router.post(`${prefix}/links/updateSort`, logined, controller.links.updateSort);
  
  /**
   * 资源
   */
  router.get(`${prefix}/assets/getAssets`, logined, controller.assets.getAssets);
  router.post(`${prefix}/assets/createAssets`, logined, controller.assets.createAssets);
  router.post(`${prefix}/assets/updateAssets`, logined, controller.assets.updateAssets);
  
  /**
   * 资源类目
   */
  router.get(`${prefix}/assetsCategory/getCategories`, logined, controller.asCategory.getCategories);
  router.post(`${prefix}/assetsCategory/createCategory`, logined, controller.asCategory.createCategory);
  router.post(`${prefix}/assetsCategory/updateCategory`, logined, controller.asCategory.updateCategory);
}
