const Service = require('egg').Service;

class Category extends Service {
  async createCategory ({
    parent_id,
    category_name,
    category_avatar
  }) {
    await this.app.model.Category.create({
      parent_id,
      category_name,
      category_avatar
    });
  }
}
module.exports = Category;
