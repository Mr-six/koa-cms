const Base           = require('./base')
const {userModel}    = require('../../models').v1
const $              = require('../../utils')
const auth           = require('../../utils/auth')
const {schema}       = require('../../config')
const {tokenPromise, createToken} = require('../../utils/auth')

const userApi     = new Base({
  model: userModel,
  search: 'nickname'
})


// 1 生成邀请码
// 2 验证 post body 的合法性
// 3 创建用户
// 4 根据用户 id 更新 token, 返回用户信息
userApi.methods.create = async function (ctx, next) {
  let body = ctx.request.body
  const { error, value } = $.joi.validate(body, schema.user)  // 验证body对象
  $.debug(error)
  if (error) return $.result(ctx, 'params error')

  // 判断邮箱或者手机是否已经存在
  let existE  = await userModel.find({ "email.addr": body.email.addr })
  let existP  = await userModel.find({ "phone.number": body.phone.number })
  let exist   = $.isEmpty(existE) || $.isEmpty(existP)
  if (exist) return $.result(ctx, 'account already exist!')
  
  // 创建账户
  const query = Object.assign({code: $.inviteCode()}, body)
  $.info(query)
  let user    = await userModel.create(query)

  // 生成token
  $.debug(user)
  const token = auth.createToken({user: user._id, permission: user.permission})
  user        = await userModel.update({_id: user._id}, { token: token })
  $.result(ctx, user)
}

// 登录验证 email和密码
// TODO
// 密码未做加密处理

userApi.methods.login    = async function (ctx, next) {
  let body = ctx.request.body
  $.debug(body)
  const { error, value } = $.joi.validate(body, schema.user)
  
  if (error) {
    $.error(error)
    return $.result(ctx, 'params error')
  }

  let documents = await userModel.find({ "email.addr": value.email.addr, "password": value.password })
  if ($.isEmpty(documents)) return $.result(ctx, 'login failed')

  // token是否过期
  let {token} = documents
  try {
    const decode = await tokenPromise(token)
  } catch (e) {  // 生成新token
    $.info('get new token')
    token = auth.createToken({user: documents._id, permission: documents.permission})
  }
  documents = await userModel.update({_id: documents._id}, { token: token })
  if ($.isEmpty(documents)) return $.result(ctx, 'login failed')
  $.result(ctx, documents)
}

/**
 * 登出逻辑放在前端完成
 * 清除本地储存token数据即可
 */

/**
 * 重置密码逻辑
 * 1. post body 验证
 * 2. 新旧密码验证
 * 3. 密码更新
 * 4. 返回用户
 */
userApi.methods.resetPassword = async function (ctx, next) {
  let body = ctx.request.body
  const { error, value } = $.joi.validate(body, schema.user)
  if (error) {
    $.error(error)
    return $.result(ctx, 'params error')
  }

  if ($.isEmpty(body.old) || $.isEmpty(body.new)) return $.result(ctx, 'params error')
  if (body.old === body.new) return $.result(ctx, 'same password')

  let documents = await userModel.update({ _id: ctx.user._id }, { password: body.new })
  if (documents === -1) return $.result(ctx, 'reset failed')
  $.result(ctx, documents)
}

module.exports = userApi.methods
