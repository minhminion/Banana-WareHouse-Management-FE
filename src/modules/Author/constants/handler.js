import { loadingUser, fetchUserSuccess, setError } from "./actions";
import { fetch } from "../../../common/effects";
import { ENDPOINTS } from "./models";

export default (dispatch, props) => ({
  login: async (data) => {
    try {
      dispatch(loadingUser());
      const response = await fetch({
        url: ENDPOINTS.loginUser,
        method: "POST",
        data,
      });
      if (response.data && response.status === 200) {
        dispatch(fetchUserSuccess(response.data.data));
      } else {
        dispatch(
          setError({
            ApiErr: "Lỗi không xác định",
          })
        );
      }
    } catch (error) {
      console.log("======== Bao Minh: error", error);
      if (error.response) {
        dispatch(setError(error.response.data));
      } else {
        setError({
          ApiErr: "Lỗi không xác định",
        });
      }
    }
  },
});
