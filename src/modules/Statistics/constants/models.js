import { DEFAULT_API_URL } from "../../../common/config";

export const MODULE_NAME = "statistics";

export const ENDPOINTS = {
  apiBestSellingProducts: `${DEFAULT_API_URL}/${MODULE_NAME}/bestSellingProducts`,
  apiRevenueAndExpenditure: `${DEFAULT_API_URL}/${MODULE_NAME}/revenueAndExpediture`
};
