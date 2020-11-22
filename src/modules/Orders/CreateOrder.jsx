import { useSnackbar } from "notistack";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { formatVNDToNumber, notifyError } from "../../common/helper";
import OrderDetails from "./common/OrderDetails";
import handler from "./constants/handler";
import { MODULE_NAME } from "./constants/models";

const CreateOrder = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { createOrder } = useMemo(() => handler(dispatch, props), [
    dispatch,
    props,
  ]);

  const handleSubmit = async (values) => {
    enqueueSnackbar(`Đang tạo đơn hàng...`, {
      variant: "info",
      key: `creating-${MODULE_NAME}`,
      persist: true,
      preventDuplicate: true,
    });
    const result = await createOrder({
      description: values.description,
      orderDetails: values.orderDetails.map((item) => ({
        productId: item.productId,
        quantity: +item.quantity,
        description: item.description,
        singlePrice: +formatVNDToNumber(item.singlePrice + ""),
      })),
    });
    closeSnackbar(`creating-${MODULE_NAME}`);
    if (result.id) {
      history.push(`/${MODULE_NAME}`);
    } else {
      notifyError(enqueueSnackbar, result);
    }
  };

  return <OrderDetails onSubmit={handleSubmit} okLabel="Tạo phiếu" />;
};

export default CreateOrder;
