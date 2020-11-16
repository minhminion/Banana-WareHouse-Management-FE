import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import ListSuppliers from "../../modules/Suppliers/ListSuppliers";

const SuppliersPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Quản lý nhà cung cấp" />
      <ListSuppliers />
    </div>
  );
};

export default SuppliersPage;
