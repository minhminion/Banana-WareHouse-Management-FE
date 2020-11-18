import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleInventoryRecordFormDetails from "../../modules/InventoryRecordForms/SingleInventoryRecordFormDetails";

const root = [
  {
    link: "/inventoryRecordForms",
    title: "Danh sách phiếu kiểm kho",
  },
];

const InventoryRecordFormDetailsPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Xem thông tin phiểu kiểm kho" root={root} />
      <SingleInventoryRecordFormDetails />
    </div>
  );
};

export default InventoryRecordFormDetailsPage;
