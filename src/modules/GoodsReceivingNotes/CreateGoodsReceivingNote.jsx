import { useSnackbar } from 'notistack';
import React from 'react'
import { useHistory } from 'react-router-dom';
import GoodsReceivingNoteDetails from './common/GoodsReceivingNoteDetails';

const CreateGoodsReceivingNote = () => {
  const history = useHistory()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  const handleSubmit = async (values) => {
    enqueueSnackbar(`Đang tạo phiếu nhập hàng...`, {
      variant: "info",
      key: "creating-goods-receiving-note",
      persist: true,
      preventDuplicate: true,
    });
    setTimeout(() => {
      closeSnackbar("creating-goods-receiving-note");
      history.go(-1)
    }
    ,1000)
    // const result = await createProposal(values);
    // closeSnackbar("creating-product");
    // if (result.id) {
    // history.go(-1);
    // } else {
    //   notifyError(enqueueSnackbar, result);
    // }
  };

  return (
    <GoodsReceivingNoteDetails onSubmit={handleSubmit} okLabel="Tạo phiếu" />
  )
}

export default CreateGoodsReceivingNote
