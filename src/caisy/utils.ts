export const normalizeList = (input, page?: string): {
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
  let currentPage = page ? parseInt(page) : 1

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

export const normalizeItem = (input: Record<string, unknown>) => {
  if (!input.data || !Object.keys(input.data).length) {
    return {
      meta: {
        pagination: {}
      },
      data: []
    }
  }

  const nodeResponse = input.data[Object.keys(input.data)[0]]
  return {
    meta: {
      pagination: {}
    },
    data: [normalizeContent(nodeResponse)]
  }
}

const normalizeContent = (input: any) => {
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

  return Object.keys(input).reduce((acc: Record<string, unknown>, key) => {
    if (Array.isArray(input[key])) {
      acc[key] = input[key].map((item: any[]) => {
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
    // TODO: Linked entries are not handled for now
    const linkedAssetAttrs = richTextData.connections.find(
      (connection) => connection?.__typename == "Asset" && connection.id === node.attrs.documentId
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