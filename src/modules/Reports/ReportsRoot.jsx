import React from "react";
import ReportsFilter from "./common/ReportsFilter";
import ReportsTable from "./common/ReportsTable";
import ReportsTabs from "./common/ReportsTabs";

const ReportsRoot = () => {
  return (
    <div>
      <ReportsTabs />
      <ReportsFilter />
      <ReportsTable />
    </div>
  );
};

export default ReportsRoot;
