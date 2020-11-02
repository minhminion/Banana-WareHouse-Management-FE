import React, { useMemo, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import handler from "./constants/handler";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import ProposalDetails from "./common/ProposalDetails";
import { notifyError } from "../../common/helper";
import { ENUMS } from "../../common/constants";

const SingleProposalDetails = (props) => {
  const { isEdit = false } = props;
  const { purchaseProposalFormId } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    fetchSingleProposal,
    editProposal,
    addProposalProduct,
    deleteProposalProduct,
    editProposalProduct,
  } = useMemo(() => handler(dispatch, props), [dispatch, props]);

  const getProposal = useCallback(
    async (purchaseProposalFormId) => {
      const result = await fetchSingleProposal(purchaseProposalFormId);
      if (result) {
        setInitialValues(result);
      } else {
        history.push("/404");
      }
    },
    [fetchSingleProposal, history, setInitialValues]
  );

  useEffect(() => {
    getProposal(purchaseProposalFormId);
  }, [purchaseProposalFormId]);

  const handleEditProposal = async (values) => {
    enqueueSnackbar(`Đang cập nhật sản phẩm...`, {
      variant: "info",
      key: "updating-product",
      persist: true,
      preventDuplicate: true,
    });
    const result = await editProposal({
      ...values,
      id: parseInt(purchaseProposalFormId),
    });
    await updateProductUnit(values.purchaseProposalDetails);
    closeSnackbar("updating-product");
    if (result.id) {
      enqueueSnackbar("Cập nhật thành công !", {
        variant: "success",
      });
      getProposal(purchaseProposalFormId);
    } else {
      notifyError(enqueueSnackbar, result);
    }
  };

  const updateProductUnit = async (purchaseProposalDetails = []) => {
    const purchaseProposalId = parseInt(purchaseProposalFormId);
    let createProposal = [];
    let updateProposal = [];
    let deleteProposal = [];

    purchaseProposalDetails.forEach((product) => {
      switch (product.action) {
        case "created":
          createProposal.push(product);
          break;
        case "updated":
          updateProposal.push(product);
          break;
        case "deleted":
          deleteProposal.push(product);
          break;
        default:
          break;
      }
    });

    if (createProposal.length > 0) {
      await addProposalProduct({
        purchaseProposalFormId: purchaseProposalId,
        purchaseProposalDetails: [...createProposal],
      });
    }

    // Delete Proposal Products
    if (deleteProposal.length > 0) {
      await deleteProposalProduct({
        purchaseProposalFormId: purchaseProposalId,
        purchaseProposalDetailIds: [
          ...deleteProposal.map((product) => product.id),
        ],
      });
    }

    // Update Proposal Products
    if (updateProposal.length > 0) {
      await editProposalProduct({
        purchaseProposalFormId: purchaseProposalId,
        purchaseProposalDetails: [...updateProposal],
      });
    }
  };

  return initialValues?.id ? (
    <ProposalDetails
      initialValues={{
        ...initialValues,
        ...initialValues.product,
      }}
      isEdit={
        isEdit &&
        (initialValues?.status === ENUMS.PROPOSAL_STATUS.NEW ||
          initialValues?.status === ENUMS.PROPOSAL_STATUS.PROCESSING)
      }
      onSubmit={(values) => isEdit && handleEditProposal(values)}
    />
  ) : (
    <h1>Loading</h1>
  );
};

export default SingleProposalDetails;
