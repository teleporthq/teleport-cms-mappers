export const normalize = (input): {
  meta: {
    pagination?: {
      total: number
      page: number
      hasNextPage: boolean
      hasPrevPage: boolean
    }
  },
  data: Array<unknown> | unknown
} => {
  let currentPage = parseInt(input.page)
  if (!currentPage || isNaN(currentPage)) {
    currentPage = 1
  }

  const hasNextPage = input.pageInfo?.hasNextPage ?? false
  const hasPrevPage = input.pageInfo?.hasPreviousPage ?? false

  const nodes = input.edges.map((e:any) => e.node)

  return {
    meta: {
      pagination: {
        total: nodes.length,
        hasNextPage,
        hasPrevPage,
        page: currentPage,
      },
    },
    data: normalizeContent(nodes),
  }
}

export const normalizeContent = (input) => {
  if (Array.isArray(input) && !input.length) {
    return []
  }

  if (input === null || input === undefined) {
    return input
  }

  if (typeof input === 'object' && !Object.keys(input).length) {
    return {}
  }

  if (Array.isArray(input)) {
    return input.map((inputArr) => normalizeContent(inputArr))
  }

  if (typeof input === 'object' && input.json && input.json.type === 'doc') {
    return resolveRichTextLinkedAssets(input)
  }

  return Object.keys(input).reduce((acc, key) => {
    if (Array.isArray(input[key])) {
      acc[key] = input[key].map((item) => {
        return normalizeContent(item)
      })

      return acc
    }

    if (typeof input[key] === 'object') {
      acc[key] = { ...normalizeContent(input[key]) }

      return acc
    }

    acc[key] = input[key]
    return acc
  }, {})
}

const resolveRichTextLinkedAssets = (richTextData: {
  connections?: Record<string, unknown>[]
  json:
    | {
        content: {
          attrs: Record<string, unknown>
          type: string
        }[]
        type: 'string'
      }
    | string
}) => {
  if (!richTextData.connections) {
    return richTextData.json
  }
  if (!richTextData.json || typeof richTextData.json === 'string') {
    return ''
  }

  const resolvedContent = richTextData.json.content.map((node) => {
    if (node.type !== 'documentLink') {
      return node
    }

    if (!richTextData.connections) {
      return node
    }
    // TODO: ? can I also have linked entries, to handle in v2
    const linkedAssetAttrs = richTextData.connections.find(
      (connection) => connection.id === node.attrs.documentId
    )
    if (linkedAssetAttrs) {
      node.attrs = {
        ...node.attrs,
        src: linkedAssetAttrs.src,
        title: linkedAssetAttrs.title,
      }
    }

    return node
  })

  return {
    content: resolvedContent,
    type: richTextData.json.type,
  }
}