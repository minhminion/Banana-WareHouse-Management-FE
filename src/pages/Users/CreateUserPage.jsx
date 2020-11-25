import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import CreateUser from "../../modules/Users/CreateUser";

const root = [
  {
    link: "/users",
    title: "Quản lý tài khoản",
  },
];

const CreateUserPage = () => {
  return (
    <div className="page">
      <CustomBreadcrumbs title="Tạo tài khoản mới" root={root} />
      <CreateUser />
    </div>
  );
};

export default CreateUserPage;
