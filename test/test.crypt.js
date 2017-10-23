const $ = require('../utils')

let pass = '12345678'

async function test (p) {
  let hash = await $.encrypt(p)
  $.info(hash)
  let res = await $.decrypt('1234', hash)
  $.info(res)
  let res2 = await $.decrypt(p, hash)
  $.info(res2)
}

test(pass)