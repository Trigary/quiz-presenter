export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).catch(reason => {
    console.error('Failed to copy to clipboard', reason)
  })
}
