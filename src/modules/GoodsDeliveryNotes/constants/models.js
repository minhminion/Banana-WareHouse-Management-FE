import { DEFAULT_API_URL } from "../../../common/config";

export const MODULE_NAME = "goodsDeliveryNotes";

export const ENDPOINTS = {
  apiGoodsDeliveryNotes: `${DEFAULT_API_URL}/${MODULE_NAME}`,
  apiGoodsDeliveryNotesWithParams: (goodsDeliveryNoteId) =>
    `${DEFAULT_API_URL}/${MODULE_NAME}/${goodsDeliveryNoteId}`,

  apiGoodsDeliveryNotesDetails: (goodsDeliveryNoteId) =>
    `${DEFAULT_API_URL}/${MODULE_NAME}/${goodsDeliveryNoteId}/goodsDeliveryDetails`,

  apiUpdateGoodsDeliveryNotesDetails: (goodsDeliveryNoteId) =>
    `${DEFAULT_API_URL}/${MODULE_NAME}/${goodsDeliveryNoteId}/goodsDeliveryDetails/bulkUpdate`,
  apiDeleteGoodsDeliveryNotesDetails: (goodsDeliveryNoteId) =>
    `${DEFAULT_API_URL}/${MODULE_NAME}/${goodsDeliveryNoteId}/goodsDeliveryDetails/bulkDelete`,
};
