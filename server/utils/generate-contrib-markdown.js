import fs from 'fs'
import del from 'del'
import path from 'path'
import slug from 'slug'
import hljs from 'highlight.js'

import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }
    return ''
  }
})

const dir = path.join(__dirname, '../views/user-guides/')
const generatedDir = path.join(dir, '_generated')
const guideConfig = require(path.join(dir, 'config.json')).guides

del.sync(generatedDir)
fs.mkdirSync(generatedDir)

const guides = guideConfig.filter(guide => {
  if (guide.url) {
    return true
  }

  try {
    var data = fs.readFileSync(path.join(dir, guide.file), 'utf8')
  } catch (e) {
    console.error(e)
    return false
  }

  let html = md.render(data)
  let fileName = guide.file.substr(0, guide.file.lastIndexOf('.')) + '.html'

  try {
    fs.writeFileSync(path.join(generatedDir, fileName), html)
  } catch (e) {
    console.error(e)
    return false
  }

  return true
})
.map(guide => {
  if (guide.url) {
    return {
      url: guide.url,
      title: guide.menuTitle,
    }
  }

  return {
    url: '/guides/' + slug(guide.menuTitle, { replacement: '-',lower: true }),
    title: guide.menuTitle,
    file: path.join(generatedDir, guide.file.substr(0, guide.file.lastIndexOf('.')) + '.html')
  }
})

module.exports = {
  guides
}
