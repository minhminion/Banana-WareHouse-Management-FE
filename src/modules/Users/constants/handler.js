import {
  fetchUsersPending,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "./actions";
import { fetchAuth } from "../../../common/effects";
import { ENDPOINTS } from "./models";

export default (dispatch, props) => ({
  fetchUsers: async (params) => {
    try {
      dispatch(fetchUsersPending());
      const response = await fetchAuth({
        url: ENDPOINTS.apiUsers,
        method: "GET",
        params,
      });
      if (response.data && response.status === 200) {
        dispatch(fetchUsersSuccess(response.data.data));
      } else {
        dispatch(fetchUsersFailure("Some thing wrong !"));
      }
    } catch (error) {
      dispatch(fetchUsersFailure(error.response.data?.ApiErr));
    }
  },

  updateUser: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiUsersWithParam(data.userId),
        method: "PUT",
        data: data,
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
  banUser: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiUsersWithParam("ban/" + data.userId),
        method: "PUT",
        data: data,
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
  deleteUser: async (data) => {
    try {
      const response = await fetchAuth({
        url: ENDPOINTS.apiUsersWithParam(data.userId),
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
});
