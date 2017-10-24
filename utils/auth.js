const {userModel} = require('../models').v1
const $           = require('./index')
const jwt         = require('jsonwebtoken')
const yaml        = require('js-yaml')
const fs          = require('fs')
const path        = require('path')
const config      = require('../config')

let   yml         = {}
let   yamlFile    = path.join(__dirname, 'permission.yml')
let   pmCache     = {}

try {
  yml = yaml.safeLoad(fs.readFileSync(yamlFile , 'utf8'))
} catch (e) {
  $.error(e)
}

/**
 * 权限验证
 * @param {Object} ctx koa ctx
 * @param {Array} permission 用户权限
 */
function permissionAllow (ctx, permission) {
  let params = ctx.params
  let url
  if (!$.isEmpty(params)) url = `${ctx.matched[0].path}#${ctx.method}`
  else url = `${ctx.path}#${ctx.method}`
  let pmStr = permission.toString()
  let userPM = {}  // 当前用户权限列表
  if ($.isEmpty(pmCache[pmStr])) {  // 权限查找
    permission.forEach(key => {
      if (yml[key]) {
        userPM = Object.assign(userPM, yml[key])
      }
    })
    pmStr[pmStr] = userPM  // 缓存权限
  } else {
    userPM = pmStr[pmStr]
  }
  return userPM[url] === 'allow'
}

/**
 * 解析token信息
 * value 的内容为:
 * 用户的 _id 
 * 权限值 permission
 * @param {String} token 用户token
 */
function tokenPromise (token) {
  return new Promise ((resolve, reject) => {
    jwt.verify(token, config.secret, (err, value) => {
      if (err) {reject(err)}
      resolve(value)
    })
  })
}

/**
 * 生成token
 * json为对象结构
 * 包含 用户 _id 和 permission 权限值
 * @param {Object} json 待加密字段
 */
function createToken (json) {
  const token = jwt.sign(json, config.secret, { expiresIn: config.tokenExpires})
  return token;
}

/**
 * 验证token的正确性 中间价形式
 * 根据用户权限 判断是否有权访问
 * @param {koa} ctx 上下文
 * @param {koa} next 
 */
async function authToken (ctx, next) {
  const token = ctx.request.body.token || ctx.headers.token || null
  if ($.isEmpty(token)) return $.result(ctx, 'token error')
  try {  // 解析token
    const decode = await tokenPromise(token)
    if (decode && decode.id) {  // 解析结果
      let user = await userModel.findById(decode.id)
      if ($.isEmpty(user)) return $.result(ctx, 'token error')
      // 权限检查
      if (!permissionAllow(ctx, user.permission)) return $.result(ctx, 'Permission denied', 403)
      ctx.user = decode
      if (ctx.request.body.token) delete ctx.request.body.token  // 删除 token
      return next()
    } else {
      $.result(ctx, 'token error')
    }
  } catch (e) {
    $.debug(e)
    $.result(ctx, 'token error')
  }
}

module.exports = {
  tokenPromise,
  createToken,
  authToken,
}