import { createAction } from "redux-actions";
import { MODULE_NAME } from "./models";

export const fetchGoodsReceivingNotesPending = createAction(
  `@${MODULE_NAME}/FETCH_GOODS_RECEIVING_NOTES_PENDING`
);
export const setEmpty = createAction(`@${MODULE_NAME}/SET_EMPTY`);
export const setFilter = createAction(`@${MODULE_NAME}/SET_FILTER`);
export const resetFilter = createAction(`@${MODULE_NAME}/RESET_FILTER`);
export const fetchGoodsReceivingNotesSuccess = createAction(
  `@${MODULE_NAME}/FETCH_GOODS_RECEIVING_NOTES_SUCCESS`
);
export const fetchGoodsReceivingNotesFailure = createAction(
  `@${MODULE_NAME}/FETCH_GOODS_RECEIVING_NOTES_FAILURE`
);
