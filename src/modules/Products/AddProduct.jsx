import React, { useMemo } from "react";
import ProductDetails from "./common/ProductDetails";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import handler from "./constants/handler";
import { useSnackbar } from "notistack";

const AddProduct = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { createProduct } = useMemo(() => handler(dispatch, props), [
    dispatch,
    props,
  ]);

  const handleSubmit = async (values) => {
    enqueueSnackbar(`Đang tạo sản phẩm...`, {
      variant: "info",
      key: "creating-product",
      persist: true,
      preventDuplicate: true,
    });
    const result = await createProduct(values);
    closeSnackbar("creating-product");
    if (result.id) {
      history.go(-1);
    } else {
      enqueueSnackbar(result, {
        variant: "error",
      });
    }
  };

  return (
    <ProductDetails
      isEdit={true}
      onSubmit={handleSubmit}
      okLabel={"Tạo sản phẩm"}
      resetLabel={"Làm mới"}
    />
  );
};

export default AddProduct;
