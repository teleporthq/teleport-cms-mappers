import { normalizeContent } from "./utils";

export const getDataByAttribute = async (params: {
  projectId: string,
  query: string,
  attribute: string
}) => {
  const { projectId, query, attribute } = params
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
        value: params?.[`${attribute}`] ?? ''
      }
    }),
  })

  if (response.status === 401 || response.status === 403) {
    throw new Error(
      `getDataByAttribute from caisy auth or permission issue: ${response.statusText}`
    )
  }
  if (response.status !== 200) {
    throw new Error(
      `getDataByAttribute from caisy - internal error fetching entries from caisy: ${response.statusText}`
    )
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(
      `getDataByAttribute from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        json.errors
      )}`
    )
  }

  if (!json.data) {
    return []
  }

  const nodeResponse = json.data[Object.keys(json.data)[0]]
  return {
    meta: {
      pagination: {}
    },
    data: [normalizeContent(nodeResponse)]
  }
}