import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import AddProduct from "../../modules/Products/AddProduct";

const root = [
  {
    link: "/products",
    title: "Danh sách sản phẩm",
  },
];

const AddProductPage = () => {
  return (
    <div className="page">
      <CustomBreadcrumbs title="Tạo sản phẩm" root={root} />
      <AddProduct />
    </div>
  );
};

export default AddProductPage;
