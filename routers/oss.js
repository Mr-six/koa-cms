const Router     = require('koa-router')
const {getAcessOss} = require('../api').v1
const oss      = new Router()

oss.get('/', (ctx) => {
    // ctx.type = 'json'
    ctx.body = 'oss'
})
oss.get('/getoss',getAcessOss)

module.exports = oss