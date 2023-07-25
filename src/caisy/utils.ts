
export const mapResponse = async (response: Response) => {
  if (response.status == 401 || response.status == 403) {
    throw new Error(
      `getEntriesByContentType from caisy auth or permission issue: ${response.statusText}`
    );
  }
  if (response.status != 200) {
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${response.statusText}`
    );
  }

  const json = await response.json()

  if (json.errors) {
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        json.errors
      )}`
    );
  }

  // get only the nodes from the response
  const nodes = json.data[Object.keys(json.data)[0]].edges.map((e: any) => e.node);
  return nodes
}

export const normalize = (input) => {
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
    return input.map((inputArr) => normalize(inputArr))
  }

  if (typeof input === 'object' && input.json && input.json.type === 'doc') {
    return resolveRichTextLinkedAssets(input.json)
  }

  return Object.keys(input).reduce((acc, key) => {
    if (Array.isArray(input[key])) {
      acc[key] = input[key].map((item) => {
        return normalize(item)
      })

      return acc
    }

    if (typeof input[key] === 'object') {
      acc[key] = { ...normalize(input[key]) }

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