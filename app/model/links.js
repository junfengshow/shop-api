/**
 * 
 * 类目
 */
const moment = require('moment');

module.exports = (app) => {
  const { STRING, INTEGER, DATE, BIGINT, TIME, TIMESTAMP, UUID } = app.Sequelize;

  const Links = app.model.define('blog_links', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    link_type: INTEGER,
    link: STRING(400),
    title: STRING(100),
    desc: STRING(500),
    logo: STRING(300),
    sort: INTEGER,
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

  return Links;
};
