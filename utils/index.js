const log4js  = require('koa-log4')
const moment  = require('moment')
const crypto  = require('crypto')
const joi     = require('joi')
const bcrypt  = require('bcrypt')
const logConf = require('../config/logConf')

log4js.configure(logConf)
const logger = log4js.getLogger('app')

module.exports           = logger
module.exports.joi       = joi
module.exports.logHttp = log4js.koaLogger(log4js.getLogger('http'), {
  level: 'auto'
})

/**
 * 密码加密
 * passwd 未加密密码
 */
module.exports.encrypt = function (passwd) {
  return bcrypt.hash(passwd, 10)
}

/**
 * 密码解密
 * passwd 未加密密码
 * hash 加密后的密码
 */
module.exports.decrypt = function (passwd, hash) {
  return bcrypt.compare(passwd, hash)
}

/**
 * 生成时间戳
 */
module.exports.createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000) + ''
}

/**
* 生成随机字符串
*/
module.exports.createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15)
}

/**
* 生成随机数字验证码
*/
module.exports.createVerifyCode = function (len = 4) {
  return Math.random().toString().substr(2, len)
}

/**
 * md5
 */
module.exports.md5 = function (str) {
  return crypto.createHash('md5').update(str.toString()).digest('hex')
}
// sha1加密
module.exports.sha1 = function (str) {
  return crypto.createHash("sha1").update(str.toString()).digest("hex")
}

/**
 * base64
 */
module.exports.base64 = function (str) {
  return Buffer(str.toString()).toString('base64')
}

/**
 * trim
 */
module.exports.trimStr = function (str) {
  return str.replace(/(^\s*)|(\s*$)/g, "")
}

/**
 * 生成 API 返回数据
 * @param   res     response
 * @param   data    返回数据 （code===0:数据体, code>0:error message)
 * @param   status  Status Code
 * @param   code    Error Code (default: 0)
 */
module.exports.result = function (ctx, data, status, code = 0) {
  let redata = {}
  if (typeof data === 'string' ||
    data === 'null' ||
    data === undefined ||
    data === null || code) {
    status = status || 400
    redata = {
      success: false,
      errMsg: data,
    }
  } else {
    status = status || 200
    redata = {
      success: true,
      data: data
    }
  }
  ctx.status = status
  ctx.body = redata
  // ctx.status(status).send(redata)
}

module.exports.isTrue = function (value) {
  if (typeof value === 'boolean') {
    return value
  } else if (typeof value === 'string') {
    return '1 true yes ok'.split(' ').indexOf(value.trim().toLowerCase()) !== -1
  } else {
    return !!value
  }
}

module.exports.isEmpty = function (value) {
  if (typeof value === 'string') {
    return value.trim() === ''
  } else if (typeof value === 'number') {
    return value === 0
  } else if (typeof value === 'object' && value !== null) {
    return Object.keys(value).length === 0
  } else {
    return value === null || value === undefined
  }
}

module.exports.dateformat = function (obj, format) {
  format = format || 'YYYY-MM-DD HH:mm:ss'
  if (process.env.NODE_ENV === 'test') {
    return obj
  }
  return moment(obj).format(format)
}