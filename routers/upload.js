const Router      = require('koa-router')
const {uploadApi} = require('../api').v1
const upload      = new Router()

upload.get('/', (ctx) => {
    ctx.body = 'upload'
})
upload.post('/', uploadApi.single('file'), uploadApi.file)

module.exports = upload