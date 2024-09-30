import { getAPIUrlByProjectId, handleFetchResponse, normalizeList } from './utils'

/**
 * When getting entities by page in caisy we might need to do multiple calls
 * 1. if page == 1 or next page doesn't exist, we just read them from one call
 * 2. if page > 1, we fetch all the entities before the requested page
 * 3. we save the "endCursor", which is the last item identifier from the previous call
 * 4. Then, we request the first "perPage" number of items, after the given endCursor
 * More info on the official doc:
 * https://caisy.io/developer/docs/external-api/queries-pagination#top
 */
export const getEntitiesByPage = async (params: {
  projectId: string
  query: string
  page: string
  perPage: string
  after?: string
}) => {
  // restParams is used for sending the filter parameters for the query
  const { projectId, query, perPage, after = '', page, ...restParams } = params
  const url = getAPIUrlByProjectId(projectId)

  const requestedPage = Number.parseInt(params['page'] ?? '1')
  const requestedPerPage = Number.parseInt(params['perPage'] ?? '10')

  const firstParam = !after
    ? (requestedPage > 1 ? requestedPage - 1 : requestedPage) * requestedPerPage
    : requestedPerPage

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-caisy-token': process.env.CMS_ACCESS_TOKEN,
      'x-caisy-preview': true,
    },
    body: JSON.stringify({
      query,
      variables: {
        first: firstParam,
        after,
        ...restParams,
      },
    }),
  })

  const responseJSON = await handleFetchResponse(response)

  if (!responseJSON.data) {
    return []
  }

  const { endCursor, hasNextPage } = responseJSON.data[Object.keys(responseJSON.data)[0]].pageInfo

  // if after is defined, it means we already requested the first items and we just need to return
  // if hasNextPage is false, no need to look for the next page, just return this one for now
  // if requestedPage is 1, no need for the second call
  if (requestedPage === 1 || !hasNextPage || after) {
    return normalizeList(
      responseJSON.data[Object.keys(responseJSON.data)[0]],
      requestedPage.toString()
    )
  }

  return await getEntitiesByPage({
    projectId,
    query,
    perPage,
    ...restParams,
    page: requestedPage.toString(),
    after: endCursor,
  })
}
