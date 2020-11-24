import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleGoodsReceivingOfReturnDetails from "../../modules/GoodsReceivingOfReturns/SingleGoodsReceivingOfReturnDetails";

const root = [
  {
    link: "/productRemoveForms",
    title: "Danh sách phiếu nhập kho trả hàng",
  },
];

const GoodsReceivingOfReturnDetailsPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Xem thông tin phiểu nhập kho trả hàng" root={root} />
      <SingleGoodsReceivingOfReturnDetails />
    </div>
  );
};

export default GoodsReceivingOfReturnDetailsPage;
