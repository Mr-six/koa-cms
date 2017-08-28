const Router       = require('koa-router')
const {userApi}  = require('../api').v1
const user         = new Router()

// {
// 	"phone": {
// 		"number": "13200000000",
// 		"hidden": true
// 	},
// 	"email": {
// 		"addr": "ji@ji.com"
// 	},
// 	"password": "000000000",
// 	"nickname": "test"
// }

/**
 * 登录逻辑
 */
user.post('/login', userApi.login)

/**
 * 注册逻辑
 */
user.post('/signup', userApi.create)

/**
 * 重置密码
 */
user.post('/resetPassword', userApi.resetPassword)

module.exports = user