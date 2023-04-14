var gulp = require('gulp')
var del = require('del')
var minifyCss = require('gulp-minify-css')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var plumber = require('gulp-plumber')
var browserSync = require('browser-sync')
var child_process = require('child_process')

var buildSemantic = require('./client/semantic/tasks/build')
var watchSemantic = require('./client/semantic/tasks/watch')

require('dotenv').config()

var BROWSER_SYNC_RELOAD_DELAY = 1000

var base = {
  client: 'client/',
  server: 'server/',
  public: 'public/'
}

var paths = {
  scripts: 'js/**/*.js',
  css: 'css/**/*.css',
  semantic: 'semantic/'
}

function checkErr(cb) {
  return function (e) {
    cb()
  }
}

gulp.task('post-install', ['build-semantic', 'build'])
gulp.task('build-semantic', buildSemantic)
gulp.task('watch-semantic', watchSemantic)

gulp.task('clean:scripts', function (cb) {
  del('js', { cwd: base.public }).then(checkErr(cb))
})

gulp.task('clean:css', function (cb) {
  del('css', { cwd: base.public }).then(checkErr(cb))
})

gulp.task('build', ['build:css', 'build:scripts'])
gulp.task('build:scripts', ['clean:scripts'], function () {
  return gulp.src(paths.scripts, { cwd: base.client })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(uglify({ mangle: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('js', { cwd: base.public }))
})

gulp.task('build:css', ['clean:css'], function () {
  return gulp.src(paths.css, { cwd: base.client })
    .pipe(minifyCss())
    .pipe(gulp.dest('css', { cwd: base.public }))
    .pipe(browserSync.stream())
})

gulp.task('dev', ['build'], function (cb) {
  gulp.watch(paths.scripts, { cwd: base.client }, ['build:scripts'])
  gulp.watch(paths.css, { cwd: base.client }, ['build:css'])

  var reloading = false
  gulp.watch(['public/js/**/*.js', 'server/views/**/*.jade'], function () {
    if (reloading) return
    reloading = true
    setTimeout(function () {
      browserSync.reload()
      reloading = false
    }, BROWSER_SYNC_RELOAD_DELAY)
  })

  gulp.start('watch-semantic')
  gulp.start('browsersync')

  gulp.watch(
    [
      'index.js',
      'gulpfile.js',
      'config.json',
      'server/**/*',
      '!server/views/**/*.jade'
    ],
    ['server'], { cwd: __dirname })
})

// browsersync - watches client files and reloads browser
gulp.task('browsersync', ['server'], function (cb) {
  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync.init({
    proxy: 'http://localhost:' + process.env.PORT,
    port: 3000,
    notify: false,
    logFileChanges: true
  })
  cb()
})

// Live restart on file change
var serverProcess
var starting = false
gulp.task('server', function (cb) {
  if (starting) return

  function fork() {
    console.info('Server %s', serverProcess ? 'restarting' : 'starting...')
    serverProcess = child_process.fork('.')

    serverProcess.once('exit', function (code) {
      if (cb) {
        starting = false
        serverProcess = null
        console.error('\nStart failed with code %d, waiting for file changes', code)
        cb()
        cb = null
      }
    })

    var onRunning = function () {
      serverProcess.removeListener('message', onRunning)
      if (cb) {
        starting = false
        browserSync.reload()
        cb()
        cb = null
      }
    }

    serverProcess.on('message', function (msg) {
      if (msg === 'server:started') onRunning()
    })
  }

  if (!serverProcess) return fork()
  starting = true
  serverProcess.once('exit', fork)
  serverProcess.kill()
})
