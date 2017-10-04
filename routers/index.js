const Router  = require('koa-router')

const router  = new Router()

const {authToken} = require('../utils/auth')

const user    = require('./user')

const article = require('./article')

const upload  = require('./upload')

const debug   = require('./debug')

const oss     = require('./oss')

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
router.use('/upload', authToken, upload.routes(), upload.allowedMethods())

router.use('/debug', debug.routes(), debug.allowedMethods())

router.use('/oss', authToken, oss.routes(), oss.allowedMethods())


module.exports = router
