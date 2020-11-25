import { useSnackbar } from "notistack";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { notifyError } from "../../common/helper";
import handler from "./constants/handler";
import { MODULE_NAME } from "./constants/models";
import UserDetailsForm from "./common/UserDetailsForm";

const CreateUser = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { createUser } = useMemo(() => handler(dispatch, props), [
    dispatch,
    props,
  ]);

  const handleSubmit = async (values) => {
    enqueueSnackbar(`Đang tạo tài khoản mới...`, {
      variant: "info",
      key: `creating-${MODULE_NAME}`,
      persist: true,
      preventDuplicate: true,
    });
    closeSnackbar(`creating-${MODULE_NAME}`);
    const result = await createUser(values);
    if (result.id) {
      history.push(`/${MODULE_NAME}`);
    } else {
      notifyError(enqueueSnackbar, result);
    }
  };

  return (
    <UserDetailsForm onSubmit={handleSubmit} okLabel="Tạo tài khoản mới" />
  );
};

export default CreateUser;
