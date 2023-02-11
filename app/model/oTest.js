/**
 * 
 * 测试sql
 */
module.exports = (app) => {
  const { STRING, INTEGER, DATE, BIGINT, TIME, TIMESTAMP, UUID } = app.Sequelize;

  const OTest = app.model.define('blog_test', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    sort: INTEGER,
    name: STRING(200),
  },
  {
    freezeTableName: true,
    timestamps: false,
  });

  return OTest;
};
