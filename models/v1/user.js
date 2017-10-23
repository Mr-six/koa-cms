/**
 * 用户数据表
 */
const Base = require('../base')
const $    = require('../../utils')

const User = new Base('User', {
  sex:          Number,  // 性别 0 女 1 男 -1 未知
  token:        String,  // token
  intro:        String,  // 介绍
  email:        String,  // 邮箱
  phone:        String,  // 电话
  password:     String,  // 密码
  openid:       String,  // 微信openid
  permission:   {type: Array, default: ['user']},  // 权限
  status:       {type: Number, default: -1},  // 帐号状态 默认未激活
  headimgurl:   {type: String, default: 'http://cdn.mrsix.top/img/default.png'},  // 头像
  wallet:       {type: Number, default: 0},  // 钱包金额 单位 分
  zmz: {  // 字幕组关联帐号
    id:      String,
    passwd:  String,
    favList: Array,
  },
  nickname: {  // 用户名
    type:    String,
    index:   true,
    default: '用户' + Math.random().toString(36).substring(2),
  },
})

module.exports = User.methods
