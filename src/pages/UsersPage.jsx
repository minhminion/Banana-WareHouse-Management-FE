import React from "react";
import CustomBreadcrumbs from "../common/components/Breadcrumb";
import ListUsers from "../modules/Users/ListUsers";
const UsersPage = () => {
  return (
    <div className="page">
      <CustomBreadcrumbs title="Member Manager" />
      <ListUsers />
    </div>
  );
};

export default UsersPage;
