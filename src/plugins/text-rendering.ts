import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/common'

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

md.linkify.set({ fuzzyEmail: false }) // disables converting email to link

export default md
