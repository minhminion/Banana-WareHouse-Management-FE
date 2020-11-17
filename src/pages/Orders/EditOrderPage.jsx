import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import SingleOrderDetails from "../../modules/Orders/SingleOrderDetails";

const root = [
  {
    link: "/suppliers",
    title: "Quản lý nhà cung cấp",
  },
];

const EditOrderPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Chỉnh sửa thông tin nhà cung cấp" root={root}/>
      <SingleOrderDetails isEdit={true} />
    </div>
  );
};

export default EditOrderPage;
