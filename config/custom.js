/**
 * 用户自定配置
 */
module.exports = {
  secret: 'yqqlmgsycl',                     // jwt secret
  baseUrl: 'https://iclean.chanvr.com',    // 网站地址
  email: {                                  // 邮件配置
    smtp: {                                 // smtp
      host: 'smtp.qq.com',  // 地址
      port: '465',  // 端口
      secure: 'true', // true for 465, false for other ports
      auth: {  //用户名和密码
        user: '582497915@qq.com',
        pass: 'mibkmmeclrvebddi'
      }
    },
    name: 'iClean',                               // 发件人名称
  },
  qiniuCof: {                               // 七牛
    accessKey: 't9Eddw4UXPEcYhFMvQFi3WkAQT0x4NXyRnqAvmAw',
    secretKey: 'iBls8tc1kbqrHk3MxqWORBcPzJKDi0H9V4KdULzD',
    bucket: 'mrsix'
  },
  smsCof: {                                 // 阿里短信发送配置
    key: {  // key
      accessKeyId: 'LTAIKs8y1KuMLTlm',
      secretAccessKey: 'hEtcn0Km2MfHOkxfqsK1K5DMBUHFjP'
    },
    defaultOpt: {  // 默认配置
      SignName: '桀骜不驯的喵',
      TemplateCode: 'SMS_105705034',
   }
  },
  ossCof: {                                 // 阿里 oss 配置
    accessKeyId: 'LTAIrlFoK5gc16EA',
    accessKeySecret: 'CXB3YmCg6W22M84Dkh7OvowerLNjbg',
    bucket: 'jyy-miao',
    region: 'oss-cn-beijing',
    role: 'acs:ram::1197563115958406:role/miao',
    TokenExpireTime: 1000,
    policy: {
      "Statement": [
        {
        "Action": "sts:AssumeRole",
        "Effect": "Allow",
        "Principal": {
          "RAM": [
          "acs:ram::1197563115958406:root"
          ]
        }
        }
    ],
    "Version": "1"
    }
  }
}