import { normalizeList } from "./utils";

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
  projectId: string,
  query: string,
  page: string,
  perPage: string,
  after?: string
}) => {
  const { projectId, query, perPage, page, after = '' } = params
  const url = `https://cloud.caisy.io/api/v3/e/${projectId}/graphql`;

  const requestedPage = Number.parseInt(params?.['page'] ?? "1")
  const requestedPerPage = Number.parseInt(params?.['perPage'] ?? "10")

  const firstParam = !after ? (requestedPage > 1 ? requestedPage -1 : requestedPage ) * requestedPerPage : requestedPerPage

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: {
        first: firstParam,
        after,
      }
    }),
  })


  if (response.status === 401 || response.status === 403) {
    throw new Error(
      `getEntitiesByPage from caisy auth or permission issue: ${response.statusText}`
    )
  }
  if (response.status !== 200) {
    throw new Error(
      `getEntitiesByPage from caisy - internal error fetching entries from caisy: ${response.statusText}`
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

  if (!json.data) {
    return []
  }

  const { endCursor, hasNextPage } = json.data[Object.keys(json.data)[0]].pageInfo

  // if after is defined, it means we already requested the first items and we just need to return
  // if hasNextPage is false, no need to look for the next page, just return this one for now
  // if requestedPage is 1, no need for the second call
  if (requestedPage === 1 || !hasNextPage || after) {
    return normalizeList(json.data[Object.keys(json.data)[0]], requestedPage.toString())
  }

  return await getEntitiesByPage({
    projectId,
    query,
    perPage,
    page: requestedPage.toString(),
    after: endCursor
  })
}