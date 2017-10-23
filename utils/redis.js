/**
 * redis 数据库
 * 使用redis 存储token 和 ticket
 */

const redis          = require('redis')
const $              = require('./index')
const {promisifyAll} = require('bluebird')

// 使用 bluebird 为 node-redis 添加 Promise 接口
promisifyAll(redis.RedisClient.prototype)
promisifyAll(redis.Multi.prototype)

const options = {
  host : 'localhost', 
  port : '6379', 
  // password : 'html',
  db : 0 //db存储的位置
}

const client = redis.createClient(options)

// client.on('ready',function(err){
//   $.inof('redis ready')
// })

client.on("error", function (err) {
  $.error("redis Error :" , err)
})

client.on('connect', function(){
  $.info(`redis connect to server:${options.host}:${options.port}`)
})

/**
 * 保存键值对
 * @param {String} key    键值
 * @param {[String]} val  值
 * @param {Number} expire   过期时间（可省略）单位 S
 * @return {Promise} 
 */
function setKey (key, val, expire) {
  if (!isNaN(expire) && expire > 0) {
    return client.multi()
      .set(key, val)
      .expire(key, expire) // 设置过期时间
      .execAsync()
  } else {
    return client.setAsync(key, val)
  }
}

/**
 * 获取键值
 * @param  {String} key    对应的键值
 * @return {Promise}   
 */
function getVal (key) {
  return client.getAsync(key)
}

/**
 * 删除键值
 * @param  {String} key    对应的键值
 * @return {Promise}   
 */
function delKey (key) {
  return client.del(key)
}

module.exports = {
  setKey,
  getVal,
  delKey,
}