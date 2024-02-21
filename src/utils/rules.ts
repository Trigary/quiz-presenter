export const urlRule = (input: string): true | string => {
  const errorText = 'Must be a valid URL'
  try {
    const url = new URL(input)
    return url.protocol === 'http:' || url.protocol === 'https:' || errorText
  } catch (_) {
    return errorText
  }
}
