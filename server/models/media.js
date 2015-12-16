/* The Schema for screenshots, videos etc */

import mongoose from 'mongoose'
const ALLOWED_TYPES = ['image', 'webm', 'youtube']
const REG_YT = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g

const MediaSchema = new mongoose.Schema({
  url: {type: String, required: true},
  added: {type: Date, default: Date.now},
  caption: {type: String, maxlength: 128},
  approved: {type: Boolean, default: false, required: true},
  type: {type: String, required: true, enum: {values: ALLOWED_TYPES, message: 'Invalid media type: `{VALUE}`'}},
  author: {
    show: {type: Boolean, default: false},
    name: String,
    steam_id: String
  }
})

MediaSchema.virtual('is_youtube').get(function () {
  return this.type === 'youtube'
})

MediaSchema.virtual('is_image').get(function () {
  return this.type === 'image'
})

MediaSchema.virtual('is_webm').get(function () {
  return this.type === 'webm'
})

MediaSchema.virtual('youtube_id').get(function () {
  if (!this.is_youtube) return null
  return this.url.replace(REG_YT, '$1').split('&')[0]
})

mongoose.model('Media', MediaSchema)
