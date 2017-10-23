const $    = require('../../utils')
const Base = require('../base')

const Article = new Base('Article', {
  user:      { type: Base.ObjectId(), ref: 'User' },
  headerImg: String,
  title:     String,
  content:   String,
  markdown:  String,
  html:      String,
  status:    String,
  tags:      Array,
  sendAt:    { type: Date, default: Date.now },
  likes:     { type: Array, default: [] },
  _index:    { type: Number, default: 0, index: true }
})

Article.methods.create = async function (query) {
  query._index = await this.count({}) + 1
  return await Article.create(query)
}

module.exports =  Article.methods


