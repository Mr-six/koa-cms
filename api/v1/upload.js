const multer                      = require('koa-multer')
const path                        = require('path')
const $                           = require('../../utils')
const qiniu                       = require('qiniu')
const {STS}                       = require('ali-oss').Wrapper
const {static, ossCof, qiniuCof}  = require('../../config')


/**
 * ali oss api
 * 返回 oss 临时的签名
 */
const client = new STS ({
  accessKeyId: ossCof.accessKeyId,
  accessKeySecret: ossCof.accessKeySecret,
})

async function getAcessOss (ctx) {
  try {
    let res = await client.assumeRole (ossCof.role)
    let {credentials} = res
    Object.assign (credentials, {  // 填充
      region: ossCof.region,
      bucket: ossCof.bucket
    })
    $.result (ctx, credentials)
  } catch (e) {
    $.error(e)
    $.result(ctx, e.message)
  }
}

/**
 * 七牛云获取上传凭证
 */

async function getQiniu (ctx) {
  // 配置鉴权对象mac
  const mac = new qiniu.auth.digest.Mac(qiniuCof.accessKey, qiniuCof.secretKey)
  var options = {  // bucket
    scope: qiniuCof.bucket
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  if (uploadToken) $.result (ctx, {token: uploadToken})
  else $.result (ctx, 'remove server error', 500)
}



/**
 * 本地上传方法
 * TODO:
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

const localUpload = multer({ storage: storage })

localUpload.file = async function (ctx, next) {
  var file = ctx.req.file
  if (file != null) $.result(ctx, {mes: 'upload succeed'})
  else {
    $.info('No upload file!')
    $.result(ctx, 'No upload file!')  
  }
}


module.exports = {
  getAcessOss,
  localUpload,
  getQiniu,
}