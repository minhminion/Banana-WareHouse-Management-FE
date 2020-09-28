import React from "react";
import Member from "../modules/Member/Member";
import CustomBreadcrumbs from "../common/components/Breadcrumb";
const MembersPage = () => {
  return (
    <div className="page">
      <CustomBreadcrumbs title="Member Manager" />
      <Member />
    </div>
  );
};

export default MembersPage;
