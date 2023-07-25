import { getEntitiesData } from "./entities";
import { getDataByAttribute } from "./entityByAttribute";
import { getEntitiesByPage } from "./entitiesByPage";

export const getEntities = async (params) => {
  return await getEntitiesData(params)
}

export const getEntyByAttribute = async (params) => {
  return await getDataByAttribute(params)
}

export const getEntitiesWithPagination = async (params) => {
  return await getEntitiesByPage(params)
}
