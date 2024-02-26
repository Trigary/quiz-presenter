import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/common'
import texmath from 'markdown-it-texmath'

const md = MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
  typographer: false,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }
    return ''
  }
})

md.use(texmath)

md.linkify.set({ fuzzyEmail: false }) // disables converting email to link

export default md
