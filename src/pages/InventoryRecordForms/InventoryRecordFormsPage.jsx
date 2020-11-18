import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import ListInventoryRecordForms from "../../modules/InventoryRecordForms/ListInventoryRecordForms";

const InventoryRecordFormsPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Danh sách phiếu kiểm kho" />
      <ListInventoryRecordForms />
    </div>
  );
};

export default InventoryRecordFormsPage;
