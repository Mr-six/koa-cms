const isProd =  process.env.NODE_ENV === 'production'

let logConf = {
  "appenders": [
    {
      "type": "console",  //控制台输出日志
      "category": "console"
    },
    {  //在./logs/data_log目录生成 http.log文件
      "type": isProd ? "datefile" : "console", //datefile表示是输出按时间分文件的日志
      "filename": "logs/data_log/http.log",  //文件件名
      "pattern": "_yyyy-MM-dd.log",
      "alwaysIncludePattern": true,
      "category": "http"  //过滤所有日志名为 http 的日志
    },
    {  //记录所有日志
      "type": isProd ? "file" : "console",  //file表示日志输出为普通文件,在此种配置下,所有日志会输出到该日志文件
      "filename": "logs/app.log", //日志文件名
      "maxLogSize": 102400,  //设置日志文件的最大大小，文件体积超过时，自动分文件
      "pattern": "-yyyy-MM-dd", //
      "numBackups": 5,  //备份的文件数量,如果文件过多则会将最旧的删除
      "category": "app"
    },
  ],
  "replaceConsole": true,
}

const extrConf = {
  "type": "logLevelFilter", //日志级别过滤
  "level": "ERROR",  //该日志文件只记录级别在error及以上的日志
  "appender": {
    "type": "file",  
    "filename": "logs/errors.log"
  }
}

isProd ? logConf.appenders.push(extrConf) : ''  // 环境判断

module.exports = logConf
