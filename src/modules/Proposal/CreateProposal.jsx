import { useSnackbar } from "notistack";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ProposalDetails from "./common/ProposalDetails";
import handler from "./constants/handler";
import { notifyError } from "../../common/helper";

const CreateProposal = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { createProposal } = useMemo(() => handler(dispatch, props), [
    dispatch,
    props,
  ]);

  const handleSubmit = async (values) => {
    enqueueSnackbar(`Đang tạo phiếu đề nghị...`, {
      variant: "info",
      key: "creating-product",
      persist: true,
      preventDuplicate: true,
    });
    const result = await createProposal(values);
    closeSnackbar("creating-product");
    if (result.id) {
      history.go(-1);
    } else {
      notifyError(enqueueSnackbar, result);
    }
  };

  // return <ProposalDetails onSubmit={handleSubmit} okLabel="Tạo phiếu"/>;
  return <ProposalDetails onSubmit={handleSubmit} okLabel="Tạo phiếu" />;
};

export default CreateProposal;
