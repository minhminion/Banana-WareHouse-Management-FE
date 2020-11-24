import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { notifyError } from "../../common/helper";
import MerchandiseReturnProposalDetails from "./common/MerchandiseReturnProposalDetails";
import handler from "./constants/handler";
import goodsDeliveryNotesHandler from "../GoodsDeliveryNotes/constants/handler";
import { MODULE_NAME } from "./constants/models";

const CreateMerchandiseReturnProposal = (props) => {
  const { goodsDeliveryNoteId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [goodsDeliveryNoteDetails, setGoodsDeliveryNoteDetails] = useState([]);

  const { fetchSingleGoodsDeliveryNotes } = useMemo(
    () => goodsDeliveryNotesHandler(dispatch, props),
    [dispatch, props]
  );

  const { createMerchandiseReturnProposal } = useMemo(
    () => handler(dispatch, props),
    [dispatch, props]
  );

  useEffect(() => {
    getGoodsDelivery(goodsDeliveryNoteId);
  }, [goodsDeliveryNoteId]);

  const handleSubmit = async (values) => {
    enqueueSnackbar(`Đang tạo phiếu nhập kho trả hàng ...`, {
      variant: "info",
      key: `creating-${MODULE_NAME}`,
      persist: true,
      preventDuplicate: true,
    });
    const result = await createMerchandiseReturnProposal({
      ...values,
      goodsDeliveryNoteId: +goodsDeliveryNoteId,
    });
    closeSnackbar(`creating-${MODULE_NAME}`);
    if (result.id) {
      history.push(`/${MODULE_NAME}`);
    } else {
      notifyError(enqueueSnackbar, result);
    }
  };

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

  return (
    <MerchandiseReturnProposalDetails
      onSubmit={handleSubmit}
      okLabel="Tạo phiếu"
      goodsDeliveryNoteDetails={goodsDeliveryNoteDetails || []}
    />
  );
};

export default CreateMerchandiseReturnProposal;
