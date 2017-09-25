/**
 * ali oss api
 * 返回 oss 临时的签名
 */
const { oss } = require('../../config')
const $       = require('../../utils')
const { STS } = require('ali-oss').Wrapper



const client = new STS({
    accessKeyId: oss.accessKeyId,
    accessKeySecret: oss.accessKeySecret,
})

async function getAcessOss (ctx) {
    try {
        let res = await client.assumeRole(oss.role)
        let {credentials} = res

        Object.assign(credentials, {  // 填充
            region: oss.region,
            bucket: oss.bucket
        })
        $.result(ctx, credentials)
    } catch (e) {
        console.log(e)
        ctx.body = e.message
    }
}

module.exports = getAcessOss