import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleOrderDetails from "../../modules/Orders/SingleOrderDetails";

const root = [
  {
    link: "/suppliers",
    title: "Quản lý đơn hàng",
  },
];

const OrderDetailsPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Xem thông tin đơn hàng" root={root} />
      <SingleOrderDetails />
    </div>
  );
};

export default OrderDetailsPage;
