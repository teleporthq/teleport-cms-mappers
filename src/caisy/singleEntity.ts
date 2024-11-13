import { getAPIUrlByProjectId, handleFetchResponse, normalizeList } from './utils'

export const getSingleEntity = async (params: { projectId: string; query: string }) => {
  const { projectId, query, ...restParams } = params
  const url = getAPIUrlByProjectId(projectId)

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-caisy-token': process.env.CMS_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: {
        ...restParams,
      },
    }),
  })

  const responseJSON = await handleFetchResponse(response)
  const responseData = responseJSON.data[Object.keys(responseJSON.data)[0]]

  return normalizeSingleTypeAsList(responseData)
}

export const normalizeSingleTypeAsList = (input: any) => {
  // here we are builing the response similar to a get list of entities response, in order to use the same normalize function
  const responseData = {
    pageInfo: {},
    edges: [
      {
        node: { ...input },
      },
    ],
  }

  return normalizeList(responseData)
}
