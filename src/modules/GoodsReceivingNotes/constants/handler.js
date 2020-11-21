import { fetchAuth } from "../../../common/effects";
import { ENDPOINTS } from "./models";
import {
  fetchGoodsReceivingNotesFailure,
  fetchGoodsReceivingNotesPending,
  fetchGoodsReceivingNotesSuccess,
} from "./actions";

export default (dispatch, props) => ({
  fetchGoodsReceivingNotes: async (params) => {
    try {
      dispatch(fetchGoodsReceivingNotesPending());
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsReceivingNotes,
        method: "GET",
        params,
      });
      if (response.data && response.status === 200) {
        dispatch(fetchGoodsReceivingNotesSuccess(response.data.data));
      } else {
        dispatch(fetchGoodsReceivingNotesFailure("Some thing wrong !"));
      }
    } catch (error) {
      dispatch(fetchGoodsReceivingNotesFailure(error.response.data?.ApiErr));
    }
  },
  fetchSingleGoodsReceivingNotes: async (goodsReceivingNoteId) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsReceivingNotesWithParams(goodsReceivingNoteId),
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

  createGoodsReceivingNote: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsReceivingNotes,
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
  editGoodsReceivingNote: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsReceivingNotesWithParams(data.id),
        method: "PUT",
        data: {
          id: data.id,
          description: data.description,
          status: data.status,
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


  addGoodsReceivingDetails: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsReceivingNotesDetails(data.goodsReceivingNoteId),
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
  deleteGoodsReceivingDetails: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiDeleteGoodsReceivingNotesDetails(data.goodsReceivingNoteId),
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
  editGoodsReceivingDetails: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiUpdateGoodsReceivingNotesDetails(data.goodsReceivingNoteId),
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
