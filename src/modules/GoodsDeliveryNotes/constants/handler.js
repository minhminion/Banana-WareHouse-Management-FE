import { fetchAuth } from "../../../common/effects";
import { ENDPOINTS } from "./models";
import {
  fetchGoodsDeliveryNotesFailure,
  fetchGoodsDeliveryNotesPending,
  fetchGoodsDeliveryNotesSuccess,
} from "./actions";

export default (dispatch, props) => ({
  fetchGoodsDeliveryNotes: async (params) => {
    try {
      dispatch(fetchGoodsDeliveryNotesPending());
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsDeliveryNotes,
        method: "GET",
        params,
      });
      if (response.data && response.status === 200) {
        dispatch(fetchGoodsDeliveryNotesSuccess(response.data.data));
      } else {
        dispatch(fetchGoodsDeliveryNotesFailure("Some thing wrong !"));
      }
    } catch (error) {
      dispatch(fetchGoodsDeliveryNotesFailure(error.response.data?.ApiErr));
    }
  },
  fetchSingleGoodsDeliveryNotes: async (goodsDeliveryNoteId) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsDeliveryNotesWithParams(goodsDeliveryNoteId),
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

  createGoodsDeliveryNote: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsDeliveryNotes,
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
  editGoodsDeliveryNote: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsDeliveryNotesWithParams(data.id),
        method: "PUT",
        data: {
          id: data.id,
          description: data.description,
          status: data.status,
          supplierId: data.supplierId,
          supplierName: data.supplierName,
          ...(data.exceptionReason
            ? { exceptionReason: data.exceptionReason }
            : {}),
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


  addGoodsDeliveryDetails: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsDeliveryNotesDetails(data.goodsDeliveryNoteId),
        method: "POST",
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
  deleteGoodsDeliveryDetails: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiDeleteGoodsDeliveryNotesDetails(data.goodsDeliveryNoteId),
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
  editGoodsDeliveryDetails: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiUpdateGoodsDeliveryNotesDetails(data.goodsDeliveryNoteId),
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
