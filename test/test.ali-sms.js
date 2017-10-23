const sendMsg = require('../api/tool/ali-sms')

async function test (tel, code) {
  try {
    let res = await sendMsg(tel, code)
    if (res.Message === 'OK') console.log(res)
  } catch (e) {
    console.log(e)
  }
}
test('13200000000', 6666)