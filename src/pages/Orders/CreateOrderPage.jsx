import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import CreateOrder from "../../modules/Orders/CreateOrder";

const root = [
  {
    link: "/orders",
    title: "Quản lý đơn hàng",
  },
];

const CreateOrderPage = () => {
  return (
    <div className="page">
      <CustomBreadcrumbs title="Tạo đơn hàng" root={root}/>
      <CreateOrder />
    </div>
  );
};

export default CreateOrderPage;