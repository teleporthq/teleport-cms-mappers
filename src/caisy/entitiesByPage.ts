import { mapListResponse } from "./utils";

export const getEntitiesByPage = async (params: {
  projectId: string,
  query: string,
  page: number,
  perPage: number,
}) => {
  const { projectId, query } = params
  const url = `https://cloud.caisy.io/api/v3/e/${projectId}/graphql`;

  const firstParam = Number.parseInt(params?.['page'] ?? "1") * Number.parseInt(params?.['perPage'] ?? "10")

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
        after: '',
      }
    }),
  })

  if (response.status === 401 || response.status === 403) {
    throw new Error(
      `getEntriesByContentType from caisy auth or permission issue: ${response.statusText}`
    )
  }
  if (response.status !== 200) {
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${response.statusText}`
    )
  }

  const json = await response.json()

  if (json.errors) {
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        json.errors
      )}`
    )
  }

  if (!json.data) {
    return []
  }

  const { endCursor = '' } = json.data[Object.keys(json.data)[0]]?.pageInfo

  const nextResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: {
        first: Number.parseInt(params?.['perPage']) ?? 10,
        after: endCursor
      }
    }),
  })

  return mapListResponse(nextResponse)
}