import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import CreateGoodsReceivingOfReturn from "../../modules/GoodsReceivingOfReturns/CreateGoodsReceivingOfReturn";

const root = [
  {
    link: "/productRemoveForms",
    title: "Danh sách phiếu nhập kho trả hàng",
  },
];

const CreateGoodsReceivingOfReturnPage = () => {
  return (
    <div className="page">
      <CustomBreadcrumbs title="Tạo phiếu nhập kho trả hàng" root={root}/>
      <CreateGoodsReceivingOfReturn />
    </div>
  );
};

export default CreateGoodsReceivingOfReturnPage;