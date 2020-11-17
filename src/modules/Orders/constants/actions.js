import { createAction } from "redux-actions";
import { MODULE_NAME } from "./models";

export const fetchOrdersPending = createAction(`@${MODULE_NAME}/FETCH_ORDERS_PENDING`);
export const setEmpty = createAction(`@${MODULE_NAME}/SET_EMPTY`);
export const setFilter = createAction(`@${MODULE_NAME}/SET_FILTER`);
export const resetFilter = createAction(`@${MODULE_NAME}/RESET_FILTER`);
export const fetchOrdersSuccess  = createAction(`@${MODULE_NAME}/FETCH_ORDERS_SUCCESS`);
export const fetchOrdersFailure  = createAction(`@${MODULE_NAME}/FETCH_ORDERS_FAILURE`);
