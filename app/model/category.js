/**
 * 
 * 类目
 */
const moment = require('moment');

module.exports = (app) => {
  const { STRING, INTEGER, DATE, BIGINT, TIME, TIMESTAMP } = app.Sequelize;

  const Category = app.model.define('blog_categories', {
    category_id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    parent_id: BIGINT,
    category_name: STRING(50),
    category_avatar: STRING(300),
    sort: INTEGER,
    group_info: STRING(1000),
    updated_at: {
      type: DATE,
      get () {
        return moment(this.dataValues['created_at']).format('YYYY-MM-DD hh:mm:ss')
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

  return Category;
};
