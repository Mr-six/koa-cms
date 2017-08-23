module.exports = baseLog = {
    appenders: [{
      layout: {
        type: "pattern",
        pattern: "%[%d %-5p %-6c(%x{pid})%] - %m",
        tokens: {
          pid: process.pid
        }
      },
      type: "console"
    }]
  }