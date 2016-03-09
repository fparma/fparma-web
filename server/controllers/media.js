import mongoose from 'mongoose'
const Media = mongoose.model('Media')

exports.create = (media, cb) => {
  Media.findOne({url: media.url}, (err, data) => {
    if (err) return cb(err)
    if (data) return cb(new Error('Supplied URL already exists'))
    new Media(media).save(cb)
  })
}

exports.list = (cb) => {
  Media.find({approved: true})
  .sort({'created_at': -1})
  .exec(cb)
}

exports.getOneForApproval = (cb) => {
  Media.findOne({approved: false})
  .sort({'created_at': 1})
  .exec(cb)
}

exports.getAmountUnapproved = cb => {
  Media.count({approved: false}, cb)
}

exports.approve = (id, caption, cb) => {
  let upd = {$set: {approved: true, caption: caption}}
  Media.findOneAndUpdate({_id: id}, upd, cb)
}

exports.reject = (id, cb) => {
  Media.findOneAndRemove({_id: id}, cb)
}
