/**
 * 
 * 类目
 */

module.exports = (app) => {
  const { STRING, INTEGER, DATE, BIGINT, TIME, TIMESTAMP, UUID } = app.Sequelize;

  const Assets = app.model.define('blog_assets', {
    assets_id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    assets_type: INTEGER,
    assets_category: INTEGER,
    assets_url: STRING(400),
    assets_key: STRING(100),
    assets_desc: STRING(300),
  },
  {
    freezeTableName: true,
    timestamps: true,
  });

  return Assets;
};
