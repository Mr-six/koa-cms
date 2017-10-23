const redis = require('../utils/redis')

async function test (key) {
  let res = await redis.getVal(key)
  console.log(res)
  res = await redis.delKey(key)
  console.log(res)
  res = await redis.setKey(key, '增加键', 300)
  console.log(res)
}
test('test')
