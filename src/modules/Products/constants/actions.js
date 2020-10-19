import { createAction } from "redux-actions";
import { MODULE_NAME } from "./models";

export const fetchProductsPending = createAction(`@${MODULE_NAME}/FETCH_PRODUCT_PENDING`);
export const setEmpty = createAction(`@${MODULE_NAME}/SET_EMPTY`);
export const setFilter = createAction(`@${MODULE_NAME}/SET_FILTER`);
export const resetFilter = createAction(`@${MODULE_NAME}/RESET_FILTER`);
export const fetchProductsSuccess  = createAction(`@${MODULE_NAME}/FETCH_PRODUCT_SUCCESS`);
export const fetchProductsFailure  = createAction(`@${MODULE_NAME}/FETCH_PRODUCT_FAILURE`);
