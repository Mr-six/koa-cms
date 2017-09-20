/**
 * ali oss api
 * 返回 oss 临时的签名
 */
const { oss } = require('../../config')
const { STS } = require('ali-oss')

const client = new STS({
    accessKeyId: oss.accessKeyId,
    accessKeySecret: oss.accessKeySecret,
})

async function getAcessOss (ctx) {
    try {
        let res = await client.assumeRole(oss.role, oss.policy, oss.TokenExpireTime)
        console.dir(res)
        ctx.body = res
    } catch (e) {
        console.log(e)
        ctx.body = e.message
    }
}

module.exports = getAcessOss