import React, { useMemo, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import handler from "./constants/handler";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { MODULE_NAME } from "./constants/models";
import ProductRemoveFormDetails from "./common/ProductRemoveFormDetails";
import { notifyError } from "../../common/helper";
import { PRODUCT_REMOVE_STATUS } from "../../common/constants/enums";

const SingleProductRemoveFormDetails = (props) => {
  const { isEdit = false } = props;
  const { productRemoveFormId } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    fetchSingleProductRemoveForms,
    editProductRemoveForm,
    addInventoryRecordDetails,
    deleteProductsProductRemoveForm,
    updateProductsProductRemoveForm,
  } = useMemo(() => handler(dispatch, props), [dispatch, props]);

  const getProductRemoveForm = useCallback(
    async (productRemoveFormId) => {
      const result = await fetchSingleProductRemoveForms(productRemoveFormId);
      if (result) {
        setInitialValues(result);
      } else {
        history.push("/404");
      }
    },
    [fetchSingleProductRemoveForms, history, setInitialValues]
  );

  useEffect(() => {
    getProductRemoveForm(productRemoveFormId);
  }, [productRemoveFormId, getProductRemoveForm]);

  const handleEditProductRemoveForm = async (values) => {
    enqueueSnackbar(`Đang cập nhật phiếu hủy sản phẩm...`, {
      variant: "info",
      key: `updating-${MODULE_NAME}`,
      persist: true,
      preventDuplicate: true,
    });
    const result = await editProductRemoveForm(values);
    const details = await updateProductRemoveFormProducts(
      values.productRemoveDetails
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
    getProductRemoveForm(productRemoveFormId);
  };

  const updateProductRemoveFormProducts = async (products = []) => {
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
      const result = await addInventoryRecordDetails({
        productRemoveFormId: +productRemoveFormId,
        products: createProduct.map((product) => ({
          productId: +product.productId,
          removedQuantity: parseInt(product.removedQuantity),
        })),
      });
      if (result !== true) {
        errors.push(result?.ApiErr || result);
      }
    }

    // Delete Inventory Record Products
    if (deleteProduct.length > 0) {
      const result = await deleteProductsProductRemoveForm({
        productRemoveFormId: +productRemoveFormId,
        productRemoveDetailIds: [...deleteProduct.map((product) => product.id)],
      });

      if (result !== true) {
        errors.push(result?.ApiErr || result);
      }
    }

    // Update Inventory Record Products
    if (updateProduct.length > 0) {
      const result = await updateProductsProductRemoveForm({
        productRemoveFormId: +productRemoveFormId,
        productRemoveDetails: [
          ...updateProduct.map((product) => ({
            id: product.id,
            removedQuantity: parseInt(product.removedQuantity),
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
    <ProductRemoveFormDetails
      initialValues={initialValues}
      isEdit={
        isEdit &&
        [PRODUCT_REMOVE_STATUS.DONE, PRODUCT_REMOVE_STATUS.CANCELED].indexOf(
          initialValues?.status
        ) === -1
      }
      onSubmit={(values) => isEdit && handleEditProductRemoveForm(values)}
    />
  ) : (
    <h1>Loading</h1>
  );
};

export default SingleProductRemoveFormDetails;
