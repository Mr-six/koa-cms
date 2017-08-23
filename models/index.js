const mongoose = require('mongoose')
const config   = require('../config')
const $        = require('../utils')
const v1       = require('./v1')

const dbname = config.isProd ? config.db : config.dbtest


module.exports =  {
  connect:  () => {
    mongoose.Promise = global.Promise
    mongoose.connect(dbname, {
      useMongoClient: true,
      server: { poolSize: 20 }
    }, (err) => {
      console.log(dbname)
      $.info(dbname)
      if (err) {
        $.error(`connect to ${dbname} error: ${err.message}`)
        process.exit(1)
      }
      return mongoose.connection
    })
  },
  v1,
}
