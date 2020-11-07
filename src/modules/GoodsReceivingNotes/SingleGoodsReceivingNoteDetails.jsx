import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ENUMS } from "../../common/constants";
import GoodsReceivingNoteDetails from "./common/GoodsReceivingNoteDetails";

const defaultValues = {
  id: 1,
  creator: "231",
  createdAt: Date.now(),
  period: 2,
  status: ENUMS.GOOD_RECEIVING_STATUS.NEW,
  description: "",
  exceptionReason: "From Minh da poet with ❤❤❤ !!!",
  goodsReceivingNoteDetails: [
    {
      id: 73,
      productId: 2,
      goodsReceivingNotesId: 30,
      quantity: 52,
      description: "",
      createdAt: "2020-11-05T07:36:45.0206537",
      lastModifiedAt: "2020-11-05T07:36:45.0206601",
      product: {
        id: 2,
        name: "Bưởi Đoan Hùng",
        sku: "SP-TCVN-00002",
        description: null,
        defaultUnit: "Kg",
        purchasePrice: 20000,
        price: 60000,
        status: 1,
        quantity: 259,
        productCategoryId: 1,
        minQuantity: 0,
        maxQuantity: 1000,
        lastSaledDate: "0001-01-01T00:00:00",
        createdAt: "0001-01-01T00:00:00",
        lastModifiedAt: "0001-01-01T00:00:00",
        productCategory: null,
        productUnits: [],
      },
    },
  ],
};

const SingleGoodsReceivingNoteDetails = (props) => {
  const { isEdit = false } = props;
  const { goodsReceivingNotesId } = useParams();
  const [initialValues, setInitialValues] = useState(defaultValues);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleEditGoodsReceivingNotes = (values) => {
    enqueueSnackbar(`Đang cập nhật sản phẩm...`, {
      variant: "info",
      key: "updating-goods-receiving-notes",
      persist: true,
      preventDuplicate: true,
    });
    console.log(goodsReceivingNotesId);

    // const result = await editProposal({
    //   ...values,
    //   id: parseInt(purchaseProposalFormId),
    // });
    // await updateProductUnit(values.purchaseProposalDetails);
    setTimeout(() => {
      closeSnackbar("updating-goods-receiving-notes");
      setInitialValues((prev) => ({
        ...prev,
        status: values.status
      }));
      enqueueSnackbar("Cập nhật thành công !", {
        variant: "success",
      });
    }, 1000);
    // closeSnackbar("updating-goods-receiving-notes");
    // if (result.id) {
    //   enqueueSnackbar("Cập nhật thành công !", {
    //     variant: "success",
    //   });
    //   getProposal(purchaseProposalFormId);
    // } else {
    //   notifyError(enqueueSnackbar, result);
    // }
  };

  return initialValues?.id ? (
    <GoodsReceivingNoteDetails
      initialValues={{
        ...initialValues,
        ...initialValues.product,
      }}
      isEdit={
        isEdit &&
        (initialValues?.status === ENUMS.PROPOSAL_STATUS.NEW ||
          initialValues?.status === ENUMS.PROPOSAL_STATUS.PROCESSING)
      }
      onSubmit={(values) => isEdit && handleEditGoodsReceivingNotes(values)}
    />
  ) : (
    <h1>Loading</h1>
  );
};

export default SingleGoodsReceivingNoteDetails;
