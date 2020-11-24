import React, { useMemo, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import handler from "./constants/handler";
import merchandiseHandler from "../MerchandiseReturnProposals/constants/handler";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { MODULE_NAME } from "./constants/models";
import GoodsReceivingOfReturnDetails from "./common/GoodsReceivingOfReturnDetails";
import { notifyError } from "../../common/helper";
import { GOOD_RECEIVING_RETURN_STATUS } from "../../common/constants/enums";

const SingleGoodsReceivingOfReturnDetails = (props) => {
  const { isEdit = false } = props;
  const { goodsReceivingOfReturnId } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const [merchandiseDetails, setMerchandiseDetails] = useState([]);

  const { fetchSingleMerchandiseReturnProposals } = useMemo(
    () => merchandiseHandler(dispatch, props),
    [dispatch, props]
  );

  const {
    fetchSingleGoodsReceivingOfReturns,
    editGoodsReceivingOfReturn,
    addProductsGoodsReceivingOfReturn,
    deleteProductsGoodsReceivingOfReturn,
    updateProductsGoodsReceivingOfReturn,
  } = useMemo(() => handler(dispatch, props), [dispatch, props]);

  const getGoodsReceivingOfReturn = useCallback(
    async (goodsReceivingOfReturnId) => {
      const result = await fetchSingleGoodsReceivingOfReturns(
        goodsReceivingOfReturnId
      );
      if (result) {
        setInitialValues(result);
      } else {
        history.push("/404");
      }
    },
    [fetchSingleGoodsReceivingOfReturns, history, setInitialValues]
  );

  useEffect(() => {
    getGoodsReceivingOfReturn(goodsReceivingOfReturnId);
  }, [goodsReceivingOfReturnId, getGoodsReceivingOfReturn]);

  const getMerchandise = useCallback(
    async (merchandiseId) => {
      const result = await fetchSingleMerchandiseReturnProposals(merchandiseId);
      if (result) {
        setMerchandiseDetails(result.merchandiseReturnDetails);
      } else {
        history.push("/404");
      }
    },
    [fetchSingleMerchandiseReturnProposals, history]
  );

  useEffect(() => {
    if (initialValues.merchandiseReturnProposalId) {
      getMerchandise(initialValues.merchandiseReturnProposalId);
    }
  }, [initialValues]);

  const handleEditGoodsReceivingOfReturn = async (values) => {
    enqueueSnackbar(`Đang cập nhật phiếu hủy sản phẩm...`, {
      variant: "info",
      key: `updating-${MODULE_NAME}`,
      persist: true,
      preventDuplicate: true,
    });
    const result = await editGoodsReceivingOfReturn(values);
    const details = await updateGoodsReceivingOfReturnProducts(
      values.goodsReceivingOfReturnDetails
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
    getGoodsReceivingOfReturn(goodsReceivingOfReturnId);
  };

  const updateGoodsReceivingOfReturnProducts = async (products = []) => {
    let createProduct = [];
    let updateProduct = [];
    let deleteProduct = [];

    let errors = [];

    products.forEach((product) => {
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
      const result = await addProductsGoodsReceivingOfReturn({
        goodsReceivingOfReturnId: +goodsReceivingOfReturnId,
        products: createProduct.map((product) => ({
          productId: +product.productId,
          quantity: parseInt(product.quantity),
          description: product.description,
        })),
      });
      if (result !== true) {
        errors.push(result?.ApiErr || result);
      }
    }

    // Delete Inventory Record Products
    if (deleteProduct.length > 0) {
      const result = await deleteProductsGoodsReceivingOfReturn({
        goodsReceivingOfReturnId: +goodsReceivingOfReturnId,
        goodsReceivingOfReturnDetailIds: [
          ...deleteProduct.map((product) => product.id),
        ],
      });

      if (result !== true) {
        errors.push(result?.ApiErr || result);
      }
    }

    // Update Inventory Record Products
    if (updateProduct.length > 0) {
      const result = await updateProductsGoodsReceivingOfReturn({
        goodsReceivingOfReturnId: +goodsReceivingOfReturnId,
        goodsReceivingOfReturnDetails: [
          ...updateProduct.map((product) => ({
            id: product.id,
            quantity: parseInt(product.quantity),
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
    <GoodsReceivingOfReturnDetails
      merchandiseDetails={merchandiseDetails}
      initialValues={initialValues}
      isEdit={
        isEdit &&
        [
          GOOD_RECEIVING_RETURN_STATUS.DONE,
          GOOD_RECEIVING_RETURN_STATUS.CANCELED,
        ].indexOf(initialValues?.status) === -1
      }
      onSubmit={(values) => isEdit && handleEditGoodsReceivingOfReturn(values)}
    />
  ) : (
    <h1>Loading</h1>
  );
};

export default SingleGoodsReceivingOfReturnDetails;
