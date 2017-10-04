const mongoose = require('mongoose')
const $        = require('../utils')

const rules  = [{ path: 'user', select: 'nickname'}]


// baseModel
module.exports =  class Base {

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

    schema.virtual('send_at').get(function (doc) {
      return $.dateformat(this.sendAt)
    })
    schema.virtual('created_at').get(function (doc) {
      return $.dateformat(this.createdAt)
    })
    schema.virtual('updated_at').get(function () {
      return $.dateformat(this.updatedAt)
    })
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
  async all(query, start, limit, options) {
    const _limit = limit || 20
    const _start = start || 0
    try {
      return await this.model.find(query)
        .limit(_limit).skip(_limit * _start)
        .populate(options && options.rules || rules).sort({ _index: -1 })
    } catch (e) {
      $.error(e)
    }
  }

  async find(query, options) {
    try {
      return await this.model.findOne(query)
        .populate(options && options.rules || rules)
    } catch (e) {
      $.error(e)
    }
  }

  async create(query) {
    try {
      return await this.model.create(query)
    } catch (e) {
      $.error(e)
    }
  }

  async update(query, info) {
    try {
      return await this.model.update(query, { $set: info })
    } catch (e) {
      $.error(e)
    }
  }

  async findOneAndUpdate (query, info) {
    try {
      return await this.model.findOneAndUpdate(query, { $set: info }, {new: true})
    } catch (e) {
      $.error(e)
    }
  }

  async delete(query) {
    try {
      return await query.remove()
    } catch (e) {
      $.error(e)
    }
  }

}


function addMethods (_this) {

  const methods = {}

  methods.populate = {}

  methods.count = async function (query) {
    return await _this.model.count(query)
  }

  methods.all = async function (query, start, options) {
    return await _this.all(query, start, options)
  }

  methods.find = async function (query) {
    return await _this.find(query)
  }

  methods.findById = async function (id) {
    return await _this.find({ _id: id })
  }

  methods.create = async function (query) {
    return await _this.create(query)
  }

  methods.update = async function (query, info) {
    const item = await _this.find(query)
    if (!item) { return -1 }
    return await _this.update(query, info)
  }

  methods.delete = async function (query) {
    const item = await _this.find(query)
    if (!item) { return -1 }
    return await _this.delete(item)
  }

  methods.findOneAndUpdate = async function (query, info) {
    const item = await _this.find(query)
    if (!item) { return -1 }
    return await _this.findOneAndUpdate(query, info)
  }

  return methods
}
