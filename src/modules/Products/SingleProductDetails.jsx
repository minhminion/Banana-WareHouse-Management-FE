import React, { useMemo, useState, useCallback } from "react";
import ProductDetails from "./common/ProductDetails";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import handler from "./constants/handler";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

const SingleProductDetails = (props) => {
  const { isEdit = false } = props;
  const { productSKU } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    fetchSingleProduct,
    editProduct,
    addProductUnit,
    deleteProductUnit,
    editProductUnit,
  } = useMemo(() => handler(dispatch, props), [dispatch, props]);

  const getProduct = useCallback(
    async (productSKU) => {
      const result = await fetchSingleProduct(productSKU);
      if (result) {
        setInitialValues(result);
      } else {
        history.push("/404");
      }
    },
    [fetchSingleProduct, history, setInitialValues]
  );

  useEffect(() => {
    getProduct(productSKU);
  }, [productSKU, getProduct]);

  const handleEditProduct = async (values) => {
    enqueueSnackbar(`Đang cập nhật sản phẩm...`, {
      variant: "info",
      key: "updating-product",
      persist: true,
      preventDuplicate: true,
    });
    const result = await editProduct(values);
    await updateProductUnit(values.productUnits);
    closeSnackbar("updating-product");
    if (result.id) {
      enqueueSnackbar("Cập nhật thành công !", {
        variant: "success",
      });
      getProduct(productSKU);
    } else {
      enqueueSnackbar(result, {
        variant: "error",
      });
    }
  };

  const updateProductUnit = async (productUnits = []) => {
    console.log(
      "======== Bao Minh: updateProductUnit -> productUnits",
      productUnits
    );
    let createUnits = [];
    let updateUnits = [];
    let deleteUnits = [];

    productUnits.forEach((unit) => {
      switch (unit.action) {
        case "created":
          createUnits.push(unit);
          break;
        case "updated":
          updateUnits.push(unit);
          break;
        case "deleted":
          deleteUnits.push(unit);
          break;
        default:
          break;
      }
    });

    // Create Units
    if (createUnits.length > 0) {
      await Promise.all(
        createUnits.map(async (unit) => {
          try {
            await addProductUnit({
              name: unit.name,
              ratioFromDefault: parseFloat(unit.ratioFromDefault),
              productId: initialValues.id,
            });
          } catch (error) {
          }
        })
      );
    }

    // Delete Units
    if (deleteUnits.length > 0) {
      await Promise.all(
        deleteUnits.map(async (unit) => {
          await deleteProductUnit(unit.id);
        })
      );
    }

    // Update Units
    if (updateUnits.length > 0) {
      await Promise.all(
        updateUnits.map(async (unit) => {
          await editProductUnit(unit);
        })
      );
    }
  };

  return initialValues?.id ? (
    <ProductDetails
      initialValues={initialValues}
      isEdit={isEdit}
      onSubmit={(values) => isEdit && handleEditProduct(values)}
    />
  ) : (
    <h1>Loading</h1>
  );
};

export default SingleProductDetails;
