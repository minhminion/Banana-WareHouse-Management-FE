import { DEFAULT_API_URL } from "../../../common/config";

export const MODULE_NAME = "products";

export const ENDPOINTS = {
  getProducts: `${DEFAULT_API_URL}/${MODULE_NAME}`,
  getSingleProduct:(productId) => `${DEFAULT_API_URL}/${MODULE_NAME}/${productId}`,

  apiProductUnits: `${DEFAULT_API_URL}/productUnits`,
  apiProductUnitsWithParams:(productUnitId) =>  `${DEFAULT_API_URL}/productUnits/${productUnitId}`,

  apiProductCategories: `${DEFAULT_API_URL}/productCategories`,
  apiProductCategoriesWithParams:(productCategoryId) =>  `${DEFAULT_API_URL}/productCategories/${productCategoryId}`,
};
