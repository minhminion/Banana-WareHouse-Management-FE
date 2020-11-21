import {
  fetchStatisticsPending,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
} from "./actions";
import { fetchAuth } from "../../../common/effects";
import { ENDPOINTS } from "./models";
import { ENUMS } from "../../../common/constants";

export default (dispatch, props) => ({
  getBestSellingProduct: async (params) => {
    const target = "bestSellingProducts";
    try {
      dispatch(
        fetchStatisticsPending({
          target: target,
        })
      );
      const response = await fetchAuth({
        url: ENDPOINTS.apiBestSellingProducts,
        method: "GET",
        params,
      });
      if (response.data && response.status === 200) {
        dispatch(
          fetchStatisticsSuccess({
            target: target,
            data: response.data.data,
          })
        );
      } else {
        dispatch(
          fetchStatisticsFailure({
            target: target,
            data: "Lỗi không xác định",
          })
        );
      }
    } catch (error) {
      dispatch(
        fetchStatisticsFailure({
          target: target,
          data: error.response.data,
        })
      );
    }
  },
  getRevenueAndExpenditure: async (params) => {
    const target = "revenueAndExpenditure";
    try {
      dispatch(
        fetchStatisticsPending({
          target: target,
        })
      );
      const response = await fetchAuth({
        url: ENDPOINTS.apiRevenueAndExpenditure,
        method: "GET",
        params,
      });
      if (response.data && response.status === 200) {
        dispatch(
          fetchStatisticsSuccess({
            target: target,
            data: response.data.data,
          })
        );
      } else {
        dispatch(
          fetchStatisticsFailure({
            target: target,
            data: "Lỗi không xác định",
          })
        );
      }
    } catch (error) {
      dispatch(
        fetchStatisticsFailure({
          target: target,
          data: error.response.data,
        })
      );
    }
  },
});
