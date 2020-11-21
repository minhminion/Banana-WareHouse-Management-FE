import React from "react";
import CustomBreadcrumbs from "../../common/components/Breadcrumb";
import ReportsRoot from "../../modules/Reports/ReportsRoot";

const ReportsPage = () => {
  return (
    <div>
      <CustomBreadcrumbs title="Báo cáo" />
      <ReportsRoot />
    </div>
  );
};

export default ReportsPage;
