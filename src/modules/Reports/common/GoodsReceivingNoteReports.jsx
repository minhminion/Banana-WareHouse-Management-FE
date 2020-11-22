import React, { useRef, useCallback, useMemo, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  SummaryState,
  IntegratedSummary,
  DataTypeProvider,
} from "@devexpress/dx-react-grid";
import { GridExporter } from "@devexpress/dx-react-grid-export";
import {
  Table,
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableSummaryRow,
  Toolbar,
  ExportPanel,
} from "@devexpress/dx-react-grid-material-ui";
import { makeStyles } from "@material-ui/core/styles";

import saveAs from "file-saver";

import { orders } from "./demoData";
import { formatNumberToVND } from "../../../common/helper";
import { useDispatch, useSelector } from "react-redux";
import handler from "../../GoodsReceivingNotes/constants/handler";
import { MODULE_NAME } from "../../GoodsReceivingNotes/constants/models";
import dayjs from "dayjs";
import { Typography } from "@material-ui/core";

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

const DateTypeProvider = (props) => (
  <DataTypeProvider {...props} formatterComponent={DateFormatter} />
);

const UserTypeProvider = (props) => (
  <DataTypeProvider
    {...props}
    formatterComponent={({ value }) => (
      <div>
        <strong>
          {`${value?.lastName} ${value?.firstName}` || "Lưu Bảo Minh"}
        </strong>
        <Typography variant="body2">
          {value?.email || "minhminion2015@gmail.com"}
        </Typography>
      </div>
    )}
  />
);

const MoneyTypeProvider = (props) => (
  <DataTypeProvider
    {...props}
    formatterComponent={({ value }) => <span>{formatNumberToVND(value)}</span>}
  />
);

// worksheet customization
/* eslint-disable no-param-reassign */
const customizeCell = (cell, row, column) => {
  if (row.OrderDate < new Date(2014, 2, 3)) {
    cell.font = { color: { argb: "AAAAAA" } };
  }
  if (row.SaleAmount > 15000) {
    if (column.name === "SaleAmount") {
      cell.font = { color: { argb: "000000" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFBB00" },
      };
    }
  }
  if (column.name === "SaleAmount") {
    cell.numFmt = "$0";
  }
};

const customizeSummaryCell = (cell) => {
  cell.font = { italic: true };
};

const customizeHeader = (worksheet) => {
  const generalStyles = {
    font: { bold: true },
    // fill: {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "D3D3D3" },
    //   bgColor: { argb: "D3D3D3" },
    // },
    alignment: { horizontal: "left" },
  };
  for (let rowIndex = 1; rowIndex < 6; rowIndex += 1) {
    // worksheet.mergeCells(rowIndex, 1, rowIndex, 3);
    // worksheet.mergeCells(rowIndex, 4, rowIndex, 6);
    Object.assign(worksheet.getRow(rowIndex).getCell(1), generalStyles);
    Object.assign(worksheet.getRow(rowIndex).getCell(3), generalStyles);
  }
  worksheet.getRow(1).height = 20;
  worksheet.getRow(1).getCell(1).font = { bold: true, size: 16 };
  worksheet.getRow(1).getCell(4).numFmt = "d mmmm yyyy";
  worksheet.getRow(1).getCell(4).font = { bold: true, size: 16 };
  worksheet.getColumn(1).values = [
    "Công ty: Banana Boys",
    "Address: 123 Nguyễn Trãi TP.Hồ Chí Minh",
    "Phone: 0934837765",
    "Website: bananawarehouse.vn",
  ];
  worksheet.addRow({});
};

const customizeFooter = (worksheet) => {
  const { lastRow } = worksheet;
  let currentRowIndex = lastRow.number + 2;
  for (let rowIndex = 0; rowIndex < 3; rowIndex += 1) {
    worksheet.mergeCells(
      currentRowIndex + rowIndex,
      1,
      currentRowIndex + rowIndex,
      6
    );
    Object.assign(worksheet.getRow(currentRowIndex + rowIndex).getCell(1), {
      font: { bold: true },
      alignment: { horizontal: "right" },
    });
  }
  worksheet.getRow(currentRowIndex).getCell(1).value =
    "If you have any questions, please contact John Smith.";
  currentRowIndex += 1;
  worksheet.getRow(currentRowIndex).getCell(1).value = "Phone: +111-111";
  currentRowIndex += 1;
  worksheet.getRow(currentRowIndex).getCell(1).value =
    "For demonstration purposes only";
  worksheet.getRow(currentRowIndex).getCell(1).font = { italic: true };
};
/* eslint-enable no-param-reassign */

const onSave = (workbook) => {
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      "DataGrid.xlsx"
    );
  });
};

const columns = [
  { name: "id", title: "Mã phiếu" },
  { name: "supplierName", title: "Nhà cung cấp" },
  { name: "status", title: "Trạng thái" },
  { name: "user", title: "Người tạo" },
  { name: "createdAt", title: "Ngày tạo" },
  { name: "CustomerStoreCity", title: "City" },
  { name: "CustomerStoreState", title: "State" },
  { name: "totalPrice", title: "Tổng tiền (đ)" },
];
const dateColumns = ["createdAt"];
const moneyColumns = ["totalPrice"];
const userCreatedColumns = ["user"];

const totalSummaryItems = [
  { columnName: "id", type: "count" },
  { columnName: "totalPrice", type: "sum" },
];
const tableColumnExtensions = [
  { columnName: "id", width: 120, align: "center" },
  { columnName: "user", width: 200, align: "left" },
  { columnName: "status", width: 120, align: "center" },
  { columnName: "createdAt", width: 120, align: "center" },
  { columnName: "totalPrice", align: "left" },
];

const messages = {
  count: "Số lượng",
  sum: "Tổng tiền (đ)",
};

const GoodsReceivingNoteReports = (props) => {
  const exporterRef = useRef(null);
  const { filter } = props;
  const dispatch = useDispatch();

  const { fetchGoodsReceivingNotes } = useMemo(() => handler(dispatch, props), [
    dispatch,
    props,
  ]);

  useEffect(() => {
    fetchGoodsReceivingNotes({
      ...filter,
      page: 1,
      limit: 1000,
    });
  }, [filter]);

  const { data } = useSelector((state) => state[MODULE_NAME].data);

  const startExport = useCallback(
    (options) => {
      exporterRef.current.exportGrid(options);
    },
    [exporterRef]
  );

  return (
    <Paper>
      <Grid rows={data || []} columns={columns}>
        <DateTypeProvider for={dateColumns} />
        <MoneyTypeProvider for={moneyColumns} />
        <UserTypeProvider for={userCreatedColumns} />
        <SummaryState totalItems={totalSummaryItems} />
        <IntegratedSummary />
        <Table columnExtensions={tableColumnExtensions} />
        {/* <VirtualTable
          // cellComponent={Cell}
          columnExtensions={tableColumnExtensions}
        /> */}
        <TableHeaderRow />
        <TableSummaryRow messages={messages} />
        {/* <Toolbar /> */}
        {/* <ExportPanel startExport={startExport} /> */}
      </Grid>

      <GridExporter
        ref={exporterRef}
        rows={orders}
        columns={columns}
        totalSummaryItems={totalSummaryItems}
        onSave={onSave}
        customizeCell={customizeCell}
        customizeSummaryCell={customizeSummaryCell}
        customizeHeader={customizeHeader}
        customizeFooter={customizeFooter}
      />
    </Paper>
  );
};

export default GoodsReceivingNoteReports;
