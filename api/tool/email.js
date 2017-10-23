const nodemailer       = require('nodemailer')
const $                = require('../../utils')
const {email, baseUrl} = require('../../config')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(email.smtp)

// 默认设置
let defaultOptions = {
    from: `"${email.name}" ${email.smtp.auth.user}`, // sender address
    to: '', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
}

/**
 * 邮件发送
 * @param {Object} option 发送邮件参数 https://nodemailer.com/message/
 */
async function sendEmail (option) {
  let sendOp = Object.assign({}, defaultOptions, option)
  try {
    let res = await transporter.sendMail(sendOp)
    if (!res.envelope) return {success: false, errMsg: res}
    else return {success: true, data: info.envelope}
  } catch (e) {
    $.error(e)
    return {success: false, errMsg: e}
  } 
}

/**
 * 
 * @param {String} to 发送对象
 * @param {String} id 用户id
 * @param {String} code 激活码
 */
async function sendActivationCode (to, id, code, expire) {
  let sendOp = Object.assign({}, defaultOptions, {
    to: to,
    subject: '请激活您的账号',
    html: `<b>请点击以下链接，激活帐号:</br><a>${baseUrl}/user/activate/${id}?code=${code}</a> </br>${expire/60/60}小时内有效</b>` // html body
  })
  try {
    let res = await transporter.sendMail(sendOp)
    if (!res.envelope) return {success: false, errMsg: res}
    else return {success: true, data: res.envelope}
  } catch (e) {
    $.error(e)
    return {success: false, errMsg: e}
  }
}

module.exports = {
  sendEmail,
  sendActivationCode,
}
