import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleProductRemoveFormDetails from "../../modules/ProductRemoveForms/SingleProductRemoveFormDetails";

const root = [
  {
    link: "/productRemoveForms",
    title: "Danh sách phiếu hủy sản phẩm",
  },
];

const ProductRemoveFormDetailsPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Xem thông tin phiểu hủy sản phẩm" root={root} />
      <SingleProductRemoveFormDetails />
    </div>
  );
};

export default ProductRemoveFormDetailsPage;
