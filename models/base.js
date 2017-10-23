const mongoose    = require('mongoose')
const $           = require('../utils')
const { limitDb } = require('../config')

const populate = [{ path: 'user', select: 'nickname'}]  // populate
// baseModel
module.exports = class Base {
  constructor(name, options) {
    const schema = mongoose.Schema(options, {
      versionKey: false,
      toObject:   { virtuals: true },
      toJSON:     { virtuals: true },
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      }
    })

    // schema.virtual('send_at').get(function (doc) {
    //   return $.dateformat(this.sendAt)
    // })
    // schema.virtual('created_at').get(function (doc) {
    //   return $.dateformat(this.createdAt)
    // })
    // schema.virtual('updated_at').get(function () {
    //   return $.dateformat(this.updatedAt)
    // })
    schema.options.toObject.transform = function (doc, ret, options) {
      delete ret.id
    }
    schema.options.toJSON.transform = function (doc, ret, options) {
      delete ret.id
    }

    this.schema  = schema
    this.model   = mongoose.model(name, schema)
    this.methods = addMethods(this)
  }

  static ObjectId() {
    return mongoose.Schema.ObjectId
  }

  // try catch methods
  /**
   * 查询数据
   * @param {Object} query 查询对象
   * @param {Number} start 页数
   * @param {Number} limit 每页限制数据条数
   * @param {Object} options 参数
   */
  async all(query, page, limit, options) {
    const _limit   = limit || limitDb // 每页条数 20
    const _page    = page || 0  // 起始页
    const sort     = options && options.sort || { _index: -1 }    // 排序规则
    const offset   = options && options.offset || _limit * _page  // 起始位置
    try {
      return await this.model.find(query)
        .select(options && options.select || {})
        .limit(_limit).skip(offset)
        .populate(options && options.populate || populate).sort(sort)
    } catch (e) {
      $.error(e)
    }
  }

  /**
   * 查询单条数据
   * @param {Object} query 查询对象
   * @param {Object} options 参数
   */
  async findOne(query, options) {
    try {
      return await this.model.findOne(query)
        .select(options && options.select || {})
        .populate(options && options.populate || populate)
    } catch (e) {
      $.error(e)
    }
  }

  /**
   *  创建数据
   * @param {Object} select 筛选
   * @param {Object} options 可选参数
   */
  async create(query) {
    try {
      return await this.model.create(query)
    } catch (e) {
      $.error(e)
    }
  }

  /**
   * 
   * @param {Object} query  查询对象
   * @param {Object} info  修改对象
   */
  async update(query, info) {
    try {
      return await this.model.update(query, { $set: info })
    } catch (e) {
      $.error(e)
    }
  }

  /**
   * 查询单条数据并更新
   * @param {Object} query  查询对象
   * @param {Object} info  修改对象
   * @param {Object} options 可选参数 http://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate
   */
  async findOneAndUpdate (query, info, options) {
    try {
      return await this.model.findOneAndUpdate(query, { $set: info }, options || {new: true})
    } catch (e) {
      $.error(e)
    }
  }

  /**
   * 删除数据
   * @param {Object} query  查询对象
   * @param {Object} options 参数
   * 
   */
  async delete(query, options) {
    try {
      return await query.remove()
    } catch (e) {
      $.error(e)
    }
  }

}


function addMethods (_this) {

  const methods = {}

  /**
   * 查询数据条数
   */
  methods.count = async function (query) {
    return await _this.model.count(query)
  }

  /**
   * 查询数据详情
   */
  methods.all = async function (query, start, limit, options) {
    return await _this.all(query, start, limit, options)
  }

  /**
   * 查找单条数据
   */
  methods.findOne = async function (query, options) {
    return await _this.findOne(query, options)
  }

  /**
   * 根据 id 查询数据
   */
  methods.findById = async function (id, options) {
    return await _this.findOne({ _id: id }, options)
  }

  /**
   * 创建数据
   */
  methods.create = async function (query) {
    return await _this.create(query)
  }

  /**
   * 更新数据
   * 更新后返回更新结果，如果需要返回更新后的数据 请使用 findOneAndUpdate
   */
  methods.update = async function (query, info) {
    const item = await _this.findOne(query)
    if (!item) { return -1 }
    return await _this.update(query, info)
  }

  /**
   * 删除数据
   * 暂时只提供了删除单条数据
   * 批量删除以后可根据需求添加
   */
  methods.delete = async function (query, options) {
    const item = await _this.findOne(query)
    if (!item) { return -1 }
    return await _this.delete(item, options)
  }

  /**
   * 更新数据并返回更新后的数据
   */
  methods.findOneAndUpdate = async function (query, info, options) {
    const item = await _this.findOne(query)
    if (!item) { return -1 }
    return await _this.findOneAndUpdate(query, info, options)
  }

  return methods
}
