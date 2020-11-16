import { DEFAULT_API_URL } from "../../../common/config";

export const MODULE_NAME = "suppliers";

export const ENDPOINTS = {
  apiSuppliers: `${DEFAULT_API_URL}/${MODULE_NAME}`,
  apiSuppliersWithParams:(suppliersId) => `${DEFAULT_API_URL}/${MODULE_NAME}/${suppliersId}`,

  apiSuppliersProducts:(suppliersId) => `${DEFAULT_API_URL}/${MODULE_NAME}/${suppliersId}/products`,

};
