export const parseJSON = (text: string): any => {
  try {
    return JSON.parse(text)
  } catch (err) {
    return null
  }
}
