/**
 * 基于joi的对象验证
 */
const $     = require('../utils')

/**
 * 创建账户信息验证
 */
const user  = $.joi.object().keys({
  phone:       $.joi.string().regex(/^(0|86|17951)?(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])[0-9]{8}$/),
  verifyCode:  $.joi.string().min(3).max(10),
  email:       $.joi.string().email(),
  password:    $.joi.string().min(8).max(30).required(),
  newpassword: $.joi.string().min(8).max(30),
  nickname:    $.joi.string().min(3).max(30),
  openid:      $.joi.string().min(3).max(30),
}).without('phone', 'email')

/**
 * 修改用户信息
 */
const modifyIofo = $.joi.object().keys({
  headimgurl:  $.joi.string(),
  intro:       $.joi.string(),
  sex:         $.joi.number(),
  nickname:    $.joi.string().min(3).max(10)
})

/**
 * 文章信息验证
 */
const article = $.joi.object().keys({
  title:       $.joi.string(),
  user:        $.joi.any(),
  content:     $.joi.string().empty(''),
  markdown:    $.joi.string().empty(''),
  html:        $.joi.string().empty(''),
  subTitle:    $.joi.string().empty(''),
  headerImg:   $.joi.string().empty(''),
  status:      $.joi.string(),
  sendAt:      $.joi.date().empty(''),
})

module.exports = {
  user,
  article,
  modifyIofo,
}