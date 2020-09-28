import { loadingUser, fetchUserSuccess, setError } from "./actions";

export default (dispatch, props) => ({
  login: async (data) => {
    try {
      const { email, password, remember } = data;
      const token = "abcdefTOKEN";
      const info = { id: 1, email: "admin@gmai.com" };
      dispatch(loadingUser());
      setTimeout(
        () => dispatch(fetchUserSuccess({ info, token, remember })),
        3000
      );
    } catch (error) {
      dispatch(setError("Some error !!"));
    }
  },
});
