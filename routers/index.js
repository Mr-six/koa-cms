const Router  = require('koa-router')

const router  = new Router()

const user    = require('./user')

const article = require('./article')

const upload  = require('./upload')

const debug   = require('./debug')

/**
 * user router
 */
router.use('/user', user.routes(), user.allowedMethods())

/**
 * article router
 */
router.use('/article', article.routes(), article.allowedMethods())

/**
 * upload router
 */
router.use('/upload', upload.routes(), upload.allowedMethods())

router.use('/debug', debug.routes(), debug.allowedMethods())

module.exports = router
