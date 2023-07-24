
export const mapResponse = async (response: Response) => {
  if (response.status == 401 || response.status == 403) {
    throw new Error(
      `getEntriesByContentType from caisy auth or permission issue: ${response.statusText}`
    );
  }
  if (response.status != 200) {
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${response.statusText}`
    );
  }

  const json = await response.json()

  if (json.errors) {
    throw new Error(
      `getEntriesByContentType from caisy - internal error fetching entries from caisy: ${JSON.stringify(
        json.errors
      )}`
    );
  }

  // get only the nodes from the response
  const nodes = json.data[Object.keys(json.data)[0]].edges.map((e: any) => e.node);
  return nodes
}

export const normalize = (input) => {
  if (Array.isArray(input) && !input.length) {
    return []
  }

  if (input === null || input === undefined) {
    return input
  }

  if (typeof input === 'object' && !Object.keys(input).length) {
    return {}
  }

  if (Array.isArray(input)) {
    return input.map((inputArr) => normalize(inputArr))
  }

  if (input._meta) {
    return {
      ...input,
      ...input._meta,
    }
  }

  return input
}