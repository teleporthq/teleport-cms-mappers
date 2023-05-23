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
  if (output?.title?.rendered) {
    try {
      const parser = new DOMParser()
      const newTitle = parser.parseFromString(output?.title?.rendered || '', 'text/html')
      output.title.rendered = newTitle?.documentElement?.textContent || output.title.rendered
    } catch (error) {
      /* empty */
    }
  }

  return output
}
