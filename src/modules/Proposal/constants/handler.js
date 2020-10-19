import {
  fetchProposalSuccess,
  fetchProposalFailure,
  fetchProposalPending,
} from "./actions";
import { fetchAuth } from "../../../common/effects";
import { ENDPOINTS } from "./models";

export default (dispatch, props) => ({
  fetchProduct: async (params) => {
    try {
      dispatch(fetchProposalPending());
      setTimeout(() => dispatch(fetchProposalSuccess({})), 2000);
      // const response = await fetchAuth({
      //   url: ENDPOINTS.getProposal,
      //   method: "GET",
      //   params
      // });
      // console.log("======== Bao Minh: response", response);
      // if (response.data && response.status === 200) {
      //   dispatch(fetchProposalSuccess(response.data.data));
      // } else {
      //   dispatch(fetchProposalFailure("Some thing wrong !"));
      // }
    } catch (error) {
      console.log("======== Bao Minh: error", error);
      dispatch(fetchProposalFailure(error.response.data?.ApiErr));
    }
  },
});
