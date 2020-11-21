import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { notifyError } from "../../common/helper";
import GoodsDeliveryNoteDetails from "./common/GoodsDeliveryNoteDetails";
import handler from "./constants/handler";
import ordersHandler from "../Orders/constants/handler";
import { MODULE_NAME } from "./constants/models";

const CreateGoodsDeliveryNote = (props) => {
  const { orderId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [orderDetails, setOrderDetails] = useState([]);

  const { fetchSingleOrders } = useMemo(() => ordersHandler(dispatch, props), [
    dispatch,
    props,
  ]);

  const { createGoodsDeliveryNote } = useMemo(() => handler(dispatch, props), [
    dispatch,
    props,
  ]);

  useEffect(() => {
    getOrder(orderId);
  }, [orderId]);

  const handleSubmit = async (values) => {
    enqueueSnackbar(`Đang tạo phiếu nhập hàng...`, {
      variant: "info",
      key: `creating-${MODULE_NAME}`,
      persist: true,
      preventDuplicate: true,
    });
    const result = await createGoodsDeliveryNote({
      ...values,
      orderId: +orderId,
    });
    closeSnackbar(`creating-${MODULE_NAME}`);
    if (result.id) {
      history.push(`/${MODULE_NAME}`);
    } else {
      notifyError(enqueueSnackbar, result);
    }
  };

  const getOrder = useCallback(
    async (orderId) => {
      const result = await fetchSingleOrders(orderId);
      if (result) {
        setOrderDetails(result.orderDetails);
      } else {
        history.push("/404");
      }
    },
    [fetchSingleOrders, history]
  );

  return (
    <GoodsDeliveryNoteDetails
      onSubmit={handleSubmit}
      okLabel="Tạo phiếu"
      orderDetails={orderDetails}
    />
  );
};

export default CreateGoodsDeliveryNote;
