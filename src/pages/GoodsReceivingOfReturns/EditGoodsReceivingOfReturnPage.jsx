import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleGoodsReceivingOfReturnDetails from "../../modules/GoodsReceivingOfReturns/SingleGoodsReceivingOfReturnDetails";

const root = [
  {
    link: "/productRemoveForms",
    title: "Danh sách phiếu nhập kho trả hàng",
  },
];

const EditGoodsReceivingOfReturnPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Chỉnh sửa phiếu nhập kho trả hàng" root={root} />
      <SingleGoodsReceivingOfReturnDetails isEdit={true} />
    </div>
  );
};

export default EditGoodsReceivingOfReturnPage;
