import { mapListResponse } from "./utils";

export const getEntitiesData = async (params: {
  projectId: string,
  query: string,
}
) => {
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
    }),
  })

  return mapListResponse(response)
}