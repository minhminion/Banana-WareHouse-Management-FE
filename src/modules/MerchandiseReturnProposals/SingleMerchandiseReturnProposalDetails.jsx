import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ENUMS } from "../../common/constants";
import MerchandiseReturnProposalDetails from "./common/MerchandiseReturnProposalDetails";
import goodsDeliveryNotesHandler from "../GoodsDeliveryNotes/constants/handler";
import handler from "./constants/handler";
import { notifyError } from "../../common/helper";
import { MODULE_NAME } from "./constants/models";

const SingleMerchandiseReturnProposalDetails = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isEdit = false } = props;
  const { merchandiseReturnProposalId } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [goodsDeliveryNoteDetails, setGoodsDeliveryNoteDetails] = useState([]);

  const { fetchSingleGoodsDeliveryNotes } = useMemo(
    () => goodsDeliveryNotesHandler(dispatch, props),
    [dispatch, props]
  );
  const {
    fetchSingleMerchandiseReturnProposals,
    editMerchandiseReturnProposal,
    addMerchandiseReturnDetails,
    deleteMerchandiseReturnDetails,
    editMerchandiseReturnDetails,
  } = useMemo(() => handler(dispatch, props), [dispatch, props]);

  const getSingleMerchandiseReturnProposals = useCallback(
    async (merchandiseReturnProposalId) => {
      const result = await fetchSingleMerchandiseReturnProposals(
        merchandiseReturnProposalId
      );
      if (result) {
        setInitialValues(result);
      } else {
        history.push("/404");
      }
    },
    [fetchSingleMerchandiseReturnProposals, history, setInitialValues]
  );

  useEffect(() => {
    getSingleMerchandiseReturnProposals(merchandiseReturnProposalId);
  }, [merchandiseReturnProposalId]);

  const getGoodsDelivery = useCallback(
    async (goodsDeliveryNoteId) => {
      const result = await fetchSingleGoodsDeliveryNotes(goodsDeliveryNoteId);
      if (result) {
        setGoodsDeliveryNoteDetails(result.goodsDeliveryDetails);
      } else {
        history.push("/404");
      }
    },
    [fetchSingleGoodsDeliveryNotes, history]
  );

  useEffect(() => {
    if (initialValues?.goodsDeliveryNote?.id) {
      getGoodsDelivery(initialValues.goodsDeliveryNote.id);
    }
  }, [initialValues]);

  const handleEditMerchandiseReturnProposals = async (values) => {
    enqueueSnackbar(`Đang cập nhật phiếu xuất kho...`, {
      variant: "info",
      key: `updating-${MODULE_NAME}`,
      persist: true,
      preventDuplicate: true,
    });

    const result = await editMerchandiseReturnProposal({
      ...values,
      id: +merchandiseReturnProposalId,
    });
    const details = await updateMerchandiseReturnDetails(
      values.merchandiseReturnDetails
    );
    closeSnackbar(`updating-${MODULE_NAME}`);
    if (result.id && details.length === 0) {
      enqueueSnackbar("Cập nhật thành công !", {
        variant: "success",
      });
    } else {
      let errors = { details };
      if (!result.id) errors["result"] = result;
      notifyError(enqueueSnackbar, errors);
    }
    getSingleMerchandiseReturnProposals(merchandiseReturnProposalId);
  };

  const updateMerchandiseReturnDetails = async (
    merchandiseReturnDetails = []
  ) => {
    let createProduct = [];
    let updateProduct = [];
    let deleteProduct = [];

    let errors = [];

    merchandiseReturnDetails.forEach((product) => {
      switch (product.action) {
        case "created":
          createProduct.push(product);
          break;
        case "updated":
          updateProduct.push(product);
          break;
        case "deleted":
          deleteProduct.push(product);
          break;
        default:
          break;
      }
    });

    if (createProduct.length > 0) {
      const result = await addMerchandiseReturnDetails({
        merchandiseReturnProposalId: +merchandiseReturnProposalId,
        merchandiseReturnDetails: [...createProduct],
      });
      if (result !== true) {
        errors.push(result?.ApiErr || result);
      }
    }

    // Delete Order Products
    if (deleteProduct.length > 0) {
      const result = await deleteMerchandiseReturnDetails({
        merchandiseReturnProposalId: +merchandiseReturnProposalId,
        merchandiseReturnDetailIds: [
          ...deleteProduct.map((product) => product.id),
        ],
      });
      if (result !== true) {
        errors.push(result?.ApiErr || result);
      }
    }

    // Update Order Products
    if (updateProduct.length > 0) {
      const result = await editMerchandiseReturnDetails({
        merchandiseReturnProposalId: +merchandiseReturnProposalId,
        merchandiseReturnDetails: [
          ...updateProduct.map((product) => ({
            id: product.id,
            quantity: product.quantity,
            description: product.description,
          })),
        ],
      });
      if (result !== true) {
        errors.push(result?.ApiErr || result);
      }
    }

    return errors;
  };

  return initialValues?.id ? (
    <MerchandiseReturnProposalDetails
      initialValues={{
        ...initialValues,
        ...initialValues.product,
      }}
      goodsDeliveryNoteDetails={goodsDeliveryNoteDetails}
      isEdit={
        isEdit &&
        [
          ENUMS.MERCHANDISE_RETURN_STATUS.NEW,
          ENUMS.MERCHANDISE_RETURN_STATUS.PENDING,
          ENUMS.MERCHANDISE_RETURN_STATUS.APPROVED,
        ].indexOf(initialValues.status) !== -1
      }
      onSubmit={(values) =>
        isEdit && handleEditMerchandiseReturnProposals(values)
      }
    />
  ) : (
    <h1>Loading</h1>
  );
};

export default SingleMerchandiseReturnProposalDetails;
