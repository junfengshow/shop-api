
module.exports = (app) => {
  const { STRING, INTEGER, DATE, BIGINT } = app.Sequelize;

  const User = app.model.define('blog_user', {
    user_id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    user_name: STRING(20),
    user_password: STRING(100),
    create_time: DATE,
    update_time: DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  });

  return User;
};