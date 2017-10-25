// api基础类
const $ = require('../../utils')
const {limitDb}  = require('../../config')

module.exports =  class Base {
  constructor(options) {
    this.model   = options.model || {}
    this.search  = options.search || {}
    this.methods = addMethods(this)
  }
}

function addMethods(_this) {
  let methods = {}

  methods.count = async function (ctx) {
    let query = ctx.query
    $.result(ctx, await _this.model.count(query))
  }
  methods.findById = async function (ctx) {
    $.result(ctx, await _this.model.findById(ctx.params.id))
  }

  methods.all = async function (ctx) {
    let query = {}
    let q = ctx.query
    let {search, start, limit, options} = q
    start = Number(start) || 0
    limit = Number(limit) || limitDb
    if (!$.isEmpty(search)) query[_this.search] = new RegExp(search)
    $.result(ctx, await _this.model.all(query, start, limit, options))
  }

  methods.create = async function (ctx) {
    let query = ctx.request.body
    $.result(ctx, await _this.model.create(query))
  }

  methods.update = async function (ctx) {
    let documents = await _this.model.update({ "_id": ctx.params.id }, ctx.request.body)
    if (documents === -1) $.result(ctx, 'update failed')
    else $.result(ctx, documents)
  }

  methods.delete = async function (ctx) {
    let documents = await _this.model.delete({ "_id": ctx.params.id })
    if (documents === -1) $.result(ctx, 'delete failed')
    else $.result(ctx, documents)
  }

  // methods.addSchedule = async function (ctx) {
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
