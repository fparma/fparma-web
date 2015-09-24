/* Runs in production */

var pm2 = require('pm2')

var instances = process.env.WEB_CONCURRENCY || -1 // Set by Heroku or -1 to scale to max cpu core -1
var maxMemory = process.env.WEB_MEMORY || 512

pm2.connect(function () {
  pm2.start({
    script: 'index.js',
    name: 'production-fparma', // ----> THESE ATTRIBUTES ARE OPTIONAL:
    exec_mode: 'cluster', // ----> https://github.com/Unitech/PM2/blob/master/ADVANCED_README.md#schema
    instances: instances,
    max_memory_restart: maxMemory + 'M' // Auto restart if process taking more than XXmo
  }, function () {
     // Display logs in standard output
    pm2.launchBus(function (err, bus) {
      if (err) throw err
      console.log('[PM2] Log streaming started')

      bus.on('log:out', function (packet) {
        console.log('[App:%s] %s', packet.process.name, packet.data)
      })

      bus.on('log:err', function (packet) {
        console.error('[App:%s][Err] %s', packet.process.name, packet.data)
      })
    })
  })
})

var stop = function () {
  pm2.stop('all')
}

process.on('SIGINT', stop)
process.on('SIGTERM', stop)
