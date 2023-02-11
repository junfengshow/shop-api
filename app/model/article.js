/**
 * 
 * 类目
 */
const moment = require('moment');

module.exports = (app) => {
  const { STRING, INTEGER, DATE, BIGINT, TIME, TIMESTAMP, INT, TEXT } = app.Sequelize;

  const Article = app.model.define('blog_articles', {
    article_id: { type: STRING(40), primaryKey: true, autoIncrement: true },
    page_title: STRING(60),
    page_description: STRING(200),
    page_keywords: STRING(100),
    page_background: STRING(200),
    article_category: BIGINT,
    article_summary: STRING(500),
    article_content: TEXT,
    article_status: INTEGER(3),
    updated_at: {
      type: DATE,
      get () {
        return moment(this.dataValues['updated_at']).format('YYYY-MM-DD hh:mm:ss')
      }
    },
    created_at: {
      type: DATE,
      get () {
        return moment(this.dataValues['created_at']).format('YYYY-MM-DD hh:mm:ss')
      }
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    // createdAt: 'create_time',
    // updatedAt: 'update_time',
  });

  Article.associate = function () {
    Article.belongsTo(app.model.Category, {
      as: 'category',
      targetKey: 'category_id',
      foreignKey: 'article_category'
    });
    Article.belongsTo(app.model.Category, {
      as: 'sub_category',
      targetKey: 'category_id',
      foreignKey: 'article_sub_category'
    });

    Article.belongsTo(app.model.ArticleSub, {
      targetKey: 'article_id',
      foreignKey: 'article_id',
      constraints: false
    });
    // app.model.ArticleSub.belongsTo(Article, {
    //   targetKey: 'article_id',
    //   foreignKey: 'article_id',
    //   constraints: false
    // });
  };

  return Article;
};
 