import { fetchAuth } from "../../../common/effects";
import { ENDPOINTS } from "./models";
import {
  fetchMerchandiseReturnProposalsFailure,
  fetchMerchandiseReturnProposalsPending,
  fetchMerchandiseReturnProposalsSuccess,
} from "./actions";

export default (dispatch, props) => ({
  fetchMerchandiseReturnProposals: async (params) => {
    try {
      dispatch(fetchMerchandiseReturnProposalsPending());
      const response = await fetchAuth({
        url: ENDPOINTS.apiMerchandiseReturnProposals,
        method: "GET",
        params,
      });
      if (response.data && response.status === 200) {
        dispatch(fetchMerchandiseReturnProposalsSuccess(response.data.data));
      } else {
        dispatch(fetchMerchandiseReturnProposalsFailure("Some thing wrong !"));
      }
    } catch (error) {
      dispatch(
        fetchMerchandiseReturnProposalsFailure(error.response.data?.ApiErr)
      );
    }
  },
  fetchSingleMerchandiseReturnProposals: async (
    merchandiseReturnProposalId
  ) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiMerchandiseReturnProposalsWithParams(
          merchandiseReturnProposalId
        ),
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

  createMerchandiseReturnProposal: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiMerchandiseReturnProposals,
        method: "POST",
        data,
      });
      if (response.data && response.status === 201) {
        return (
          response.data.data || {
            id: 1,
          }
        );
      } else {
        return "Lỗi không xác định !";
      }
    } catch (error) {
      return error?.response?.data;
    }
  },
  editMerchandiseReturnProposal: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiMerchandiseReturnProposalsWithParams(data.id),
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

  addMerchandiseReturnDetails: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiMerchandiseReturnProposalsDetails(
          data.merchandiseReturnProposalId
        ),
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
  deleteMerchandiseReturnDetails: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiDeleteMerchandiseReturnProposalsDetails(
          data.merchandiseReturnProposalId
        ),
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
  editMerchandiseReturnDetails: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiUpdateMerchandiseReturnProposalsDetails(
          data.merchandiseReturnProposalId
        ),
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
