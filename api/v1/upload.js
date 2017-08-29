const multer  = require('koa-multer')
const path    = require('path')
const config  = require('../../config')
const $       = require('../../utils')

/**
 * TODO
 * 1.增加文件分类存放
 * 2.文件md5验重
 * 3.cdn上传
 * 4.文件管理功能
 */
const storage = multer.diskStorage({
  // 配置存放目录
  destination: function (ctx, file, cb) {
    const upPath = path.join(config.static, '/upload')
    console.log(upPath)
    cb(null, upPath)
  },
  filename: function (ctx, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

upload.file = async function (ctx, next) {
    var file = ctx.req.file
    if (file != null) {
        ctx.body = 'upload succeed'
    } else {
        $.info('No upload file!')
        ctx.body = 'false'
    }
}

module.exports = upload