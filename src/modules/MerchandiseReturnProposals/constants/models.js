import { DEFAULT_API_URL } from "../../../common/config";

export const MODULE_NAME = "merchandiseReturnProposals";

export const ENDPOINTS = {
  apiMerchandiseReturnProposals: `${DEFAULT_API_URL}/${MODULE_NAME}`,
  apiMerchandiseReturnProposalsWithParams: (merchandiseReturnProposalId) =>
    `${DEFAULT_API_URL}/${MODULE_NAME}/${merchandiseReturnProposalId}`,

  apiMerchandiseReturnProposalsDetails: (merchandiseReturnProposalId) =>
    `${DEFAULT_API_URL}/${MODULE_NAME}/${merchandiseReturnProposalId}/merchandiseReturnDetails`,

  apiUpdateMerchandiseReturnProposalsDetails: (merchandiseReturnProposalId) =>
    `${DEFAULT_API_URL}/${MODULE_NAME}/${merchandiseReturnProposalId}/merchandiseReturnDetails/bulkUpdate`,
  apiDeleteMerchandiseReturnProposalsDetails: (merchandiseReturnProposalId) =>
    `${DEFAULT_API_URL}/${MODULE_NAME}/${merchandiseReturnProposalId}/merchandiseReturnDetails/bulkDelete`,
};
