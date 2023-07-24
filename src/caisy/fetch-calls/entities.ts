import { mapResponse } from "./utils";

export const getData = async (
  projectId: string,
  query: string,
) => {
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

  return mapResponse(response)
}