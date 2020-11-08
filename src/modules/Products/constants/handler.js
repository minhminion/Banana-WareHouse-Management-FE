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
      const response = await fetchAuth({
        url: ENDPOINTS.getProducts,
        method: "GET",
        params: {
          ...params,
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
        url: ENDPOINTS.apiProductCategories,
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
        data,
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

  // Product Categories
  getProductCategories: async () => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiProductCategories,
        method: "GET",
      });
      if (response.data && response.status === 200) {
        return response.data.data;
      } else {
        return "Lỗi không xác định !";
      }
    } catch (error) {
      return error?.response?.data;
    }
  },
  addProductCategory: async (categoryName) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiProductCategories,
        method: "POST",
        data: {
          name: categoryName
        },
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
  deleteProductCategory: async (categoryId) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiProductCategoriesWithParams(categoryId),
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
  editProductCategory: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiProductCategoriesWithParams(data.id),
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
