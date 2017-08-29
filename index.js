/**
 * Module dependencies
 */
const Koa        = require('koa')
const bodypaser  = require('koa-bodyparser')
const cors       = require('koa-cors')
const routers    = require('./routers')
const static     = require('koa-static')
const path       = require('path')
/**
 * app instance
 */
const app        = new Koa()

/**
 * configs
 */
const config     = require('./config')

require('./models').connect()

/**
 * middleware
 */
app.use(bodypaser({
  formLimit: '10mb'
}))
app.use(cors())
app.use(static(config.static))

/**
 * routers
 */
app.use(routers.routes())

/**
 * run and listen
 */
app.listen(config.port, () => {
    console.log('run at: ' + config.port)
})