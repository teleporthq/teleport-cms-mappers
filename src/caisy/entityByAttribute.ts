import { mapResponse } from "./utils";

export const getDataByAttribute = async (params: {
  projectId: string,
  query: string,
  attribute: string
}) => {
  const { projectId, query } = params

  const url = `https://cloud.caisy.io/api/v3/e/${projectId}/graphql`;

  // const variables = paramsVariables.reduce((acc: Record<string, string>, param) => {
  //   acc[param] = params?.[`${param}`] || ''
  //   return acc
  // }, {})

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-caisy-token": process.env.CMS_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: {
        // value: params['name']
        value: params?.[`${attribute}`] || ''
      }
    }),
  })

  return mapResponse(response)
}


