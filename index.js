var join = require('path').join
var fs = require('fs')


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
