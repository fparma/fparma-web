import moment from 'moment'

exports.formatUtc = isoDate => moment.utc(isoDate).format('YYYY-MM-DD, HH:mm:ss')

exports.fromNow = isoDate => moment.utc(isoDate).fromNow()

exports.secondsToHHMMSS = sec => {
  let d = parseInt(sec, 10)
  if (isNaN(d)) return null
  let h = Math.floor(d / 3600)
  let m = Math.floor(d % 3600 / 60)
  let s = Math.floor(d % 3600 % 60)
  return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
}
