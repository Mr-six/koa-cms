/**
 * 用于验证手机或邮箱的验证码
 */

const $                        = require('../../utils')
const {sendVerify}             = require('./ali-sms')
const email                    = require('./email')
const {setKey, getVal, delKey} = require('../../utils/redis')

async function checkCode (key, val) {
  try {
  let res = await getVal(key)
  if (res === val) {
    await delKey(key)
    return true
  }
  return false
  } catch (e) {
    $.error(e)
    return false
  }
}

/**
 * 发送激活邮件
 * @param {String} id 用户id
 * @param {Number} expire 过期时间 s
 */
async function sendEmailCode (to, id, expire) {
  let val = $.createVerifyCode(8)
  id = id.toString()
  let save = await setKey(id, val, expire)
  return sendE = await email.sendActivationCode(to, id, val, expire)
}

/**
 * 发送手机激活码
 * @param {String} tel 用户tel
 * @param {Number} expire 过期时间 s
 */
async function sendTelCode (tel, expire) {
  let val = $.createVerifyCode()
  let iSawait = setKey(tel, val, expire)
  if(iSawait) return sendVerify(tel,val)
  else return false
}

module.exports = {
  checkCode,
  sendEmailCode,
  sendTelCode,
}