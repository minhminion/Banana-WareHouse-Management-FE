import { createAction } from "redux-actions";
import { MODULE_NAME } from "./models";

export const fetchMerchandiseReturnProposalsPending = createAction(
  `@${MODULE_NAME}/FETCH_MERCHANDISE_RETURN_PROPOSAL_PENDING`
);
export const setEmpty = createAction(`@${MODULE_NAME}/SET_EMPTY`);
export const setFilter = createAction(`@${MODULE_NAME}/SET_FILTER`);
export const resetFilter = createAction(`@${MODULE_NAME}/RESET_FILTER`);
export const fetchMerchandiseReturnProposalsSuccess = createAction(
  `@${MODULE_NAME}/FETCH_MERCHANDISE_RETURN_PROPOSAL_SUCCESS`
);
export const fetchMerchandiseReturnProposalsFailure = createAction(
  `@${MODULE_NAME}/FETCH_MERCHANDISE_RETURN_PROPOSAL_FAILURE`
);
