import fs from 'fs'
import del from 'del'
import path from 'path'
import slug from 'slug'
import hljs from 'highlight.js'

import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
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
const guides = require(path.join(dir, 'config.json')).guides

del.sync(generatedDir + '/**')
fs.mkdirSync(generatedDir)

const okFiles = []
guides.map(v => v.file).forEach((file) => {
  try {
    var data = fs.readFileSync(path.join(dir, file), 'utf8')
  } catch (e) {
    return console.error(e)
  }

  let html = md.render(data)
  let fileName = file.substr(0, file.lastIndexOf('.')) + '.html'

  try {
    fs.writeFileSync(path.join(generatedDir, fileName), html)
  } catch (e) {
    return console.error(e)
  }

  okFiles.push(file)
})

exports.files = guides
.filter(v => okFiles.indexOf(v.file) !== -1)
.sort((a, b) => b.menuPriority - a.menuPriority)
.map(v => {
  let url = slug(v.menuTitle, {
    replacement: '-',
    lower: true
  })

  return {
    url: `/guides/${url}`,
    title: v.menuTitle,
    file: path.join(generatedDir, v.file.substr(0, v.file.lastIndexOf('.')) + '.html')
  }
})
