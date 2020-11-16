import React, { useMemo, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import handler from "./constants/handler";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { MODULE_NAME } from "./constants/models";
import SupplierDetails from "./common/SupplierDetails";

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
    // await updateSupplierUnit(values.SupplierUnits);
    closeSnackbar(`updating-${MODULE_NAME}`);
    if (result.id) {
      enqueueSnackbar("Cập nhật thành công !", {
        variant: "success",
      });
      getSupplier(supplierId);
    } else {
      enqueueSnackbar(result, {
        variant: "error",
      });
    }
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
