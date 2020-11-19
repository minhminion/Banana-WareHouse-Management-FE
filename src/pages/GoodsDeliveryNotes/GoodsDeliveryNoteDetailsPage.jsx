import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleGoodsDeliveryNoteDetails from "../../modules/GoodsDeliveryNotes/SingleGoodsDeliveryNoteDetails";

const root = [
  {
    link: "/goodsDeliveryNotes",
    title: "Danh sách phiếu xuất kho",
  },
];

const GoodsDeliveryNoteDetailsPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Xem phiếu xuất kho" root={root}/>
      <SingleGoodsDeliveryNoteDetails />
    </div>
  );
};

export default GoodsDeliveryNoteDetailsPage;
