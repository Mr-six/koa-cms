/**
 * 基于joi的对象验证
 */
const $     = require('../utils')

/**
 * 用户信息验证
 * TODO 待完善全部验证
 */
const user  = $.joi.object().keys({
  phone: {
    number: $.joi.string().regex(/^(0|86|17951)?(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])[0-9]{8}$/),
    hidden: $.joi.boolean(),
  },
  email: {
    addr:   $.joi.string().email(),
    hidden: $.joi.boolean(),
  },
  password: $.joi.string().min(8).max(30),
  nickname: $.joi.string().min(3).max(30),
})

module.exports = {
  user,
}