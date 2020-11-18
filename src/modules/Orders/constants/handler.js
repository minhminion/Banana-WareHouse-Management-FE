import {
  fetchOrdersFailure,
  fetchOrdersPending,
  fetchOrdersSuccess,
} from "./actions";
import { fetchAuth } from "../../../common/effects";
import { ENDPOINTS } from "./models";

export default (dispatch, props) => ({
  fetchOrders: async (params) => {
    try {
      dispatch(fetchOrdersPending());
      const response = await fetchAuth({
        url: ENDPOINTS.apiOrders,
        method: "GET",
        params,
      });
      if (response.data && response.status === 200) {
        dispatch(fetchOrdersSuccess(response.data.data));
      } else {
        dispatch(fetchOrdersFailure("Some thing wrong !"));
      }
    } catch (error) {
      dispatch(fetchOrdersFailure(error.response.data?.ApiErr));
    }
  },
  fetchSingleOrders: async (ordersId) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiOrdersWithParams(ordersId),
        method: "GET",
      });
      if (response.data && response.status === 200) {
        return response.data.data;
      } else {
        return "Lỗi không xác định !";
      }
    } catch (error) {
      return error?.response?.data?.ApiErr;
    }
  },

  createOrder: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiOrders,
        method: "POST",
        data,
      });
      if (response.data && response.status === 201) {
        return response.data.data;
      } else {
        return "Lỗi không xác định !";
      }
    } catch (error) {
      return error?.response?.data;
    }
  },
  editOrder: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiOrdersWithParams(data.id),
        method: "PUT",
        data: {
          id: data.id,
          ...data,
        },
      });
      if (response.status === 204) {
        return data;
      } else {
        return "Lỗi không xác định !";
      }
    } catch (error) {
      return error?.response?.data;
    }
  },

  addOrderDetails: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiOrderDetails(data.orderId),
        method: "POST",
        data,
      });
      if (response.status === 201) {
        return true;
      } else {
        return "Lỗi không xác định !";
      }
    } catch (error) {
      return error?.response?.data;
    }
  },
  deleteOrderDetails: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.deleteOrderDetails(data.orderId),
        method: "DELETE",
        data,
      });
      if (response.status === 204) {
        return true;
      } else {
        return "Lỗi không xác định !";
      }
    } catch (error) {
      return error?.response?.data;
    }
  },
  editOrderDetails: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.editOrderDetails(data.orderId),
        method: "PUT",
        data,
      });
      if (response.status === 204) {
        return true;
      } else {
        return "Lỗi không xác định !";
      }
    } catch (error) {
      return error?.response?.data;
    }
  },
});
