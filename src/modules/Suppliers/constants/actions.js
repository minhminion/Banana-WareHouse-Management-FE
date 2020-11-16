import { createAction } from "redux-actions";
import { MODULE_NAME } from "./models";

export const fetchSuppliersPending = createAction(`@${MODULE_NAME}/FETCH_SUPPLIERS_PENDING`);
export const setEmpty = createAction(`@${MODULE_NAME}/SET_EMPTY`);
export const setFilter = createAction(`@${MODULE_NAME}/SET_FILTER`);
export const resetFilter = createAction(`@${MODULE_NAME}/RESET_FILTER`);
export const fetchSuppliersSuccess  = createAction(`@${MODULE_NAME}/FETCH_SUPPLIERS_SUCCESS`);
export const fetchSuppliersFailure  = createAction(`@${MODULE_NAME}/FETCH_SUPPLIERS_FAILURE`);
