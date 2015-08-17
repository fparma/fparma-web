import mongoose from 'mongoose'

export const USR_REGEXP = /^[A-Z][A-Z0-9 _-]{2,24}$/i
export const USR_ERROR = 'Username must be between 3-24 characters, start with a letter and can only contain (A-Z, a-z, 0-9, -_ and space)'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    match: [USR_REGEXP, USR_ERROR],
    trim: true
  },
  created_at: {type: Date, default: Date.now},
  steam_id: {type: String, required: true, trim: true, index: {unique: true}},
  steam_info: {type: mongoose.Schema.Types.Mixed},
  admin: {type: Boolean, default: false}
})

mongoose.model('User', UserSchema)
