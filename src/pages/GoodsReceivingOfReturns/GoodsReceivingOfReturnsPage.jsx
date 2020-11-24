import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import ListGoodsReceivingOfReturns from "../../modules/GoodsReceivingOfReturns/ListGoodsReceivingOfReturns";

const GoodsReceivingOfReturnsPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Danh sách phiếu nhập kho trả hàng" />
      <ListGoodsReceivingOfReturns />
    </div>
  );
};

export default GoodsReceivingOfReturnsPage;
