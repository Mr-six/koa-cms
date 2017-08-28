const $    = require('../../utils')
const Base = require('../base')

const article = new Base('article', {
  // user:      { type: Base.ObjectId(), ref: 'User' },
  headerImg: String,
  title:     String,
  content:   String,
  markdown:  String,
  html:      String,
  status:    String,
  sendAt:    { type: Date, default: Date.now },
  likes:     { type: Array, default: [] },
  _index:    { type: Number, default: 0, index: true }
})

article.methods.create = async function (query) {
  query._index = await this.count({}) + 1
  return await article.create(query)
}

module.exports =  article.methods


