'use strict';
function isInnerPath (ctx) {
  // ctx.ip
  return true;
}
module.exports = appInfo => {
  const config = exports = {
    PORT: 7005
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_{{keys}}';

  // add your config here
  config.middleware = [];

  // change to your own sequelize configurations
  config.sequelize = {
    dialect: 'mysql',
    host: 'rm-bp1x66211zf38a12a2o.mysql.rds.aliyuncs.com',
    port: 3306,
    database: 'blog',
    username: 'wujunfengmain',
    password: 'WJF340112zyxwjf',
    timezone: '+08:00',
  };

  config.security = {
    csrf: {
      queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
      ignore: ctx => isInnerPath(ctx),
    },
  };


  return config;
};
