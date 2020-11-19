import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleGoodsDeliveryNoteDetails from "../../modules/GoodsDeliveryNotes/SingleGoodsDeliveryNoteDetails";

const root = [
  {
    link: "/goodsDeliveryNotes",
    title: "Danh sách phiếu xuất kho",
  },
];

const EditGoodsDeliveryNotePage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Chỉnh sửa phiếu xuất kho" root={root}/>
      <SingleGoodsDeliveryNoteDetails isEdit={true} />
    </div>
  );
};

export default EditGoodsDeliveryNotePage;
