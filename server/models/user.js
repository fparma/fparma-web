import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    match: [/^[A-Z][A-Z0-9 _-]{2,24}$/i,
      'Username must be between 3-24 characters, start with a letter and can only contain (A-Z, a-z, 0-9, -_ and space)'],
    trim: true
  },
  created_at: {type: Date, default: Date.now},
  steam_id: {type: String, required: true, index: {unique: true}},
  steam_info: {type: Object}
})

mongoose.model('User', UserSchema)
