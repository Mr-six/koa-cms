const isProd   =  process.env.NODE_ENV === 'production'
const path     = require('path')
const log      = require('./log')           // 日志配置文件
const schema   = require('./schema')        // 验证规则
const static   = path.join( __dirname,'../static')

module.exports = {
  isProd,                                   // 判断当前环境
  static,                                   // 静态目录
  secret: 'yqqlmgsycl',                     // jwt secret
  tokenExpires: '7d',                       // token 有效时间 7天
  port: isProd ? '3000' : '3000',           // 端口
  db: 'mongodb://127.0.0.1:27017/koams',    // 数据库
  dbtest: 'mongodb://127.0.0.1:27017/test', // 测试数据库
  log,                                      // 日志配置文件
  schema,                                   // 对象验证规则
}