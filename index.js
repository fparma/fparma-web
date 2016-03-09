var join = require('path').join
var fs = require('fs')
var nconf = require('nconf')

nconf
.env({
  match: /^DB:|STEAM:/,
  whitelist: ['PORT', 'SESSION:SECRET', 'NODE_ENV', 'SQUAD_XML']
})
.file('config.json')
.defaults({NODE_ENV: 'development'})

// Let babel register from here on
require('babel-register', {
  sourceMaps: 'inline'
})

// Load all models first, must be done due to babel
fs.readdirSync(join(__dirname, 'server/models')).forEach(function (file) {
  if (~file.indexOf('.js')) require(join(__dirname, 'server/models', file))
})

// Generate user contributed markdown guides
require('./server/utils/generate-contrib-markdown')

// start server
require('./server')
