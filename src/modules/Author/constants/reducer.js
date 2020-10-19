import { clearAll } from "../../../common/redux/actions/uiActions";
import { handleActions } from "redux-actions";
import * as actions from "./actions";
import { setCookie } from "../../../common/utils/cookie";
import jwt_decode from "jwt-decode";

const initialState = {
  isLoading: false,
  isSigned: false,
  error: "",
  token: null,
  exp: null,
  roleName: "",
  refreshToken: null,
  info: {},
};

const handler = {
  [clearAll]: (state, action) => {
    setCookie("user", "");
    setCookie("token", "");
    setCookie("refreshToken", "");
    setCookie("exp", "");
    return { ...initialState };
  },
  [actions.loadingUser]: (state, action) => ({
    ...state,
    isLoading: true,
  }),
  [actions.fetchUserSuccess]: (state, action) => {
    const { token, tokenExpireTime, refreshToken, userResponse } = action.payload;
    setCookie("user", JSON.stringify(userResponse || {}));
    setCookie("token", token);
    setCookie("refreshToken", refreshToken);
    setCookie("exp", tokenExpireTime);

    return {
      error: "",
      isSigned: true,
      isLoading: false,
      token: token,
      exp: tokenExpireTime,
      refreshToken: refreshToken,
      roleName: jwt_decode(token)?.role,
      info: userResponse,
    };
  },
  [actions.setError]: (state, action) => ({
    ...state,
    error: action.payload,
    isLoading: false,
  }),
};

export default handleActions(handler, initialState);
