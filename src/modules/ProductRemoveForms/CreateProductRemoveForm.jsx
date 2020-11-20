import { useSnackbar } from "notistack";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { notifyError } from "../../common/helper";
import handler from "./constants/handler";
import ProductRemoveFormDetails from "./common/ProductRemoveFormDetails";
import { MODULE_NAME } from "./constants/models";

const CreateProductRemoveForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { createProductRemoveForm, addInventoryRecordDetails } = useMemo(
    () => handler(dispatch, props),
    [dispatch, props]
  );

  const handleSubmit = async (values) => {
    let createSuccess = false;
    let error = {};
    enqueueSnackbar(`Đang tạo phiếu đề nghị...`, {
      variant: "info",
      key: `creating-${MODULE_NAME}`,
      persist: true,
      preventDuplicate: true,
    });
    const result = await createProductRemoveForm({
      description: values.description,
    });
    if (result.id) {
      createSuccess = true;
      if (values.productRemoveDetails?.length > 0) {
        const res = await addProductToProductRemoveForm(
          result.id,
          values.productRemoveDetails
        );
        if (res !== true) {
          createSuccess = false;
          error["addProducts"] = res;
        }
      }
    } else {
      error["createProductRemoveForm"] = result;
    }

    closeSnackbar(`creating-${MODULE_NAME}`);
    if (createSuccess) {
      history.push(`/${MODULE_NAME}`);
    } else {
      notifyError(enqueueSnackbar, error);
    }
  };

  const addProductToProductRemoveForm = async (
    productRemoveFormId,
    products
  ) => {
    return await addInventoryRecordDetails({
      productRemoveFormId: +productRemoveFormId,
      products: products.map((product) => ({
        productId: +product.productId,
        removedQuantity: parseInt(product.removedQuantity),
      })),
    });
  };

  return (
    <ProductRemoveFormDetails
      onSubmit={handleSubmit}
      okLabel="Tạo phiếu hủy sản phẩm"
    />
  );
};

export default CreateProductRemoveForm;
