import {
  getAPIUrlByProjectId,
  handleFetchResponse as checkFetchResponseStatus,
  normalizeItem,
} from './utils'

/**
 * gets and entity by attribute, which can be entity by Id or entity by name, depending on how the url and details page is generated
 */
export const getDataByAttribute = async (params: {
  projectId: string
  query: string
  attribute: string
}) => {
  const { projectId, query, attribute } = params
  const url = getAPIUrlByProjectId(projectId)

  try {
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
          value: params?.[`${attribute}`] ?? '',
        },
      }),
    })

    const responseJSON = await checkFetchResponseStatus(response)

    return normalizeItem(responseJSON)
  } catch (err) {
    throw new Error(err.message)
  }
}
