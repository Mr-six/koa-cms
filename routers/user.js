const Router       = require('koa-router')
const {userModel} = require('../models').v1
const user         = new Router()

user.get('/', async (ctx) => {
  let id = ctx.query.id
  console.log(id)
  let res = await userModel.find({openid: id})
  if (res) {
    ctx.body = res
  } else {
    ctx.body = 'not find user'
  }
})
user.post('/sigin', async (ctx) => {
  let id = ctx.request.body.id
  console.log(id)
  const exist = await userModel.find({openid: id})
  if (exist) {
    ctx.body = 'not find user'
    return
  }
  const user = await userModel.create({
    nickname:   id,
    openid:     id,
    email:      {addr: `${id}@qq.com`},
    password:   id,
    permission: ['dev'],
    code:       id,
    company:    '测试账号'
  })
  ctx.body = user
})

module.exports = user