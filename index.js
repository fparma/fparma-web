var join = require('path').join
var read = require('fs').readdirSync
var nconf = require('nconf')

nconf.env({
  separator: '_',
  match: /^DB_|STEAM_/,
  whitelist: ['PORT', 'SESSION_SECRET']
}).file('config.json')

// Let babel register from here on
require('babel/register', {
  sourceMaps: 'inline'
})

// Load all models first
read(join(__dirname, 'server/models')).forEach(function (file) {
  if (~file.indexOf('.js')) require(join(__dirname, 'server/models', file))
})

// start server
require('./server')
