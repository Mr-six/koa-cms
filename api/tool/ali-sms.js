/**
 * ali 短信发送
 */
const SMSClient = require('@alicloud/sms-sdk')
const {smsCof}     = require('../../config')

//初始化sms_client 
let smsClient = new SMSClient(smsCof.key)

/**
 * 发送激活短信
 * @param {String} tel 目标手机号码
 * @param {Number} code 发送的验证码
 */
function sendVerify (tel, code) {
  let opt = Object.assign({
    PhoneNumbers: tel,
    TemplateParam: `{"code":"${code}"}`
  }, smsCof.defaultOpt)

  return smsClient.sendSMS(opt)
}

module.exports = {
  sendVerify,
}

