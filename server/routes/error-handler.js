
export function handle404 (req, res, next) {
  var err = new Error('404 Not Found')
  err.status = 404
  next(err)
}

export function handleError (IS_DEV) {
  return function (err, req, res, next) {
    // In rare cases when user has been dropped from DB
    if (err && err.name === 'NonExistingUserError') {
      req.logout()
      if (req.sesssion) req.session.destroy()
    }

    res.status(err.status || req.xhr && err.status !== 404 ? 200 : 500)
    if (err.status !== 404) console.error(err, err.stack.split('\n'))
    if (req.xhr) return res.json({ok: false, error: err.message})
    res.render('error', {
      title: err.status === 404 ? 'Not found' : 'Oops!',
      message: err.message,
      error: IS_DEV ? err : null
    })
  }
}
