/**
 * 用户自定配置
 */
module.exports = {
  secret: 'jwtsecret',                       // jwt secret
  baseUrl: 'https://wwwwwww.com',           // 网站地址
  email: {                                  // 邮件配置
    smtp: {                                 // smtp
      host: '',  // 地址
      port: '465',  // 端口
      secure: 'true', // true for 465, false for other ports
      auth: {  //用户名和密码
        user: '',
        pass: ''
      }
    },
    name: '',                               // 发件人名称
  },
  qiniuCof: {                               // 七牛
    accessKey: '#######',
    secretKey: '######',
    bucket: '####'
  },
  smsCof: {                                 // 阿里短信发送配置
    key: {  // key
      accessKeyId: '###',
      secretAccessKey: '###'
    },
    defaultOpt: {  // 默认配置
      SignName: '###',
      TemplateCode: 'SMS_#####',
   }
  },
  ossCof: {                                 // 阿里 oss 配置
    accessKeyId: '###',
    accessKeySecret: '####',
    bucket: '###',
    region: '####',
    role: '###',
    TokenExpireTime: 1000,
    policy: {
      "Statement": [
        {
        "Action": "###",
        "Effect": "Allow",
        "Principal": {
          "RAM": [
          "####"
          ]
        }
        }
    ],
    "Version": "1"
    }
  }
}