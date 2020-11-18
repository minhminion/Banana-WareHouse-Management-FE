import { DEFAULT_API_URL } from "../../../common/config";

export const MODULE_NAME = "inventoryRecordForms";

export const ENDPOINTS = {
  apiInventoryRecordForms: `${DEFAULT_API_URL}/${MODULE_NAME}`,
  apiInventoryRecordFormsWithParams: (inventoryRecordFormsId) =>
    `${DEFAULT_API_URL}/${MODULE_NAME}/${inventoryRecordFormsId}`,

  apiInventoryRecordFormsDetails: (inventoryRecordFormsId) =>
    `${DEFAULT_API_URL}/${MODULE_NAME}/${inventoryRecordFormsId}/inventoryRecordDetails`,
};
