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
      dispatch(
        fetchGoodsReceivingNotesSuccess({
          data: generateData(params.page, params.limit),
          currentPage: +params.page,
          pageSize: params.limit,
          totalItems: 30,
          totalPages: 6,
        })
      );
      // const response = await fetchAuth({
      //   url: ENDPOINTS.getGoodsReceivingNotes,
      //   method: "GET",
      //   params,
      // });
      // if (response.data && response.status === 200) {
      //   dispatch(fetchGoodsReceivingNotesSuccess(response.data.data));
      // } else {
      //   dispatch(fetchGoodsReceivingNotesFailure("Some thing wrong !"));
      // }
    } catch (error) {
      dispatch(fetchGoodsReceivingNotesFailure(error.response.data?.ApiErr));
    }
  },
});
