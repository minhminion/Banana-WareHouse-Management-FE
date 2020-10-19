import { createAction } from "redux-actions";
import { MODULE_NAME } from "./models";

export const fetchProposalPending = createAction(`@${MODULE_NAME}/FETCH_PROPOSAL_PENDING`);
export const setEmpty = createAction(`@${MODULE_NAME}/SET_EMPTY`);
export const setFilter = createAction(`@${MODULE_NAME}/SET_FILTER`);
export const resetFilter = createAction(`@${MODULE_NAME}/RESET_FILTER`);
export const fetchProposalSuccess  = createAction(`@${MODULE_NAME}/FETCH_PROPOSAL_SUCCESS`);
export const fetchProposalFailure  = createAction(`@${MODULE_NAME}/FETCH_PROPOSAL_FAILURE`);
