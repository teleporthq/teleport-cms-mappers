import { getAPIUrlByProjectId, handleFetchResponse, normalizeList } from "./utils";

export const getEntitiesData = async (params: {
  projectId: string,
  query: string,
}
) => {
  const { projectId, query } = params
  const url = getAPIUrlByProjectId(projectId)

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
    }),
  })

  const responseJSON = await handleFetchResponse(response)
  return normalizeList(responseJSON.data[Object.keys(responseJSON.data)[0]])
}