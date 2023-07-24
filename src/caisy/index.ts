import { getEntitiesData } from "./entities";
import { getDataByAttribute } from "./entityByAttribute";

export const getEntities = async (params) => {
  return getEntitiesData(params)
}

export const getEntyByAttribute = async (
  projectId: string,
  query: string,
  attribute: string
) => {
  return getDataByAttribute({ projectId, query, attribute })
}
