import {
  fetchInventoryRecordFormsFailure,
  fetchInventoryRecordFormsPending,
  fetchInventoryRecordFormsSuccess,
} from "./actions";
import { fetchAuth } from "../../../common/effects";
import { ENDPOINTS } from "./models";

export default (dispatch, props) => ({
  fetchInventoryRecordForms: async (params) => {
    try {
      dispatch(fetchInventoryRecordFormsPending());
      const response = await fetchAuth({
        url: ENDPOINTS.apiInventoryRecordForms,
        method: "GET",
        params,
      });
      if (response.data && response.status === 200) {
        dispatch(fetchInventoryRecordFormsSuccess(response.data.data));
      } else {
        dispatch(fetchInventoryRecordFormsFailure("Some thing wrong !"));
      }
    } catch (error) {
      dispatch(fetchInventoryRecordFormsFailure(error.response.data?.ApiErr));
    }
  },
  fetchSingleInventoryRecordForms: async (suppliersId) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiInventoryRecordFormsWithParams(suppliersId),
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

  createInventoryRecordForm: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiInventoryRecordForms,
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
  editInventoryRecordForm: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiInventoryRecordFormsWithParams(data.id),
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
  deleteInventoryRecordForm: async (suppliersId) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiInventoryRecordFormsWithParams(suppliersId),
        method: "DELETE",
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

  fetchSingleInventoryRecordFormProduct: async (params) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiInventoryRecordFormsDetails(params.supplierId),
        method: "GET",
        params,
      });
      console.log("======== Bao Minh: response", response);
      if (response.data && response.status === 200) {
        return response.data;
      } else {
        return "Lỗi không xác định !";
      }
    } catch (error) {
      return error.response?.data;
    }
  },

  addInventoryRecordDetails: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiInventoryRecordFormsDetails(data.inventoryRecordFormId),
        method: "POST",
        data: data,
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
  updateProductsInventoryRecordForm: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiInventoryRecordFormsDetails(data.inventoryRecordFormId),
        method: "PUT",
        data: data,
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
  deleteProductsInventoryRecordForm: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiInventoryRecordFormsDetails(data.inventoryRecordFormId),
        method: "DELETE",
        data: data,
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
