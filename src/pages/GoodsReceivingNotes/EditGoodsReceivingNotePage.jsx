import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleGoodsReceivingNoteDetails from "../../modules/GoodsReceivingNotes/SingleGoodsReceivingNoteDetails";

const root = [
  {
    link: "/goodsReceivingNotes",
    title: "Danh sách phiếu nhập hàng",
  },
];

const EditGoodsReceivingNotePage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Chỉnh sửa phiếu nhập hàng" root={root}/>
      <SingleGoodsReceivingNoteDetails isEdit={true} />
    </div>
  );
};

export default EditGoodsReceivingNotePage;
