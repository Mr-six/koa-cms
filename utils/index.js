const log4js = require('koa-log4')
const moment = require('moment')
const crypto = require('crypto')
const joi    = require('joi')

const logger = log4js.getLogger('debug')
logger.setLevel('auto')

module.exports           = logger
module.exports.joi       = joi
module.exports.logAccess = log4js.connectLogger(log4js.getLogger('access'), {
  level: 'auto'
})

module.exports.md5 = function (str) {
  return crypto.createHash('md5').update(str.toString()).digest('hex')
}

module.exports.base64 = function (str) {
  return Buffer(str.toString()).toString('base64')
}

module.exports.trimStr = function (str) {
  return str.replace(/(^\s*)|(\s*$)/g, "")
}

module.exports.inviteCode = function () {
  return Math.random().toString(36).substring(2) // ?
}

/**
 * 生成 API 返回数据
 * @param   res     response
 * @param   data    返回数据 （code===0:数据体, code>0:error message)
 * @param   code    Error Code (default: 0)
 * @param   status  Status Code (default: 200)
 */
module.exports.result = function (ctx, data, msg, status) {
  let redata = {}
  if (typeof data === 'string' ||
    data === 'null' ||
    data === undefined ||
    data === null || msg) {
    status = status || 400
    redata = {
      success: false,
      msg: data,
      data: {}
    }
  } else {
    status = status || 200
    redata = {
      success: true,
      msg: '',
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
  if (typeof value == 'string') {
    return value.trim() === ''
  } else if (typeof value == 'number') {
    return value === 0
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