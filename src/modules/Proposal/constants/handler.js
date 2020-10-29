import {
  fetchProposalSuccess,
  fetchProposalFailure,
  fetchProposalPending,
} from "./actions";
import { fetchAuth } from "../../../common/effects";
import { ENDPOINTS } from "./models";
import { ENUMS } from "../../../common/constants";

export default (dispatch, props) => ({
  fetchProposal: async (params) => {
    try {
      dispatch(fetchProposalPending());
      const response = await fetchAuth({
        url: ENDPOINTS.getProposal,
        method: "GET",
        params,
      });
      if (response.data && response.status === 200) {
        dispatch(fetchProposalSuccess(response.data.data));
      } else {
        dispatch(fetchProposalFailure("Some thing wrong !"));
      }
    } catch (error) {
      dispatch(fetchProposalFailure(error.response.data?.ApiErr));
    }
  },
  fetchSingleProposal: async (proposalId) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.getSingleProposal(proposalId),
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

  createProposal: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.getProposal,
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
  editProposal: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.getSingleProposal(data.id),
        method: "PUT",
        data: {
          id: data.id,
          description: data.description,
          deadline: data.deadline,
          status: data.status,
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

  cancelProposal: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.getSingleProposal(data.id),
        method: "PUT",
        data: {
          ...data,
          status: ENUMS.PROPOSAL_STATUS.CANCELED,
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

  // Proposal Product
  addProposalProduct: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.addProposalProduct(data.purchaseProposalFormId),
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
  editProposalProduct: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.editProposalProduct(data.purchaseProposalFormId),
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
});
