import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { notifyError } from "../../common/helper";
import GoodsReceivingNoteDetails from "./common/GoodsReceivingNoteDetails";
import proposalHandler from "../Proposal/constants/handler";
import suppliersHandler from "../Suppliers/constants/handler";
import handler from "./constants/handler";

const CreateGoodsReceivingNote = (props) => {
  const { purchaseProposalFormId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [proposalDetails, setProposalDetails] = useState([]);

  const { fetchSingleProposal } = useMemo(
    () => proposalHandler(dispatch, props),
    [dispatch, props]
  );
  const { fetchSuppliers } = useMemo(() => suppliersHandler(dispatch, props), [
    dispatch,
    props,
  ]);
  const { createGoodsReceivingNote } = useMemo(() => handler(dispatch, props), [
    dispatch,
    props,
  ]);

  useEffect(() => {
    getProposal(purchaseProposalFormId);
  }, [purchaseProposalFormId]);

  useEffect(() => {
    fetchSuppliers()
  },[])

  const handleSubmit = async (values) => {
    enqueueSnackbar(`Đang tạo phiếu nhập hàng...`, {
      variant: "info",
      key: "creating-goods-receiving-note",
      persist: true,
      preventDuplicate: true,
    });
    const result = await createGoodsReceivingNote({
      ...values,
      purchaseProposalFormId: +purchaseProposalFormId,
    });
    closeSnackbar("creating-goods-receiving-note");
    if (result.id) {
      history.push("/goods-receiving-notes");
    } else {
      notifyError(enqueueSnackbar, result);
    }
  };

  const getProposal = useCallback(
    async (purchaseProposalFormId) => {
      const result = await fetchSingleProposal(purchaseProposalFormId);
      if (result) {
        setProposalDetails(
          result.purchaseProposalDetails.map((item) => item.productId)
        );
      } else {
        history.push("/404");
      }
    },
    [fetchSingleProposal, history]
  );

  return (
    <GoodsReceivingNoteDetails
      onSubmit={handleSubmit}
      okLabel="Tạo phiếu"
      proposalDetails={proposalDetails}
    />
  );
};

export default CreateGoodsReceivingNote;
