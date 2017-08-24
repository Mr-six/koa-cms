const Router = require('koa-router')

const router = new Router()

const user = require('./user')

router.get('/', (ctx) => {
    // ctx.type = 'json'
    ctx.body = 'index'
})
router.post('/',(ctx) => {
    let body = ctx.request.body
    console.log(body)
    ctx.body = 'body'
})
/**
 * user router
 */
router.use('/user', user.routes(), user.allowedMethods())

module.exports = router
