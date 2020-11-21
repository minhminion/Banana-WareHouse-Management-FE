import { createAction } from "redux-actions";
import { MODULE_NAME } from "./models";

export const fetchStatisticsPending = createAction(`@${MODULE_NAME}/FETCH_STATISTICS_PENDING`);
export const fetchStatisticsSuccess = createAction(`@${MODULE_NAME}/FETCH_STATISTICS_SUCCESS`);
export const fetchStatisticsFailure = createAction(`@${MODULE_NAME}/FETCH_STATISTICS_FAILURE`);
