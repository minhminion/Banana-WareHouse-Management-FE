import {
  fetchMemberPending,
  fetchMemberSuccess,
  fetchMemberFailure,
} from "./actions";
import { fetchLoading, loading, loadingProcess } from "../../../common/effects";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default (dispatch, props) => ({
  fetchMember: async (params) => {
    try {
      await loadingProcess(
        () => wait(4000),
        () => dispatch(fetchMemberSuccess())
      );
    } catch (error) {
      console.log("======== Bao Minh: error", error);
      dispatch(fetchMemberFailure(error.message));
    }
  },
});
