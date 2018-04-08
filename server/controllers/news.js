import mongoose from 'mongoose'
const News = mongoose.model('News')

exports.create = (data, cb) => {
  new News({
    header: data.header,
    text: data.text,
    url: data.url,
    author: data.author,
    meta: data.meta
  })
  .save(e => {
    if (cb) cb(e, e ? null : true)
  })
}

exports.list = (cb) => {
  News.find({})
  .sort({'created_at': -1})
  .limit(10)
  .exec(cb)
}
