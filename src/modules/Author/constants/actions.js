import { createAction } from "redux-actions";
import { MODULE_NAME } from "./models";

export const loadingUser = createAction(`@${MODULE_NAME}/LOADING_USER`);
export const setError = createAction(`@${MODULE_NAME}/SET_ERROR`);
export const rememberUser = createAction(`@${MODULE_NAME}/USER_REMEMBER`);
export const clearError = createAction(`@${MODULE_NAME}/CLEAR_ERROR`);
export const setToken = createAction(`@${MODULE_NAME}/SET_TOKEN`);
export const setUserInfo = createAction(`@${MODULE_NAME}/SET_USER_INFO`);
export const setTokenExpire = createAction(`@${MODULE_NAME}/SET_TOKEN_EXP`);
export const fetchUserSuccess = createAction(`@${MODULE_NAME}/LOGIN_SUCCESS`)
