import React, { useMemo, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import handler from "./constants/handler";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { MODULE_NAME } from "./constants/models";
import OrderDetails from "./common/OrderDetails";
import { formatVNDToNumber, notifyError } from "../../common/helper";

const SingleOrderDetails = (props) => {
  const { isEdit = false } = props;
  const { orderId } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    fetchSingleOrders,
    editOrder,
    addOrderDetails,
    editOrderDetails,
    deleteOrderDetails,
  } = useMemo(() => handler(dispatch, props), [dispatch, props]);

  const getOrder = useCallback(
    async (orderId) => {
      const result = await fetchSingleOrders(orderId);
      if (result) {
        setInitialValues(result);
      } else {
        history.push("/404");
      }
    },
    [fetchSingleOrders, history, setInitialValues]
  );

  useEffect(() => {
    getOrder(orderId);
  }, [orderId, getOrder]);

  const handleEditOrder = async (values) => {
    enqueueSnackbar(`Đang cập nhật thông tin đơn hàng...`, {
      variant: "info",
      key: `updating-${MODULE_NAME}`,
      persist: true,
      preventDuplicate: true,
    });
    const result = await editOrder(values);
    const details = await updateOrderDetails(values.orderDetails);
    closeSnackbar(`updating-${MODULE_NAME}`);
    if (result.id && details.length === 0) {
      enqueueSnackbar("Cập nhật thành công !", {
        variant: "success",
      });
      getOrder(orderId);
    } else {
      let errors = { details };
      if (!result.id) errors["result"] = result;
      notifyError(enqueueSnackbar, errors);
    }
  };

  const updateOrderDetails = async (orderDetails = []) => {
    let createProduct = [];
    let updateProduct = [];
    let deleteProduct = [];

    let errors = [];

    orderDetails.forEach((product) => {
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
      const result = await addOrderDetails({
        orderId: +orderId,
        orderDetails: [
          ...createProduct.map((product) => ({
            productId: product.productId,
            quantity: +product.quantity,
            description: product.description,
            singlePrice: +formatVNDToNumber(product.singlePrice + ""),
          })),
        ],
      });
      if (result !== true) {
        errors.push(result?.ApiErr || result);
      }
    }

    // Delete Proposal Products
    if (deleteProduct.length > 0) {
      const result = await deleteOrderDetails({
        orderId: +orderId,
        orderDetails: [...deleteProduct.map((product) => product.id)],
      });
      if (result !== true) {
        errors.push(result?.ApiErr || result);
      }
    }

    // Update Proposal Products
    if (updateProduct.length > 0) {
      const result = await editOrderDetails({
        orderId: +orderId,
        orderDetails: [
          ...updateProduct.map((product) => ({
            id: product.id,
            quantity: +product.quantity,
            description: product.description,
            singlePrice: +formatVNDToNumber(product.singlePrice + ""),
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
    <OrderDetails
      initialValues={initialValues}
      isEdit={isEdit}
      onSubmit={(values) => isEdit && handleEditOrder(values)}
    />
  ) : (
    <h1>Loading</h1>
  );
};

export default SingleOrderDetails;
