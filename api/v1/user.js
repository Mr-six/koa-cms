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

  let userDate = {  // 提交信息
    email: {
      addr: body.email,
    },
    phone: {
      number: body.phone,
    },
    password: body.password,
  }
  const { error, value } = $.joi.validate(userDate, schema.user)  // 验证body对象
  // $.debug(error)
  if (error) return $.result(ctx, 'params error')

  // 判断邮箱或者手机是否已经存在
  let exist
  if (value.email.addr) {
    exist  = await userModel.find({ "email.addr": value.email.addr })
  } else {
    exist  = await userModel.find({ "phone.number": value.phone.number })
  }
  if (exist) return $.result(ctx, 'account already exist!')
  
  // 创建账户
  const query = Object.assign({code: $.inviteCode()}, value)
  // $.info(query)
  let user    = await userModel.create(query)

  // 生成token
  $.debug('create new user')
  const token = auth.createToken({user: user._id, permission: user.permission})
  user        = await userModel.findOneAndUpdate({_id: user._id}, { token: token })
  $.result(ctx, user)
}

// 登录验证 email和密码
// TODO
// 密码未做加密处理

userApi.methods.login = async function (ctx, next) {
  let body = ctx.request.body
  let userDate = {  // 提交信息
    email: {
      addr: body.email,
    },
    phone: {
      number: body.phone,
    },
    password: body.password,
  }
  // $.debug(body)
  const { error, value } = $.joi.validate(userDate, schema.user)
  
  if (error) {
    $.error(error)
    return $.result(ctx, 'params error')
  }
  
  let documents
  if (value.email.addr) {  // 邮箱登陆
    documents = await userModel.find({ "email.addr": value.email.addr, "password": value.password })
  } else {                 // 手机登陆
    documents = await userModel.find({ "phone.number": value.phone.number, "password": value.password })
  }
  if ($.isEmpty(documents)) return $.result(ctx, 'login failed')

  // token是否过期
  let {token} = documents
  try {
    const decode = await tokenPromise(token)
  } catch (e) {  // 生成新token
    $.info('get new token')
    token = auth.createToken({user: documents._id, permission: documents.permission})
    documents = await userModel.findOneAndUpdate({_id: documents._id}, { token: token }, {select: '-password'})
  }
  // documents = await userModel.update({_id: documents._id}, { token: token })
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
  let {password, newpassword} = body
  let userData = {password, newpassword}
  const { error, value } = $.joi.validate(userData, schema.user)
  if (ctx.user.password !== password) return $.result(ctx, 'Incorrect password!')
  if (value.password === value.newpassword) return $.result(ctx, 'same password!')

  let documents = await userModel.update({ _id: ctx.user._id }, { password: value.newpassword })
  if (documents === -1) return $.result(ctx, 'reset failed')
  $.result(ctx, documents)
}

module.exports = userApi.methods
