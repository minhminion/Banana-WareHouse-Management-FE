import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleGoodsReceivingNoteDetails from "../../modules/GoodsReceivingNotes/SingleGoodsReceivingNoteDetails";

const root = [
  {
    link: "/goods-receiving-notes",
    title: "Danh sách phiếu nhập hàng",
  },
];

const GoodsReceivingNoteDetailsPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Xem phiếu nhập hàng" root={root}/>
      <SingleGoodsReceivingNoteDetails />
    </div>
  );
};

export default GoodsReceivingNoteDetailsPage;
