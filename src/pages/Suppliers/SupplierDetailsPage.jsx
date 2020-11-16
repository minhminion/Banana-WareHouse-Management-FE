import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleSupplierDetails from "../../modules/Suppliers/SingleSupplierDetails";

const root = [
  {
    link: "/suppliers",
    title: "Quản lý nhà cung cấp",
  },
];

const SupplierDetailsPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Xem thông tin nhà cung cấp" root={root} />
      <SingleSupplierDetails />
    </div>
  );
};

export default SupplierDetailsPage;
