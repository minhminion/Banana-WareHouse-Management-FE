import {
  fetchSuppliersFailure,
  fetchSuppliersPending,
  fetchSuppliersSuccess,
} from "./actions";
import { fetchAuth } from "../../../common/effects";
import { ENDPOINTS } from "./models";
import { ENUMS } from "../../../common/constants";

export default (dispatch, props) => ({
  fetchSuppliers: async (params) => {
    try {
      dispatch(fetchSuppliersPending());
      const response = await fetchAuth({
        url: ENDPOINTS.apiSuppliers,
        method: "GET",
        params,
      });
      if (response.data && response.status === 200) {
        dispatch(fetchSuppliersSuccess(response.data.data));
      } else {
        dispatch(fetchSuppliersFailure("Some thing wrong !"));
      }
    } catch (error) {
      dispatch(fetchSuppliersFailure(error.response.data?.ApiErr));
    }
  },
  fetchSingleSuppliers: async (suppliersId) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiSuppliersWithParams(suppliersId),
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

  createSupplier: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiSuppliers,
        method: "POST",
        data,
      });
      if (response.data && response.status === 201) {
        return response.data;
      } else {
        return "Lỗi không xác định !";
      }
    } catch (error) {
      return error?.response?.data;
    }
  },
  editSupplier: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiSuppliersWithParams(data.id),
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
  deleteSupplier: async (suppliersId) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiSuppliersWithParams(suppliersId),
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

  fetchSingleSupplierProduct: async (params) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiSuppliersProducts(params.supplierId),
        method: "GET",
        params,
      });
      console.log('======== Bao Minh: response', response)
      if (response.data && response.status === 200) {
        return response.data
      } else {
        return "Lỗi không xác định !";
      }
    } catch (error) {
      return error.response?.data;
    }
  },
  addProductsSupplier: async (supplierId, products) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiSuppliersProducts(supplierId),
        method: "POST",
        data: {
          supplierId: supplierId,
          products: products
        },
      });
      if (response.status === 201) {
        return true;
      } else {
        return "Lỗi không xác định !";
      }
    } catch (error) {
      return error?.response?.data;
    }
  }
});
