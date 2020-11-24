import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { notifyError } from "../../common/helper";
import handler from "./constants/handler";
import merchandiseHandler from "../MerchandiseReturnProposals/constants/handler";
import GoodsReceivingOfReturnDetails from "./common/GoodsReceivingOfReturnDetails";
import { MODULE_NAME } from "./constants/models";

const CreateGoodsReceivingOfReturn = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { merchandiseReturnProposalId } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [merchandiseDetails, setMerchandiseDetails] = useState([]);

  const { fetchSingleMerchandiseReturnProposals } = useMemo(
    () => merchandiseHandler(dispatch, props),
    [dispatch, props]
  );

  const {
    createGoodsReceivingOfReturn,
    addProductsGoodsReceivingOfReturn,
  } = useMemo(() => handler(dispatch, props), [dispatch, props]);

  useEffect(() => {
    getMerchandise(merchandiseReturnProposalId);
  }, [merchandiseReturnProposalId]);

  const handleSubmit = async (values) => {
    let createSuccess = false;
    let error = {};
    enqueueSnackbar(`Đang tạo phiếu đề nghị...`, {
      variant: "info",
      key: `creating-${MODULE_NAME}`,
      persist: true,
      preventDuplicate: true,
    });
    const result = await createGoodsReceivingOfReturn({
      merchandiseReturnProposalId: +merchandiseReturnProposalId,
      description: values.description,
    });
    if (result.id) {
      createSuccess = true;
      if (values.goodsReceivingOfReturnDetails?.length > 0) {
        const res = await addProductToGoodsReceivingOfReturn(
          result.id,
          values.goodsReceivingOfReturnDetails
        );
        if (res !== true) {
          createSuccess = false;
          error["addProducts"] = res;
        }
      }
    } else {
      error["createGoodsReceivingOfReturn"] = result;
    }

    closeSnackbar(`creating-${MODULE_NAME}`);
    if (createSuccess) {
      history.push(`/${MODULE_NAME}`);
    } else {
      notifyError(enqueueSnackbar, error);
    }
  };

  const addProductToGoodsReceivingOfReturn = async (
    goodsReceivingOfReturnId,
    products
  ) => {
    return await addProductsGoodsReceivingOfReturn({
      goodsReceivingOfReturnId: +goodsReceivingOfReturnId,
      products: products.map((product) => ({
        productId: +product.productId,
        quantity: parseInt(product.quantity),
      })),
    });
  };

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

  return (
    <GoodsReceivingOfReturnDetails
      merchandiseDetails={merchandiseDetails}
      onSubmit={handleSubmit}
      okLabel="Tạo phiếu nhập kho trả hàng"
    />
  );
};

export default CreateGoodsReceivingOfReturn;
