const isProd =  process.env.NODE_ENV === 'production'
const log = require('./log')
module.exports = {
    isProd,
    secret: 'yqqlmgsycl',
    port: isProd ? '3000' : '3000',
    db: 'mongodb://127.0.0.1:27017/koams',
    dbtest: 'mongodb://127.0.0.1:27017/test',
    log, 
}