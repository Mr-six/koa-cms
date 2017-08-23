const Router = require('koa-router')

const router = new Router()

const user = require('./user')

router.get('/', (ctx) => {
    // ctx.type = 'json'
    ctx.body = 'index'
})

/**
 * user router
 */
router.use('/user', user.routes(),user.allowedMethods())

module.exports = router
