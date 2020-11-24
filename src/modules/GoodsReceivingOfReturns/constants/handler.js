import {
  fetchGoodsReceivingOfReturnsFailure,
  fetchGoodsReceivingOfReturnsPending,
  fetchGoodsReceivingOfReturnsSuccess,
} from "./actions";
import { fetchAuth } from "../../../common/effects";
import { ENDPOINTS } from "./models";

export default (dispatch, props) => ({
  fetchGoodsReceivingOfReturns: async (params) => {
    try {
      dispatch(fetchGoodsReceivingOfReturnsPending());
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsReceivingOfReturns,
        method: "GET",
        params,
      });
      if (response.data && response.status === 200) {
        dispatch(fetchGoodsReceivingOfReturnsSuccess(response.data.data));
      } else {
        dispatch(fetchGoodsReceivingOfReturnsFailure("Some thing wrong !"));
      }
    } catch (error) {
      dispatch(fetchGoodsReceivingOfReturnsFailure(error.response.data?.ApiErr));
    }
  },
  fetchSingleGoodsReceivingOfReturns: async (suppliersId) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsReceivingOfReturnsWithParams(suppliersId),
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

  createGoodsReceivingOfReturn: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsReceivingOfReturns,
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
  editGoodsReceivingOfReturn: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsReceivingOfReturnsWithParams(data.id),
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
  deleteGoodsReceivingOfReturn: async (suppliersId) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsReceivingOfReturnsWithParams(suppliersId),
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

  fetchSingleGoodsReceivingOfReturnProduct: async (params) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsReceivingOfReturnsDetails(params.supplierId),
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

  addProductsGoodsReceivingOfReturn: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsReceivingOfReturnsDetails(data.goodsReceivingOfReturnId),
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
  updateProductsGoodsReceivingOfReturn: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsReceivingOfReturnsDetails(data.goodsReceivingOfReturnId),
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
  deleteProductsGoodsReceivingOfReturn: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsReceivingOfReturnsDetails(data.goodsReceivingOfReturnId),
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
