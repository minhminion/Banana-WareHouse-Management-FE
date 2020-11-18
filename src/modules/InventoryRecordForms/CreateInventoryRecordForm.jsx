import { useSnackbar } from "notistack";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { formatVNDToNumber, notifyError } from "../../common/helper";
import handler from "./constants/handler";
import InventoryRecordFormDetails from "./common/InventoryRecordFormDetails";
import { MODULE_NAME } from "./constants/models";

const CreateInventoryRecordForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { createInventoryRecordForm, addInventoryRecordDetails } = useMemo(
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
    const result = await createInventoryRecordForm({
      description: values.description,
    });
    if (result.id) {
      createSuccess = true;
      if (values.inventoryRecordDetails?.length > 0) {
        const res = await addProductToInventoryRecordForm(
          result.id,
          values.inventoryRecordDetails
        );
        if (res !== true) {
          createSuccess = false;
          error["addProducts"] = res;
        }
      }
    } else {
      error["createInventoryRecordForm"] = result;
    }

    closeSnackbar(`creating-${MODULE_NAME}`);
    if (createSuccess) {
      history.push(`/${MODULE_NAME}`);
    } else {
      notifyError(enqueueSnackbar, error);
    }
  };

  const addProductToInventoryRecordForm = async (
    inventoryRecordFormId,
    products
  ) => {
    return await addInventoryRecordDetails({
      inventoryRecordFormId: +inventoryRecordFormId,
      products: products.map((product) => ({
        productId: +product.productId,
        actualQuantity: parseInt(product.actualQuantity),
      })),
    });
  };

  return (
    <InventoryRecordFormDetails
      onSubmit={handleSubmit}
      okLabel="Tạo phiếu kiểm kho"
    />
  );
};

export default CreateInventoryRecordForm;
