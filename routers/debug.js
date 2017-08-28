const Router     = require('koa-router')
const debug      = new Router()

debug.get('/', (ctx) => {
    // ctx.type = 'json'
    ctx.body = 'debug'
})
debug.post('/',(ctx) => {
    let body = ctx.request.body
    console.log(body)
    ctx.body = body
})

module.exports = debug