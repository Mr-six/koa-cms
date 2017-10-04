const {articleModel} = require('../../models').v1
const $         = require('../../utils')
const Base      = require('./base')
const {schema, limitDb}  = require('../../config')

let ArticleAPI = new Base({
  model: articleModel,
  search: 'title',
})

// 文章查询
ArticleAPI.methods.all = async function (ctx) {
  let q = ctx.query
  let query = {}
  let {search, start, limit} = q
  if (!$.isEmpty(search)) query = { 'title': new RegExp(search) }
  start = Number(start) || 0
  limit = Number(limit) || limitDb

  let documents = await articleModel.all(query, start, limit)
  $.result(ctx, documents)
}

// ArticleAPI.methods.create = ArticleAPI.methods.addSchedule

// 更改索引 (暂留)
ArticleAPI.methods.updateIndex = async function (ctx) {
  let body = ctx.request.body
  if (body.items.length === 0) return $.result(ctx, {})
  else req.body.items.forEach(async (el, index) => {
    let documents = await articleModel.update({
      _id: el.id
    }, { _index: el.index })
    if (index === req.body.items.length - 1) { return $.result(ctx, {}) }
  })
}

// 文章创建
ArticleAPI.methods.create = async function (ctx) {
  let body = ctx.request.body
  body.user = ctx.user._id
  $.info(typeof body.user)
  delete body.token  // 删除 token
  const { error, value } = $.joi.validate(body, schema.article)  // 验证body对象
  $.debug(error)
  if (error) return $.result(ctx, 'params error')
  
  const query = Object.assign({}, body)
  // $.info(query)
  let documents = await articleModel.create(query)
  // $.debug(article)
  $.result(ctx, documents)
}

// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTlkMzQyNWFhYzk2MDgxZmU2MTRkNDhmIiwicGVybWlzc2lvbiI6MSwiaWF0IjoxNTA3MDE3MzA2LCJleHAiOjE1MDc2MjIxMDZ9.LE5i2Dpr29UYeOMUIXfbC0v9IXUh3JheLDm2HGlxeiQ",
//   "id": "59d47855fb7ca417e2dbdf79",
//   "data": {
//     "title": "更新测试",    
//   }
// }
// 文章更新
ArticleAPI.methods.update = async function (ctx) {
  let body = ctx.request.body
  let id = body.id
  let data = body.data
  const { error, value } = $.joi.validate(data, schema.article)  // 验证对象
  // $.debug(error)
  if (error) return $.result(ctx, 'params error')
  
  const info = Object.assign({}, value)
  let documents = await articleModel.findOneAndUpdate({_id: id}, info)
  // $.info(documents)
  if (documents === -1) $.result(ctx, 'update failed')
  // $.debug(article)
  $.result(ctx, documents)
}

/**
 * 文章删除
 */
ArticleAPI.methods.delete = async function (ctx) {
  let body = ctx.request.body
  let {id} = body
  // documents && documents.job && documents.job.cancel()
  let documents = await articleModel.delete({ "_id": id })
  if (documents === -1) $.result(ctx, 'delete failed')
  $.result(ctx, documents)
}

module.exports = ArticleAPI.methods
