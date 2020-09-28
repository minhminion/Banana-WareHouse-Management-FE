import { createAction } from "redux-actions";
import { MODULE_NAME } from "../../Author/constants/models";

export const fetchMemberPending = createAction(`@${MODULE_NAME}/FETCH_MEMBER_PENDING`);
export const setEmpty = createAction(`@${MODULE_NAME}/SET_EMPTY`);
export const setFilter = createAction(`@${MODULE_NAME}/SET_FILTER`);
export const resetFilter = createAction(`@${MODULE_NAME}/RESET_FILTER`);
export const fetchMemberSuccess  = createAction(`@${MODULE_NAME}/FETCH_MEMBER_SUCCESS`);
export const fetchMemberFailure  = createAction(`@${MODULE_NAME}/FETCH_MEMBER_FAILURE`);
