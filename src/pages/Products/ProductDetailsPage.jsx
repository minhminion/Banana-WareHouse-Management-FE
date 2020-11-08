import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleProductDetails from "../../modules/Products/SingleProductDetails";

const root = [
  {
    link: "/products",
    title: "Danh sách sản phẩm",
  },
];

const ProductDetailsPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Xem sản phẩm" root={root} />
      <SingleProductDetails />
    </div>
  );
};

export default ProductDetailsPage;
