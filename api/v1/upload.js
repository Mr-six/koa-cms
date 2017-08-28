const multer = require('koa-router-multer')
// const diskStorage = '../../static/'
const storage = multer.diskStorage({
  destination: function (ctx, file, cb) {
    cb(null, 'static/uploads/')
  },
  filename: function (ctx, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

// const upload = multer({ storage: storage })
const upload = multer({ dest: 'static/uploads/' })

upload.pic = async function (ctx, next) {
    var file = ctx.req.file
    if (file != null) {
        console.dir(file)
        ctx.body = file
    } else {
        console.log('No upload file!')
        ctx.body = 'false'
    }
}

module.exports = upload