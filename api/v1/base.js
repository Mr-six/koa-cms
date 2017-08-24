// api基础类
const $        = require('../../utils')

module.exports =  class Base {
  constructor(options) {
    this.model   = options.model || {}
    this.search  = options.search || {}
    this.methods = addMethods(this)
  }
}

function addMethods(_this) {
  let methods = {}
  methods.find = async function (ctx, next) {
    $.result(ctx, await _this.model.findById(ctx.params.id))
  }

  methods.all = async function (ctx, next) {
    let query = {}, search = ctx.query.search
    if (!$.isEmpty(search)) query[_this.search] = new RegExp(search)
    $.result(ctx, await _this.model.all(query, ctx.query.start))
  }

  methods.create = async function (ctx, next) {
    $.result(ctx, await _this.model.create(query))
  }

  methods.update = async function (ctx, next) {
    let exist = await _this.model.find({ "_id": ctx.params.id })
    if (exist.openid === '123454321') {
       $.result(ctx, 'this is test account')
       return
    }
    let documents = await _this.model.update({ "_id": ctx.params.id }, req.body)
    if (documents === -1) $.result(ctx, 'update failed')
    else $.result(ctx, documents)
  }

  methods.delete = async function (ctx, next) {
    let documents = await _this.model.delete({ "_id": ctx.params.id })
    if (documents === -1) $.result(ctx, 'delete failed')
    else $.result(ctx, documents)
  }

  // methods.addSchedule = async function (ctx, next) {
  //   let params = Object.assign({user: ctx.user._id}, ctx.body)

  //   if (params.status !== 'schedule') { params.sendAt = Date.now() }

  //   let documents = await _this.model.create(params)

  //   if (documents === -1) { return $.result(ctx, 'params error') }

  //   if (params.status === 'schedule') { // 延迟发送
  //     let j = $.job.add(new Date(params.sendAt), function () {
  //       _this.model.update({ "_id": documents._id }, { status: 'send' })
  //     })
  //     _this.model.update({ "_id": documents._id }, { job: j })
  //   }

  //   $.result(ctx, documents)
  // }

  return methods
}
