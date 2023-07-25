import { getEntitiesData } from "./entities";
import { getDataByAttribute } from "./entityByAttribute";
import { getEntitiesByPage } from "./entitiesByPage";

const getEntities = async (params) => {
  return await getEntitiesData(params)
}

const getEntyByAttribute = async (params) => {
  return await getDataByAttribute(params)
}

const getEntitiesWithPagination = async (params) => {
  return await getEntitiesByPage(params)
}

export default { getEntities, getEntyByAttribute, getEntitiesWithPagination }

