const mongoose = require('mongoose')
const config   = require('../config')
const $        = require('../utils')
const v1       = require('./v1')

const dbname = config.isProd ? config.db : config.dbtest

mongoose.Promise = global.Promise

module.exports =  {
  connect:  () => {
    mongoose.connect(dbname, {
      useMongoClient: true,
      poolSize: 2
    }, (err) => {
      console.log(dbname)
      $.info(dbname + ' success connect')
      if (err) {
        $.error(`connect to ${dbname} error: ${err.message}`)
        process.exit(1)
      }
      return mongoose.connection
    })
  },
  v1,
}
