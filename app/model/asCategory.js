/**
 * 
 * 资源的所属类目
 */
module.exports = (app) => {
  const { STRING, INTEGER, DATE, BIGINT, TIME, TIMESTAMP, UUID } = app.Sequelize;

  const AsCategvory = app.model.define('blog_assets_category', {
    category_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    category_name: INTEGER,
  },
  {
    freezeTableName: true,
    timestamps: true,
  });

  return AsCategvory;
};
