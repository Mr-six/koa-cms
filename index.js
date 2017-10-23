/**
 * Module dependencies
 */
const Koa        = require('koa')
const bodypaser  = require('koa-bodyparser')
const cors       = require('@koa/cors')
const static     = require('koa-static')
const routers    = require('./routers')
const path       = require('path')
const onerror    = require('koa-onerror')
const restc      = require('restc')
const {proxy}    = require('koa-nginx')
/**
 * app instance
 */
const app        = new Koa()

/**
 * configs
 */
const config    = require('./config')

/**
 * http logger
 */
const {logHttp} = require('./utils')

require('./models').connect()


/**
 * middleware
 */
onerror(app)  // 错误处理

app.use(logHttp)  // 访问日志

app.use(static(config.static))

app.use(restc.koa2())  //

app.use(bodypaser({
  formLimit: '10mb'
}))
app.use(cors())

/**
 * routers
 */
app.use(routers.routes())

/**
 * proxy urls
 */
app.use(proxy(config.proxyUrl))

/**
 * run and listen
 */
app.listen(config.port, () => {
    console.log('run at localhost:' + config.port)
})