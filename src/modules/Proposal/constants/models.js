import { DEFAULT_API_URL } from "../../../common/config";

export const MODULE_NAME = "purchaseProposalForms";

export const ENDPOINTS = {
  getProposal: `${DEFAULT_API_URL}/${MODULE_NAME}`,
  getSingleProposal:(proposalId) => `${DEFAULT_API_URL}/${MODULE_NAME}/${proposalId}`,
  addProposalProduct:(proposalId) => `${DEFAULT_API_URL}/${MODULE_NAME}/${proposalId}/purchaseProposalDetails`,
  editProposalProduct:(proposalId) => `${DEFAULT_API_URL}/${MODULE_NAME}/${proposalId}/purchaseProposalDetails/bulkUpdate`,
};
