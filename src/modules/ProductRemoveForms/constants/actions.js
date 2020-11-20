import { createAction } from "redux-actions";
import { MODULE_NAME } from "./models";

export const fetchProductRemoveFormsPending = createAction(
  `@${MODULE_NAME}/FETCH_PRODUCT_REMOVE_FORMS_PENDING`
);
export const setEmpty = createAction(`@${MODULE_NAME}/SET_EMPTY`);
export const setFilter = createAction(`@${MODULE_NAME}/SET_FILTER`);
export const resetFilter = createAction(`@${MODULE_NAME}/RESET_FILTER`);
export const fetchProductRemoveFormsSuccess = createAction(
  `@${MODULE_NAME}/FETCH_PRODUCT_REMOVE_FORMS_SUCCESS`
);
export const fetchProductRemoveFormsFailure = createAction(
  `@${MODULE_NAME}/FETCH_PRODUCT_REMOVE_FORMS_FAILURE`
);
