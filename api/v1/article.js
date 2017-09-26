const {articleModel} = require('../../models').v1
const $         = require('../../utils')
const Base      = require('./base')
const {schema}  = require('../../config')

let ArticleAPI = new Base({
  model: articleModel,
  search: 'title',
})

ArticleAPI.methods.all = async function (ctx, next) {
  let query = {}, search = ctx.query.search
  if (!$.isEmpty(search)) query = { 'title': new RegExp(search) }
  let documents = await articleModel.all(query, ctx.query.start)
  $.result(ctx, documents)
}

// ArticleAPI.methods.create = ArticleAPI.methods.addSchedule

// 更改索引
ArticleAPI.methods.updateIndex = async function (ctx, next) {
  if (req.body.items.length === 0) return $.result(ctx, {})
  else req.body.items.forEach(async (el, index) => {
    let documents = await articleModel.update({
      _id: el.id
    }, { _index: el.index })
    if (index === req.body.items.length - 1) { return $.result(ctx, {}) }
  })
}
ArticleAPI.methods.create = async function (ctx, next) {
  let body = ctx.request.body
  const { error, value } = $.joi.validate(body, schema.article)  // 验证body对象
  $.debug(error)
  if (error) return $.result(ctx, 'params error')
  
  const query = Object.assign({}, body)
  $.info(query)
  let article = await articleModel.create(query)

  $.debug(article)
  $.result(ctx, article)
}

ArticleAPI.methods.delete = async function (ctx, next) {
  let documents = await articleModel.findById(req.params.id)
  documents && documents.job && documents.job.cancel()
  documents = await articleModel.delete({ "_id": req.params.id })
  if (documents === -1) $.result(ctx, 'delete failed')
  else $.result(ctx, documents)
}

module.exports = ArticleAPI.methods
