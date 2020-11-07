import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleGoodsReceivingNoteDetails from "../../modules/GoodsReceivingNotes/SingleGoodsReceivingNoteDetails";

const EditGoodsReceivingNotePage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Chỉnh sửa phiếu nhập hàng" />
      <SingleGoodsReceivingNoteDetails isEdit={true} />
    </div>
  );
};

export default EditGoodsReceivingNotePage;
