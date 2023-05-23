import { decode } from 'he'

export const normalize = (input) => {
  if (
    input === null ||
    input === undefined ||
    (typeof input === 'object' && !Object.keys(input).length)
  ) {
    return null
  }

  if (Array.isArray(input)) {
    return input.map(normalize)
  }

  const output = { ...input } as Record<string, Record<string, unknown>>
  const existingTitle = output?.title?.rendered
  if (existingTitle) {
    try {
      const newTitle = decode(existingTitle as string)
      output.title.rendered = newTitle || output.title.rendered
    } catch (error) {
      /* empty */
    }
  }

  return output
}
