import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleSupplierDetails from "../../modules/Suppliers/SingleSupplierDetails";

const root = [
  {
    link: "/suppliers",
    title: "Quản lý nhà cung cấp",
  },
];

const EditSupplierPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Chỉnh sửa thông tin nhà cung cấp" root={root}/>
      <SingleSupplierDetails isEdit={true} />
    </div>
  );
};

export default EditSupplierPage;
