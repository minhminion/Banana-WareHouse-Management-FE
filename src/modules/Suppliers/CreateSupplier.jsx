import { useSnackbar } from "notistack";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { formatVNDToNumber, notifyError } from "../../common/helper";
import handler from "./constants/handler";
import SupplierDetails from "./common/SupplierDetails";
import { MODULE_NAME } from "./constants/models";

const CreateSupplier = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { createSupplier, addProductsSupplier } = useMemo(
    () => handler(dispatch, props),
    [dispatch, props]
  );

  const handleSubmit = async (values) => {
    let createSuccess = false;
    let error = {};
    enqueueSnackbar(`Đang thêm nhà cung cấp...`, {
      variant: "info",
      key: `creating-${MODULE_NAME}`,
      persist: true,
      preventDuplicate: true,
    });
    const result = await createSupplier({
      name: values.name,
      address: values.address,
      phoneNumber: values.phoneNumber,
      email: values.email,
      representative: values.representative,
    });
    if (result.id) {
      if (values.supplierProducts?.length > 0) {
        const res = await addProductToSupplier(
          result.id,
          values.supplierProducts
        );
        if (res === true) {
          createSuccess = true;
        } else {
          error["addProducts"] = res;
        }
      }
    } else {
      error["createSupplier"] = result;
    }
    closeSnackbar(`creating-${MODULE_NAME}`);
    if (createSuccess) {
      history.push(`/${MODULE_NAME}`);
    } else {
      notifyError(enqueueSnackbar, error);
    }
  };

  const addProductToSupplier = async (supplierId, products) => {
    return await addProductsSupplier(
      supplierId,
      products.map((product) => ({
        productId: product.productId,
        price: parseInt(formatVNDToNumber(product.price+"")),
      }))
    );
  };

  return <SupplierDetails onSubmit={handleSubmit} okLabel="Tạo nhà cung cấp" />;
};

export default CreateSupplier;
