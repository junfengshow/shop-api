module.exports = (app) => {
  const { STRING, INTEGER, DATE, BIGINT, TIME, TIMESTAMP } = app.Sequelize;
  const ArticleSub = app.model.define('blog_articles_sub', {
    sort_id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    article_id: STRING(40),
    sort: INTEGER,
  },
  {
    freezeTableName: true,
    timestamps: false,
    // createdAt: 'create_time',
    // updatedAt: 'update_time',
  });
  return ArticleSub;
}