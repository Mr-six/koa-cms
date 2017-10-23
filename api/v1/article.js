const { articleModel } = require('../../models').v1
const $                = require('../../utils')
const Base             = require('./base')
const {schema}         = require('../../config')

let ArticleAPI = new Base({
  model: articleModel,
  search: 'title',
})

/**
 * 更改索引
 * post 参数
 * @params {Array} items 所需要更改_index的元素
 * 如：
 * items = [
 *  {
 *    id: '文章id',
 *    index: '更新后的index值'
 *  }
 * ]
 */
ArticleAPI.methods.updateIndex = async function (ctx) {
  let body = ctx.request.body
  if (body.items.length === 0) $.result(ctx, {})
  else body.items.forEach(async (el, index) => {
    let documents = await articleModel.update({
      _id: el.id
    }, { _index: el.index })
    if (index === body.items.length - 1) { return $.result(ctx, {}) }
  })
}

/**
 * 文章创建
 * post 参数 详见 article.md
 */
ArticleAPI.methods.create = async function (ctx) {
  let body = ctx.request.body
  body.user = ctx.user.id  // 关联用户 id
  const { error, value } = $.joi.validate(body, schema.article)  // 验证body对象
  if (error) {
    $.error(error)
    return $.result(ctx, 'params error')
  }
  let documents = await articleModel.create(value)
  $.result(ctx, documents)
}


/**
 * 文章更新
 */
ArticleAPI.methods.update = async function (ctx) {
  let body = ctx.request.body
  let userId = ctx.user.id  // 用户id
  const { error, value } = $.joi.validate(body, schema.article)  // 验证对象
  if (error) {
    $.error(error)
    return $.result(ctx, 'params error')
  }
  if (userId !== body.user) return $.result(ctx, 'Not Allowed', 405)  // 禁止更改非本人文章
  let res = await articleModel.findOneAndUpdate({ _id: ctx.params.id }, value)
  if (res === -1) $.result(ctx, 'update failed')
  else $.result(ctx, res)
}

module.exports = ArticleAPI.methods
