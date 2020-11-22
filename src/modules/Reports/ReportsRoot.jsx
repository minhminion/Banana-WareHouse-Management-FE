import { Box } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import ReportsFilter from "./common/ReportsFilter";
import ReportsTabs from "./common/ReportsTabs";
import ProductReportsTable from "./common/ProductReportsTable";
import GoodsReceivingNoteReports from "./common/GoodsReceivingNoteReports";

const ReportsRoot = (props) => {
  const [selectedOption, setSelectedOption] = useState("goodsDeliveryNote");
  const [filter, setFilter] = useState({});

  const handleFilterDate = (values) => {
    setFilter(values);
  };

  const renderTable = (select, filter) => {
    switch (select) {
      case "products":
        return <ProductReportsTable filter={filter} />;
      case "goodsReceivingNote":
        return <GoodsReceivingNoteReports filter={filter} />;
      default:
        return <h5>No content</h5>;
    }
  };

  return (
    <div>
      <ReportsTabs
        value={selectedOption}
        onChange={(value) => setSelectedOption(value)}
      />
      <Box ml={2} mr={2}>
        <ReportsFilter onSubmit={handleFilterDate} />
        {renderTable(selectedOption, filter)}
      </Box>
    </div>
  );
};

export default ReportsRoot;
