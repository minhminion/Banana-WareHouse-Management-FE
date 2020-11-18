import React, { useMemo, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import handler from "./constants/handler";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { MODULE_NAME } from "./constants/models";
import InventoryRecordFormDetails from "./common/InventoryRecordFormDetails";
import { formatVNDToNumber, notifyError } from "../../common/helper";

const SingleInventoryRecordFormDetails = (props) => {
  const { isEdit = false } = props;
  const { inventoryRecordFormId } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    fetchSingleInventoryRecordForms,
    editInventoryRecordForm,
    addInventoryRecordDetails,
    deleteProductsInventoryRecordForm,
    updateProductsInventoryRecordForm,
  } = useMemo(() => handler(dispatch, props), [dispatch, props]);

  const getInventoryRecordForm = useCallback(
    async (inventoryRecordFormId) => {
      const result = await fetchSingleInventoryRecordForms(
        inventoryRecordFormId
      );
      if (result) {
        setInitialValues(result);
      } else {
        history.push("/404");
      }
    },
    [fetchSingleInventoryRecordForms, history, setInitialValues]
  );

  useEffect(() => {
    getInventoryRecordForm(inventoryRecordFormId);
  }, [inventoryRecordFormId, getInventoryRecordForm]);

  const handleEditInventoryRecordForm = async (values) => {
    enqueueSnackbar(`Đang cập nhật phiếu kiểm kho...`, {
      variant: "info",
      key: `updating-${MODULE_NAME}`,
      persist: true,
      preventDuplicate: true,
    });
    const result = await editInventoryRecordForm(values);
    const details = await updateInventoryRecordFormProducts(
      values.inventoryRecordDetails
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
    getInventoryRecordForm(inventoryRecordFormId);
  };

  const updateInventoryRecordFormProducts = async (products = []) => {
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
        inventoryRecordFormId: +inventoryRecordFormId,
        products: createProduct.map((product) => ({
          productId: +product.productId,
          actualQuantity: parseInt(product.actualQuantity),
        })),
      });
      if (result !== true) {
        errors.push(result?.ApiErr || result);
      }
    }

    // Delete Inventory Record Products
    if (deleteProduct.length > 0) {
      const result = await deleteProductsInventoryRecordForm({
        inventoryRecordFormId: +inventoryRecordFormId,
        inventoryDetailIds: [...deleteProduct.map((product) => product.id)],
      });

      if (result !== true) {
        errors.push(result?.ApiErr || result);
      }
    }

    // Update Inventory Record Products
    if (updateProduct.length > 0) {
      const result = await updateProductsInventoryRecordForm({
        inventoryRecordFormId: +inventoryRecordFormId,
        inventoryRecordDetails: [
          ...updateProduct.map((product) => ({
            id: product.id,
            actualQuantity: parseInt(product.actualQuantity),
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
    <InventoryRecordFormDetails
      initialValues={initialValues}
      isEdit={isEdit}
      onSubmit={(values) => isEdit && handleEditInventoryRecordForm(values)}
    />
  ) : (
    <h1>Loading</h1>
  );
};

export default SingleInventoryRecordFormDetails;
