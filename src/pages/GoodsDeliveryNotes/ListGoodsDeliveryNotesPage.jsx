import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import ListGoodsDeliveryNotes from "../../modules/GoodsDeliveryNotes/ListGoodsDeliveryNotes";

const ListGoodsDeliveryNotesPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Danh sách phiếu xuất kho" />
      <ListGoodsDeliveryNotes />
    </div>
  );
};

export default ListGoodsDeliveryNotesPage;
