import { DEFAULT_API_URL } from "../../../common/config";

export const MODULE_NAME = "goodsReceivingOfReturns";

export const ENDPOINTS = {
  apiGoodsReceivingOfReturns: `${DEFAULT_API_URL}/${MODULE_NAME}`,
  apiGoodsReceivingOfReturnsWithParams: (goodsReceivingOfReturnsId) =>
    `${DEFAULT_API_URL}/${MODULE_NAME}/${goodsReceivingOfReturnsId}`,

  apiGoodsReceivingOfReturnsDetails: (goodsReceivingOfReturnsId) =>
    `${DEFAULT_API_URL}/${MODULE_NAME}/${goodsReceivingOfReturnsId}/goodsReceivingOfReturnDetails`,
};
