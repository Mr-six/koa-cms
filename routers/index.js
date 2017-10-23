const Router        = require('koa-router')
const router        = new Router()
const user          = require('./user')
const article       = require('./article')
const {uploadApi}   = require('../api').v1
const {authToken}   = require('../utils/auth')

router.use('/user',         user.routes(),    user.allowedMethods())     // user router
router.use('/article',      article.routes(), article.allowedMethods())  // article router
router.get('/oss',          authToken,        uploadApi.getAcessOss)     // get oss token
router.get('/qiniu',        authToken,        uploadApi.getQiniu)        // get qiniu token
router.post('/upload',      authToken,        uploadApi.localUpload.single('file'), uploadApi.localUpload.file)     // localUpload

module.exports = router
