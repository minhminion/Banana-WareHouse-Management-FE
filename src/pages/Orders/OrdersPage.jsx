import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import ListOrders from "../../modules/Orders/ListOrders";

const OrdersPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Quản lý đơn hàng" />
      <ListOrders />
    </div>
  );
};

export default OrdersPage;
