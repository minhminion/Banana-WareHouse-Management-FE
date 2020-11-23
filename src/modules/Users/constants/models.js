import { DEFAULT_API_URL } from "../../../common/config";

export const MODULE_NAME = "users";

export const ENDPOINTS = {
  apiUsers: `${DEFAULT_API_URL}/${MODULE_NAME}`,
  apiUsersWithParam:(userId) => `${DEFAULT_API_URL}/${MODULE_NAME}/${userId}`,
};
