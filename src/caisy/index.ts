import { getEntitiesData } from "./entities";
import { getDataByAttribute } from "./entityByAttribute";

export const getEntities = async (params) => {
  return getEntitiesData(params)
}

export const getEntyByAttribute = async (params) => {
  return getDataByAttribute(params)
}
