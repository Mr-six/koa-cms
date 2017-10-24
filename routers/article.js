const Router       = require('koa-router')
const {authToken}  = require('../utils/auth')
const {articleApi} = require('../api').v1
const article      = new Router()

/**
 * article router
 */
article.get('/',                         articleApi.all)       // 查找
       .post('/',             authToken, articleApi.create)    // 新建

article.get('/detail/:id',               articleApi.findById)  // 查看
       .patch('/detail/:id',  authToken, articleApi.update)    // 更新
       .delete('/detail/:id', authToken, articleApi.delete)    // 删除
       
module.exports = article