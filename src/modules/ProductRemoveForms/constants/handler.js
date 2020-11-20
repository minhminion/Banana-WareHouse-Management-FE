import {
  fetchProductRemoveFormsFailure,
  fetchProductRemoveFormsPending,
  fetchProductRemoveFormsSuccess,
} from "./actions";
import { fetchAuth } from "../../../common/effects";
import { ENDPOINTS } from "./models";

export default (dispatch, props) => ({
  fetchProductRemoveForms: async (params) => {
    try {
      dispatch(fetchProductRemoveFormsPending());
      const response = await fetchAuth({
        url: ENDPOINTS.apiProductRemoveForms,
        method: "GET",
        params,
      });
      if (response.data && response.status === 200) {
        dispatch(fetchProductRemoveFormsSuccess(response.data.data));
      } else {
        dispatch(fetchProductRemoveFormsFailure("Some thing wrong !"));
      }
    } catch (error) {
      dispatch(fetchProductRemoveFormsFailure(error.response.data?.ApiErr));
    }
  },
  fetchSingleProductRemoveForms: async (suppliersId) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiProductRemoveFormsWithParams(suppliersId),
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

  createProductRemoveForm: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiProductRemoveForms,
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
  editProductRemoveForm: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiProductRemoveFormsWithParams(data.id),
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
  deleteProductRemoveForm: async (suppliersId) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiProductRemoveFormsWithParams(suppliersId),
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

  fetchSingleProductRemoveFormProduct: async (params) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiProductRemoveFormsDetails(params.supplierId),
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
        url: ENDPOINTS.apiProductRemoveFormsDetails(data.productRemoveFormId),
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
  updateProductsProductRemoveForm: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiProductRemoveFormsDetails(data.productRemoveFormId),
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
  deleteProductsProductRemoveForm: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiProductRemoveFormsDetails(data.productRemoveFormId),
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
