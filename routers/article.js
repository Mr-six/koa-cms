const Router       = require('koa-router')
const {articleApi}  = require('../api').v1
const article         = new Router()

// {
//     "title": "test",
//     "content": "test content",
//     "status": "1"
// }

/**
 * test
 */
article.get('/', (ctx) => {
    ctx.body = 'article'
})
/**
 * 创建
 */
article.post('/create', articleApi.create)

/**
 * 查找
 */
article.get('/all', articleApi.all)

/**
 * 修改
 */
// article.post('/resetPassword', articleApi.resetPassword)

module.exports = article