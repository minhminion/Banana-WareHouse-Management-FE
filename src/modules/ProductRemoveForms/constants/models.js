import { DEFAULT_API_URL } from "../../../common/config";

export const MODULE_NAME = "productRemoveForms";

export const ENDPOINTS = {
  apiProductRemoveForms: `${DEFAULT_API_URL}/${MODULE_NAME}`,
  apiProductRemoveFormsWithParams: (productRemoveFormsId) =>
    `${DEFAULT_API_URL}/${MODULE_NAME}/${productRemoveFormsId}`,

  apiProductRemoveFormsDetails: (productRemoveFormsId) =>
    `${DEFAULT_API_URL}/${MODULE_NAME}/${productRemoveFormsId}/productRemoveDetails`,
};
