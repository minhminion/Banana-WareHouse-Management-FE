import { DEFAULT_API_URL } from "../../../common/config";

export const MODULE_NAME = "goodsReceivingNotes";

export const ENDPOINTS = {
  apiGoodsReceivingNotes: `${DEFAULT_API_URL}/${MODULE_NAME}`,
  apiGoodsReceivingNotesWithParams: (goodsReceivingNoteId) =>
    `${DEFAULT_API_URL}/${MODULE_NAME}/${goodsReceivingNoteId}`,

  apiGoodsReceivingNotesDetails: (goodsReceivingNoteId) =>
    `${DEFAULT_API_URL}/${MODULE_NAME}/${goodsReceivingNoteId}/goodsReceivingDetails`,

  apiUpdateGoodsReceivingNotesDetails: (goodsReceivingNoteId) =>
    `${DEFAULT_API_URL}/${MODULE_NAME}/${goodsReceivingNoteId}/goodsReceivingDetails/bulkUpdate`,
  apiDeleteGoodsReceivingNotesDetails: (goodsReceivingNoteId) =>
    `${DEFAULT_API_URL}/${MODULE_NAME}/${goodsReceivingNoteId}/goodsReceivingDetails/bulkDelete`,
};
