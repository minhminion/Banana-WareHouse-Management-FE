import React, { useMemo, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import handler from "./constants/handler";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { MODULE_NAME } from "./constants/models";
import SupplierDetails from "./common/SupplierDetails";
import { formatVNDToNumber, notifyError } from "../../common/helper";

const SingleSupplierDetails = (props) => {
  const { isEdit = false } = props;
  const { supplierId } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    fetchSingleSuppliers,
    editSupplier,
    addProductsSupplier,
    deleteProductsSupplier,
  } = useMemo(() => handler(dispatch, props), [dispatch, props]);

  const getSupplier = useCallback(
    async (supplierId) => {
      const result = await fetchSingleSuppliers(supplierId);
      if (result) {
        setInitialValues(result);
      } else {
        history.push("/404");
      }
    },
    [fetchSingleSuppliers, history, setInitialValues]
  );

  useEffect(() => {
    getSupplier(supplierId);
  }, [supplierId, getSupplier]);

  const handleEditSupplier = async (values) => {
    enqueueSnackbar(`Đang cập nhật thông tin nhà cung cấp...`, {
      variant: "info",
      key: `updating-${MODULE_NAME}`,
      persist: true,
      preventDuplicate: true,
    });
    const result = await editSupplier(values);
    const details = await updateSupplierProducts(values.supplierProducts);

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
    getSupplier(supplierId);
  };

  const updateSupplierProducts = async (products = []) => {
    console.log(
      "======== Bao Minh ~ file: SingleSupplierDetails.jsx ~ line 115 ~ updateSupplierProducts ~ products",
      products
    );
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
      const result = await addProductsSupplier(
        +supplierId,
        createProduct.map((product) => ({
          productId: product.productId,
          price: parseInt(formatVNDToNumber(product.price + "")),
        }))
      );
      if (result !== true) {
        errors.push(result?.ApiErr || result);
      }
    }

    // Delete Proposal Products
    if (deleteProduct.length > 0) {
      const result = await deleteProductsSupplier(+supplierId, [
        ...deleteProduct.map((product) => product.productId),
      ]);

      if (result !== true) {
        errors.push(result?.ApiErr || result);
      }
    }

    // Update Proposal Products

    return errors;
  };

  return initialValues?.id ? (
    <SupplierDetails
      initialValues={initialValues}
      isEdit={isEdit}
      onSubmit={(values) => isEdit && handleEditSupplier(values)}
    />
  ) : (
    <h1>Loading</h1>
  );
};

export default SingleSupplierDetails;
