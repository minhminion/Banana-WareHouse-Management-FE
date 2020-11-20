import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import ListProductRemoveForms from "../../modules/ProductRemoveForms/ListProductRemoveForms";

const ProductRemoveFormsPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Danh sách phiếu hủy sản phẩm" />
      <ListProductRemoveForms />
    </div>
  );
};

export default ProductRemoveFormsPage;
