import { createAction } from "redux-actions";
import { MODULE_NAME } from "./models";

export const fetchInventoryRecordFormsPending = createAction(
  `@${MODULE_NAME}/FETCH_INVENTORY_RECORD_FORMS_PENDING`
);
export const setEmpty = createAction(`@${MODULE_NAME}/SET_EMPTY`);
export const setFilter = createAction(`@${MODULE_NAME}/SET_FILTER`);
export const resetFilter = createAction(`@${MODULE_NAME}/RESET_FILTER`);
export const fetchInventoryRecordFormsSuccess = createAction(
  `@${MODULE_NAME}/FETCH_INVENTORY_RECORD_FORMS_SUCCESS`
);
export const fetchInventoryRecordFormsFailure = createAction(
  `@${MODULE_NAME}/FETCH_INVENTORY_RECORD_FORMS_FAILURE`
);
