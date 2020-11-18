import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleInventoryRecordFormDetails from "../../modules/InventoryRecordForms/SingleInventoryRecordFormDetails";

const root = [
  {
    link: "/inventoryRecordForms",
    title: "Danh sách phiếu kiểm kho",
  },
];

const EditInventoryRecordFormPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Chỉnh sửa phiếu kiểm kho" root={root} />
      <SingleInventoryRecordFormDetails isEdit={true} />
    </div>
  );
};

export default EditInventoryRecordFormPage;
