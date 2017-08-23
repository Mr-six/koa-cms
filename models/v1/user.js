// type:
// 1: 普通
// 2: 受邀请
// 3: 运营
// 4: 编辑
// 99: 管理员
const Base = require('../base')
const $    = require('../../utils')

const User = new Base('User', {
  openid:       { type: String},
  sex:          Number,
  weight:       { type: Number, default: 0 },
  language:     String,
  city:         String,
  province:     String,
  country:      String,
  headimgurl:   String,
  invitecode:   String,
  token:        String,
  company:      String,
  title:        String,
  intro:        String,
  sign:         String,
  code:         String,
  password:     String,
  permission:   { type: Array, default: ['unset'] },
  status:       { type: Number, default: -1 },
  nickname: {
    type:    String,
    index:   true,
    default: '用户' + Math.random().toString(36).substring(20),
  },
  email: {
    addr:   String,
    hidden: { type: Boolean, default: false },
  },
  wechat: {
    number: String,
    hidden: { type: Boolean, default: false },
  },
  phone: {
    number: String,
    hidden: { type: Boolean, default: false },
  }
});

module.exports = User.methods
