const {userModel} = require('../models').v1
const $           = require('../index')
const jwt         = require('jsonwebtoken')
const config      = require('../config')

// 解析token信息 返回的 value 的内容
// value 解析的内容为 用户的 _id 和权限值
function _tokenPromise (token) {
  return new Promise ((resolve, reject) => {
    jwt.verify(token, config.secret, (err, value) => {
      if (err) {reject(err)}
      resolve(value)
    })
  })
}

// 生成token
// json为对象结构,包含 用户 _id 和 permission 权限值
module.exports.createToken = (json) => {
  const token = jwt.sign(json, config.secret, { expiresIn: config.tokenExpires})
  return token;
}

// 验证token的正确性 中间价形式
module.exports.authToken = async function (ctx, next) {
  const token = ctx.req.body.token || null
  if ($.isEmpty(token)) {return $.result(ctx, 'token error')}
  try {  // 解析token
    const decode = await _tokenPromise(token)
    const user = await userModel.find({'_id': decode.user})
    if (user) {  // 解析结果
      ctx.user = user
      next()
    } else {
      $.result(ctx, 'token error')
    }
  } catch (e) {
    $.result(ctx, 'token error')
  }
}
