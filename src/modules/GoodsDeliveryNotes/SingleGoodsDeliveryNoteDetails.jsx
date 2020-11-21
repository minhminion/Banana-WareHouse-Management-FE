import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ENUMS } from "../../common/constants";
import GoodsDeliveryNoteDetails from "./common/GoodsDeliveryNoteDetails";
import ordersHandler from "../Orders/constants/handler";
import handler from "./constants/handler";
import { notifyError } from "../../common/helper";
import { MODULE_NAME } from "./constants/models";

const SingleGoodsDeliveryNoteDetails = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isEdit = false } = props;
  const { goodsDeliveryNoteId } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [orderDetails, setOrderDetails] = useState([]);

  const { fetchSingleOrders } = useMemo(() => ordersHandler(dispatch, props), [
    dispatch,
    props,
  ]);
  const {
    fetchSingleGoodsDeliveryNotes,
    editGoodsDeliveryNote,
    addGoodsDeliveryDetails,
    deleteGoodsDeliveryDetails,
    editGoodsDeliveryDetails,
  } = useMemo(() => handler(dispatch, props), [dispatch, props]);

  const getSingleGoodsDeliveryNotes = useCallback(
    async (goodsDeliveryNoteId) => {
      const result = await fetchSingleGoodsDeliveryNotes(goodsDeliveryNoteId);
      if (result) {
        setInitialValues(result);
      } else {
        history.push("/404");
      }
    },
    [fetchSingleGoodsDeliveryNotes, history, setInitialValues]
  );

  useEffect(() => {
    getSingleGoodsDeliveryNotes(goodsDeliveryNoteId);
  }, [goodsDeliveryNoteId]);

  const getOrder = useCallback(
    async (orderId) => {
      const result = await fetchSingleOrders(orderId);
      if (result) {
        setOrderDetails(result.orderDetails.map((item) => item.productId));
      } else {
        history.push("/404");
      }
    },
    [fetchSingleOrders, history]
  );

  useEffect(() => {
    if (initialValues.orderId) {
      getOrder(initialValues.orderId);
    }
  }, [initialValues]);

  const handleEditGoodsDeliveryNotes = async (values) => {
    enqueueSnackbar(`Đang cập nhật phiếu xuất kho...`, {
      variant: "info",
      key: `updating-${MODULE_NAME}`,
      persist: true,
      preventDuplicate: true,
    });

    const result = await editGoodsDeliveryNote({
      ...values,
      id: +goodsDeliveryNoteId,
    });
    const details = await updateGoodsDeliveryDetails(
      values.goodsDeliveryDetails
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
    getSingleGoodsDeliveryNotes(goodsDeliveryNoteId);
  };

  const updateGoodsDeliveryDetails = async (goodsDeliveryDetails = []) => {
    let createProduct = [];
    let updateProduct = [];
    let deleteProduct = [];

    let errors = [];

    goodsDeliveryDetails.forEach((product) => {
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
      const result = await addGoodsDeliveryDetails({
        goodsDeliveryNoteId: +goodsDeliveryNoteId,
        goodsDeliveryDetails: [...createProduct],
      });
      if (result !== true) {
        errors.push(result?.ApiErr || result);
      }
    }

    // Delete Order Products
    if (deleteProduct.length > 0) {
      const result = await deleteGoodsDeliveryDetails({
        goodsDeliveryNoteId: +goodsDeliveryNoteId,
        goodsDeliveryDetailIds: [...deleteProduct.map((product) => product.id)],
      });
      if (result !== true) {
        errors.push(result?.ApiErr || result);
      }
    }

    // Update Order Products
    if (updateProduct.length > 0) {
      const result = await editGoodsDeliveryDetails({
        goodsDeliveryNoteId: +goodsDeliveryNoteId,
        goodsDeliveryDetails: [
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
    <GoodsDeliveryNoteDetails
      initialValues={{
        ...initialValues,
        ...initialValues.product,
      }}
      orderDetails={orderDetails}
      isEdit={
        isEdit &&
        [
          ENUMS.GOOD_DELIVERY_STATUS.NEW,
          ENUMS.GOOD_DELIVERY_STATUS.PENDING,
          ENUMS.GOOD_DELIVERY_STATUS.APPROVED,
        ].indexOf(initialValues.status) !== -1
      }
      onSubmit={(values) => isEdit && handleEditGoodsDeliveryNotes(values)}
    />
  ) : (
    <h1>Loading</h1>
  );
};

export default SingleGoodsDeliveryNoteDetails;
