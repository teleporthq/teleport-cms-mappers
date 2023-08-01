import { getEntitiesData } from "./entities";
import { getDataByAttribute } from "./entityByAttribute";
import { getEntitiesByPage } from "./entitiesByPage";
import { normalizeItem, normalizeList } from "./utils";

export const getEntities = async (params) => {
  return await getEntitiesData(params)
}

export const getEntityByAttribute = async (params) => {
  return await getDataByAttribute(params)
}

export const getEntitiesWithPagination = async (params) => {
  return await getEntitiesByPage(params)
}

export const normalizeCaisyListContent = (params) => {
  return normalizeList(params)
}

export const normalizeCaisyItemContent = (params) => {
  return normalizeItem(params)
}
