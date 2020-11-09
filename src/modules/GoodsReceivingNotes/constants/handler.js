import { fetchAuth } from "../../../common/effects";
import { ENDPOINTS } from "./models";
import {
  fetchGoodsReceivingNotesFailure,
  fetchGoodsReceivingNotesPending,
  fetchGoodsReceivingNotesSuccess,
} from "./actions";

const createData = (id, user, status, supplierName, supplierId, createdAt) => {
  return { id, user, status, supplierName, supplierId, createdAt };
};

const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const generateData = (page, numRow) => {
  let data = [];
  for (let i = 1 + numRow * (page - 1); i <= numRow * page; i++) {
    const status = Math.floor(Math.random() * 5) + 1; // 1 -> 5
    const createdAt = randomDate(new Date(2012, 0, 1), new Date());
    data.push(
      createData(
        i,
        {
          email: "phantantrung@gmail.com",
          firstName: "Trung",
          lastName: "Phan Tấn",
          id: "c95c6655-ca3f-4971-ad8f-74b43918f4f4",
        },
        status,
        "Coca Cola",
        Math.floor(Math.random() * 9999) + 1000,
        createdAt
      )
    );
  }
  return data;
};

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


  addGoodsReceivingDetails: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiGoodsReceivingNotesDetails(data.goodsReceivingNoteId),
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
});
