import { clearAll } from "../../../common/redux/actions/uiActions";
import { handleActions } from "redux-actions";
import * as actions from "./actions";
import { setCookie } from "../../../common/utils/cookie";

const initialState = {
  isLoading: false,
  isSigned: false,
  error: "",
  token: null,
  exp: null,
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
    const { remember, token, exp, refreshToken, info } = action.payload;
    setCookie("user", JSON.stringify(info || {}));
    setCookie("token", token);
    setCookie("refreshToken", refreshToken);
    setCookie("exp", exp);

    return {
      error: "",
      isSigned: true,
      isLoading: false,
      token: token,
      exp: exp,
      refreshToken: refreshToken,
      info: info,
    };
  },
  [actions.setError]: (state, action) => ({
    ...state,
    error: action.payload,
    isLoading: false,
  }),
};

export default handleActions(handler, initialState);
