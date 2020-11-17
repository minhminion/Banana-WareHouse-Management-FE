import { DEFAULT_API_URL } from "../../../common/config";

export const MODULE_NAME = "orders";

export const ENDPOINTS = {
  apiOrders: `${DEFAULT_API_URL}/${MODULE_NAME}`,
  apiOrdersWithParams:(ordersId) => `${DEFAULT_API_URL}/${MODULE_NAME}/${ordersId}`,

  apiOrderDetails: (ordersId) => `${DEFAULT_API_URL}/${MODULE_NAME}/${ordersId}/orderDetails`,
  editOrderDetails: (ordersId) => `${DEFAULT_API_URL}/${MODULE_NAME}/${ordersId}/orderDetails/bulkUpdate`,
  deleteOrderDetails: (ordersId) => `${DEFAULT_API_URL}/${MODULE_NAME}/${ordersId}/orderDetails/bulkDelete`
};
