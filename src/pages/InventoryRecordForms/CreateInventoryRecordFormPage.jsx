import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import CreateInventoryRecordForm from "../../modules/InventoryRecordForms/CreateInventoryRecordForm";

const root = [
  {
    link: "/inventoryRecordForms",
    title: "Danh sách phiếu kiểm kho",
  },
];

const CreateInventoryRecordFormPage = () => {
  return (
    <div className="page">
      <CustomBreadcrumbs title="Tạo phiếu kiểm kho" root={root}/>
      <CreateInventoryRecordForm />
    </div>
  );
};

export default CreateInventoryRecordFormPage;