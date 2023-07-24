import { mapResponse } from "./utils";

export const getEntitiesByPage = async (params: {
  projectId: string,
  query: string,
}) => {
  const { projectId, query } = params
  const url = `https://cloud.caisy.io/api/v3/e/${projectId}/graphql`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: {
        first: 30,
        // first: params['page'] * params['itemPerPage']
      }
    }),
  })

  if (response.status == 401 || response.status == 403) {
    throw new Error(
      `getEntriesByContentType from caisy auth or permission issue: ${response.statusText}`
    )
  }
  if (response.status != 200) {
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${response.statusText}`
    )
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        json.errors
      )}`
    )
  }

  const { endCursor, hasNextPage } = json.data[Object.keys(json.data)[0]].pageInfo

  if (!hasNextPage) return {}

  const nextResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: {
        first: 10,
        // first: params[itemPerPage],
        after: endCursor
      }
    }),
  })

  return mapResponse(nextResponse)
}