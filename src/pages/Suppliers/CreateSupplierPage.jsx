import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import CreateSupplier from "../../modules/Suppliers/CreateSupplier";

const root = [
  {
    link: "/suppliers",
    title: "Quản lý nhà cung cấp",
  },
];

const CreateSupplierPage = () => {
  return (
    <div className="page">
      <CustomBreadcrumbs title="Thêm nhà cung cấp" root={root}/>
      <CreateSupplier />
    </div>
  );
};

export default CreateSupplierPage;