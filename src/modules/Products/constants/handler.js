import {
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductsPending,
} from "./actions";
import { fetchAuth } from "../../../common/effects";
import { ENDPOINTS } from "./models";

export default (dispatch, props) => ({
  fetchProduct: async (params) => {
    try {
      dispatch(fetchProductsPending());
      // setTimeout(() => dispatch(fetchProductsSuccess({})), 2000);
      const response = await fetchAuth({
        url: ENDPOINTS.getProducts,
        method: "GET",
        params: {
          ...params,
          // "filters[status]": 1,
          // "filterConditions[status]": "=",
        },
      });
      if (response.data && response.status === 200) {
        dispatch(fetchProductsSuccess(response.data.data));
      } else {
        dispatch(fetchProductsFailure("Lỗi không xác định !"));
      }
    } catch (error) {
      dispatch(fetchProductsFailure(error?.response?.data?.ApiErr));
    }
  },
  fetchSingleProduct: async (productId) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.getSingleProduct(productId),
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

  createProduct: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.getProducts,
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
  editProduct: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.getSingleProduct(data.id),
        method: "PUT",
        data,
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

  // Product Unit
  addProductUnit: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiProductUnits,
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
  deleteProductUnit: async (productUnitId) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiProductUnitsWithParams(productUnitId),
        method: "DELETE",
      });
      if (response.data && response.status === 204) {
        return true;
      } else {
        return "Lỗi không xác định !";
      }
    } catch (error) {
      return error?.response?.data;
    }
  },
  editProductUnit: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiProductUnitsWithParams(data.id),
        method: "PUT",
        data
      });
      if (response.data && response.status === 201) {
        return true;
      } else {
        return "Lỗi không xác định !";
      }
    } catch (error) {
      return error?.response?.data;
    }
  },
});
