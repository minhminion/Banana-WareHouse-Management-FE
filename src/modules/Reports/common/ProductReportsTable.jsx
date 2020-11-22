import React, { useRef, useCallback, useMemo, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import {
  Table,
  Grid,
  VirtualTable,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";
import { makeStyles } from "@material-ui/core/styles";

import { formatNumberToVND } from "../../../common/helper";
import { MODULE_NAME } from "../../Products/constants/models";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import handler from "../../Products/constants/handler";
import { Link } from "react-router-dom";

const getCellStyle = ({ OrderDate, SaleAmount }, column) => {
  const style = {};
  if (OrderDate < new Date(2014, 2, 3)) {
    style.color = "#AAAAAA";
  }
  if (SaleAmount > 15000) {
    if (column.name === "OrderNumber") {
      style.fontWeight = "bold";
    }
    if (column.name === "SaleAmount") {
      style.backgroundColor = "#FFBB00";
      style.color = "#000000";
    }
  }
  return style;
};

const useCellStyles = makeStyles({
  cell: ({ row, column }) => getCellStyle(row, column),
});

const Cell = (props) => {
  const classes = useCellStyles(props);
  return <VirtualTable.Cell {...props} className={classes.cell} />;
};

const DateFormatter = ({ value }) => (
  <span>{dayjs(value).format("DD/MM/YYYY")}</span>
);

const DirectTypeProvider = (props) => (
  <DataTypeProvider
    {...props}
    formatterComponent={({ value }) => (
      <Link to={`/products/${value}`}>
        <span>{value}</span>
      </Link>
    )}
  />
);

const DateTypeProvider = (props) => (
  <DataTypeProvider {...props} formatterComponent={DateFormatter} />
);

const CategoryTypeProvider = (props) => (
  <DataTypeProvider
    {...props}
    formatterComponent={({ value }) => <span>{value.name}</span>}
  />
);

const MoneyTypeProvider = (props) => (
  <DataTypeProvider
    {...props}
    formatterComponent={({ value }) => <span>{formatNumberToVND(value)}</span>}
  />
);

const columns = [
  { name: "sku", title: "Mã SKU" },
  { name: "name", title: "Tên sản phẩm" },
  { name: "productCategory", title: "Tên danh mục" },
  { name: "quantity", title: "SL" },
  { name: "quantityForSale", title: "SL đặt bán" },
  { name: "quantityOrdered", title: "SL đặt mua" },
  { name: "quantityReturned", title: "SL trả về" },
  { name: "price", title: "Giá bán (đ)" },
  { name: "purchasePrice", title: "Giá mua (đ)" },
  { name: "defaultUnit", title: "Đơn vị tính" },
  { name: "createdAt", title: "Ngày tạo" },
];

const directColumns = ["sku"];
const dateColumns = ["createdAt"];
const categoryColumns = ["productCategory"];
const moneyColumns = ["price", "purchasePrice"];
// const totalSummaryItems = [
//   { columnName: "id", type: "count" },
//   { columnName: "totalPrice", type: "sum" },
// ];
const tableColumnExtensions = [
  { columnName: "sku", width: 140, align: "center" },
  { columnName: "quantity", width: 50, align: "center" },
  { columnName: "quantityForSale", width: 90, align: "center" },
  { columnName: "quantityOrdered", width: 90, align: "center" },
  { columnName: "quantityReturned", width: 90, align: "center" },
  { columnName: "productCategory", width: 140, align: "left" },
  { columnName: "defaultUnit", width: 100, align: "center" },
  { columnName: "createdAt", width: 100, align: "center" },
  { columnName: "price", width: 100, align: "right" },
  { columnName: "purchasePrice", width: 100, align: "right" },
];

const ProductReportsTable = (props) => {
  const { filter } = props;
  const dispatch = useDispatch();

  const { fetchProduct } = useMemo(() => handler(dispatch, props), [
    dispatch,
    props,
  ]);

  useEffect(() => {
    fetchProduct({
      ...filter,
      page: 1,
      limit: 1000,
    });
  }, [filter]);

  const { data } = useSelector((state) => state[MODULE_NAME].data);

  return (
    <Paper>
      <Grid rows={data || []} columns={columns}>
        <DirectTypeProvider for={directColumns} />
        <DateTypeProvider for={dateColumns} />
        <CategoryTypeProvider for={categoryColumns} />
        <MoneyTypeProvider for={moneyColumns} />
        {/* <SummaryState totalItems={totalSummaryItems} /> */}
        {/* <IntegratedSummary /> */}
        <Table columnExtensions={tableColumnExtensions} />
        {/* <VirtualTable
          // cellComponent={Cell}
          columnExtensions={tableColumnExtensions}
        /> */}
        <TableHeaderRow />
        {/* <TableSummaryRow messages={messages} /> */}
        {/* <Toolbar /> */}
        {/* <ExportPanel startExport={startExport} /> */}
      </Grid>
    </Paper>
  );
};

export default ProductReportsTable;
