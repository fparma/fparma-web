var gulp = require('gulp')
var del = require('del')
var minifyCss = require('gulp-minify-css')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var plumber = require('gulp-plumber')
var browserSync = require('browser-sync')
var nodemon = require('gulp-nodemon')
var nconf = require('nconf')

var buildSemantic = require('./client/semantic/tasks/build')
var watchSemantic = require('./client/semantic/tasks/watch')

nconf.env({whitelist: ['PORT']}).file('config.json')
var BROWSER_SYNC_RELOAD_DELAY = 500

var base = {
  client: 'client/',
  dist: 'dist/',
  server: 'server/',
  public: 'public/',
  libs: 'public/vendor/**/*.js'
}

var paths = {
  scripts: ['js/**/*.js'],
  css: 'css/**/*.css',
  semantic: 'semantic/'
}

function checkErr (cb) {
  return function (e) {
    cb()
  }
}

gulp.task('post-install', ['build-semantic', 'build'])
gulp.task('build-semantic', buildSemantic)
gulp.task('watch-semantic', watchSemantic)

gulp.task('clean:dist', function (cb) {
  del(base.dist).then(checkErr(cb))
})

gulp.task('clean:scripts', function (cb) {
  del('js', {cwd: base.public}).then(checkErr(cb))
})

gulp.task('clean:css', function (cb) {
  del(paths.css, {cwd: base.public}).then(checkErr(cb))
})

gulp.task('build', ['build:css', 'build:scripts'])
gulp.task('build:scripts', ['clean:scripts'], function () {
  return gulp.src(paths.scripts, {cwd: base.client})
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(uglify({mangle: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('js', {cwd: base.public}))
})

gulp.task('build:css', ['clean:css'], function () {
  return gulp.src(paths.css, {cwd: base.client})
  .pipe(minifyCss())
  .pipe(gulp.dest('css', {cwd: base.public}))
  .pipe(browserSync.stream())
})

gulp.task('dev', ['build'], function (cb) {
  gulp.watch(paths.scripts, {cwd: base.client} ['build:scripts'])
  gulp.watch(paths.css, {cwd: base.client}, ['build:css'])
  gulp.watch(['public/js/**/*.js', 'server/views/**/*'], browserSync.reload)
  gulp.start('watch-semantic')
  gulp.start('browsersync')
  cb()
})

// browsersync - watches client files and reloads browser
gulp.task('browsersync', ['nodemon'], function (cb) {
  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync.init({
    proxy: 'http://localhost:' + nconf.get('PORT'),
    port: 3000,
    notify: false
  })
  cb()
})

// nodemon - watches server files and restart server on change
gulp.task('nodemon', function (cb) {
  return nodemon({
    script: 'index.js',
    ignore: ['server/views/**/*'],
    // watch core server file(s) that require server restart on change
    watch: ['index.js', 'config.json', 'server/**/*']
  })
  .once('start', function onStart () {
    setTimeout(function () {
      cb()
    }, 5000)
  })
  .on('restart', function onRestart () {
    setTimeout(function reload () {
      browserSync.reload({
        stream: false
      })
    }, BROWSER_SYNC_RELOAD_DELAY)
  })
})
