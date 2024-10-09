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

  let nodeResponse = input.data[Object.keys(input.data)[0]]

  // if item is queried by slug or other custom field, response is received differently then when we're querying by id
  if (nodeResponse?.edges) {
    nodeResponse = nodeResponse.edges.map((e:any) => e.node)?.[0]
  }

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
    return null
  }

  if (typeof input === 'object' && !Object.keys(input).length) {
    return {}
  }

  if (Array.isArray(input)) {
    return input.map((inputArr) => normalizeContent(inputArr))
  }

  if (Object.keys(input._meta || {})?.length) {
    return {...normalizeContent(normaliseObject(input))}
  }

  if (typeof input === 'object' && input.json && input.json.type === 'doc') {
    return resolveRichTextLinkedAssets(input)
  }

  return Object.keys(input).reduce((acc: Record<string, unknown>, key) => {
    const value = input[key]

    if (value === null || value === undefined) {
      acc[key] = null
      return acc
    }

    if (Array.isArray(value)) {
      acc[key] = value.map((item: any[]) => {
        return normalizeContent(item)
      })

      return acc
    }

    if (typeof value === 'object') {
      acc[key] = {...normalizeContent(normaliseObject(value))}
      return acc
    }

    acc[key] = value
    return acc
  }, {})
}

const normaliseObject = (input) => {
  let newData = input

  if (newData?._meta) {
    newData = {
      ...newData,
      ...newData._meta,
    }
    delete newData._meta
  }

  if (newData?.__typename === 'Asset') {
    newData = {
      ...newData,
      ...normalizeAssetData(newData)
    }

    return newData
  }

  if (newData?.__typename && newData.__typename !== 'Asset') {
    newData = {
      // typeId is used by the switch primitive to determine the content/component type of the item
      typeId: newData?.__typename,
      ...newData
    }
  }

  // normalise location data
  if ('latitude' in newData && 'longitude' in newData) {
    newData = {
      lat: newData.latitude,
      lon: newData.longitude,
      address: newData.formattedAddress,
      zoom: newData.zoom,
    }
  }

  return newData
}

export const normalizeAssetData = (input) => {
  return {
    id: input.id,
    name: input.title,
    alt: input.keywords,
    url: input.src,
    assetType: input.originType,
    size: {
      height: input.height,
      width: input.width,
    },
  }
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

export const getAPIUrlByProjectId = (projectId: string) => {
  return `https://cloud.caisy.io/api/v3/e/${projectId}/graphql`
}

export const handleFetchResponse = async (response: Response) => {
  if (response.status === 401 || response.status === 403) {
    throw new Error(
      `Caisy auth or permission issue: ${response.statusText}`
    )
  }
  if (response.status !== 200) {
    throw new Error(
      `Internal error fetching entries from Caisy: ${response.statusText}`
    )
  }

  const json = await response.json()

  if (json.errors) {
    throw new Error(
      `getEntitiesByPage from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        json.errors
      )}`
    )
  }

  return json
}