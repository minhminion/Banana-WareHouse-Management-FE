import { clearAll } from "../../../common/redux/actions/uiActions";
import { handleActions } from "redux-actions";
import {
  fetchStatisticsFailure,
  fetchStatisticsPending,
  fetchStatisticsSuccess,
} from "./actions";

const initialState = {
  bestSellingProducts: {
    isLoading: false,
    data: [],
  },
  revenueAndExpenditure: {
    isLoading: false,
    data: [],
  },
  exportAndImport: {
    isLoading: false,
    data: [],
  },
};

const handler = {
  [clearAll]: (state, action) => ({ ...initialState }),

  [fetchStatisticsPending]: (state, action) => {
    const { target } = action.payload;
    if (!target) return state;
    return {
      ...state,
      [target]: {
        ...state[target],
        isLoading: true,
      },
    };
  },
  [fetchStatisticsSuccess]: (state, action) => {
    const { target, data } = action.payload;
    if (!target) return state;
    return {
      ...state,
      [target]: {
        ...state[target],
        isLoading: false,
        data: data,
      },
    };
  },
  [fetchStatisticsFailure]: (state, action) => {
    const { target, data } = action.payload;
    if (!target) return state;
    return {
      ...state,
      [target]: {
        ...state[target],
        isLoading: false,
        error: data,
      },
    };
  },
};

export default handleActions(handler, initialState);
