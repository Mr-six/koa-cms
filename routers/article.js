const Router       = require('koa-router')
const {authToken}  = require('../utils/auth')
const {articleApi} = require('../api').v1
const article      = new Router()

/**
 * article router
 */
article.get('/',                  articleApi.all)       // 查找
       .post('/',      authToken, articleApi.create)    // 新建

article.get('/:id',               articleApi.findById)  // 查看
       .patch('/:id',  authToken, articleApi.update)    // 更新
       .delete('/:id', authToken, articleApi.delete)    // 删除
       
module.exports = article