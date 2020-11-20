import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import CreateProductRemoveForm from "../../modules/ProductRemoveForms/CreateProductRemoveForm";

const root = [
  {
    link: "/productRemoveForms",
    title: "Danh sách phiếu hủy sản phẩm",
  },
];

const CreateProductRemoveFormPage = () => {
  return (
    <div className="page">
      <CustomBreadcrumbs title="Tạo phiếu hủy sản phẩm" root={root}/>
      <CreateProductRemoveForm />
    </div>
  );
};

export default CreateProductRemoveFormPage;