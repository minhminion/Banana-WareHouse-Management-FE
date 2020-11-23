import { createAction } from "redux-actions";
import { MODULE_NAME } from "./models";

export const fetchUsersPending = createAction(`@${MODULE_NAME}/FETCH_USERS_PENDING`);
export const fetchUsersSuccess = createAction(`@${MODULE_NAME}/FETCH_USERS_SUCCESS`);
export const fetchUsersFailure = createAction(`@${MODULE_NAME}/FETCH_USERS_FAILURE`);
export const setEmpty = createAction(`@${MODULE_NAME}/SET_EMPTY`);
export const setFilter = createAction(`@${MODULE_NAME}/SET_FILTER`);
export const resetFilter = createAction(`@${MODULE_NAME}/RESET_FILTER`);