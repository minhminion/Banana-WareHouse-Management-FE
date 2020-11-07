import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleGoodsReceivingNoteDetails from "../../modules/GoodsReceivingNotes/SingleGoodsReceivingNoteDetails";

const GoodsReceivingNoteDetailsPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Xem phiếu nhập hàng" />
      <SingleGoodsReceivingNoteDetails />
    </div>
  );
};

export default GoodsReceivingNoteDetailsPage;
