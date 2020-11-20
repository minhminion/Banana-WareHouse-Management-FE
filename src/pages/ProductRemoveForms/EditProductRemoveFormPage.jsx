import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleProductRemoveFormDetails from "../../modules/ProductRemoveForms/SingleProductRemoveFormDetails";

const root = [
  {
    link: "/productRemoveForms",
    title: "Danh sách phiếu hủy sản phẩm",
  },
];

const EditProductRemoveFormPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Chỉnh sửa phiếu hủy sản phẩm" root={root} />
      <SingleProductRemoveFormDetails isEdit={true} />
    </div>
  );
};

export default EditProductRemoveFormPage;
