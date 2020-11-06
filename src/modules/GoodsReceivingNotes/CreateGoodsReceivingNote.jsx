import { useSnackbar } from 'notistack';
import React from 'react'
import GoodsReceivingNoteDetails from './common/GoodsReceivingNoteDetails';

const CreateGoodsReceivingNote = () => {
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  const handleSubmit = async (values) => {
    enqueueSnackbar(`Đang tạo phiếu đề nghị...`, {
      variant: "info",
      key: "creating-product",
      persist: true,
      preventDuplicate: true,
    });
    // const result = await createProposal(values);
    closeSnackbar("creating-product");
    // if (result.id) {
    //   history.go(-1);
    // } else {
    //   notifyError(enqueueSnackbar, result);
    // }
  };

  return (
    <GoodsReceivingNoteDetails onSubmit={handleSubmit} okLabel="Tạo phiếu" />
  )
}

export default CreateGoodsReceivingNote
