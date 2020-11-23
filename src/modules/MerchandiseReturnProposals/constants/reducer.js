import { clearAll } from "../../../common/redux/actions/uiActions";
import { handleActions } from "redux-actions";
import * as actions from "./actions";

const initialState = {
  isLoading: false,
  isEmpty: false,
  error: null,
  data: {},
  pagination: {
    page: 1,
    limit: 5,
  },
  filter: {
    isAscending: false,
  },
};

const handler = {
  [clearAll]: (state, action) => ({ ...initialState }),
  // FETCH GOODS RECEIVING NOTES
  [actions.fetchMerchandiseReturnProposalsPending]: (state, action) => ({
    ...state,
    isLoading: true,
  }),
  [actions.fetchMerchandiseReturnProposalsSuccess]: (state, action) => ({
    ...state,
    isLoading: false,
    data: action.payload,
  }),
  [actions.fetchMerchandiseReturnProposalsFailure]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload,
  }),

  [actions.setFilter]: (state, action) => ({
    ...state,
    filter: {
      ...state.filter,
      ...action.payload,
    },
  }),
  [actions.resetFilter]: (state, action) => ({
    ...state,
    filter: initialState.filter,
  }),
};

export default handleActions(handler, initialState);
