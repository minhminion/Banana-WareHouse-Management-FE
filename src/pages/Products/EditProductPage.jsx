import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleProductDetails from "../../modules/Products/SingleProductDetails";

const root = [
  {
    link: "/products",
    title: "Danh sách sản phẩm",
  },
];

const EditProductPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Chỉnh sửa sản phẩm" root={root} />
      <SingleProductDetails isEdit={true} />
    </div>
  );
};

export default EditProductPage;
