import React, { useEffect, useMemo, useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  Legend,
  Tooltip,
  PieSeries,
} from "@devexpress/dx-react-chart-material-ui";
import {
  EventTracker,
  HoverState,
  Animation,
} from "@devexpress/dx-react-chart";
import { useDispatch, useSelector } from "react-redux";
import handler from "../constants/handler";
import { MODULE_NAME } from "../constants/models";
import { Box } from "@material-ui/core";
import ExportAndImportTabs from "./components/ExportAndImportTabs";
import { defaults } from "lodash";
import {
  GOOD_DELIVERY_STATUS,
  GOOD_RECEIVING_STATUS,
  ORDER_STATUS,
  PROPOSAL_STATUS,
} from "../../../common/constants/enums";

const chartData = [
  { amount: 2, status: 1 },
  { amount: 2, status: 2 },
  { amount: 3, status: 4 },
];

const getGoodsReceivingNoteStatusContent = (status) => {
  switch (status) {
    case GOOD_RECEIVING_STATUS.NEW:
      return "Mới tạo";
    case GOOD_RECEIVING_STATUS.PENDING:
      return "Chờ xác nhận";
    case GOOD_RECEIVING_STATUS.APPROVED:
      return "Đã xác nhận";
    case GOOD_RECEIVING_STATUS.DONE:
      return "Hoàn tất";
    case GOOD_RECEIVING_STATUS.CANCELED:
      return "Hủy";
    default:
      return "Unknown step";
  }
};

const getGoodsDeliveryNoteStatusContent = (status) => {
  switch (status) {
    case GOOD_DELIVERY_STATUS.NEW:
      return "Mới tạo";
    case GOOD_DELIVERY_STATUS.PENDING:
      return "Chờ xác nhận";
    case GOOD_DELIVERY_STATUS.APPROVED:
      return "Đã xác nhận";
    case GOOD_DELIVERY_STATUS.DONE:
      return "Hoàn tất";
    case GOOD_DELIVERY_STATUS.CANCELED:
      return "Hủy";
    default:
      return "Unknown step";
  }
};

const getOrderStatusContent = (status) => {
  switch (status) {
    case ORDER_STATUS.NEW:
      return "Mới tạo";
    case ORDER_STATUS.PROCESSING:
      return "Đang xử lý";
    case ORDER_STATUS.EXPORTED:
      return "Đã xuất kho";
    case ORDER_STATUS.DONE:
      return "Hoàn tất";
    case ORDER_STATUS.CANCELED:
      return "Đã hủy";
    default:
      return "Unknown step";
  }
};

const getProposalStatusContent = (status) => {
  switch (status) {
    case PROPOSAL_STATUS.NEW:
      return "Mới tạo";
    case PROPOSAL_STATUS.PROCESSING:
      return "Đang thực hiện";
    case PROPOSAL_STATUS.DONE:
      return "Hoàn tất";
    case PROPOSAL_STATUS.FORCE_DONE:
      return "Buộc hoàn tất";
    case PROPOSAL_STATUS.CANCELED:
      return "Hủy";
    default:
      return "Unknown step";
  }
};

const target = "exportAndImport";

const ExportAndImport = (props) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("goodsDeliveryNote");
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);

  const { getExportAndImport } = useMemo(() => handler(dispatch, props), [
    dispatch,
    props,
  ]);

  const { data, isLoading } = useSelector(
    (state) => state[MODULE_NAME][target]
  );

  useEffect(() => {
    getExportAndImport({
      fromDate: new Date(0, 0, 0),
      toDate: new Date(),
    });
  }, []);

  const getStatusContent = (status) => {
    switch (selectedOption) {
      case "goodsReceivingNote":
        return getGoodsReceivingNoteStatusContent(status);
      case "goodsDeliveryNote":
        return getGoodsDeliveryNoteStatusContent(status);
      case "order":
        return getOrderStatusContent(status);
      case "purchaseProposalForm":
        return getProposalStatusContent(status);
      default:
        return -1;
    }
  };

  useEffect(() => {
    const detailsData = data[selectedOption]?.details || [];
    const newData = detailsData.map((item) => ({
      amount: item.amount,
      status: getStatusContent(item.status),
    }));
    setPieData(newData || chartData);
  }, [selectedOption, data]);

  useEffect(() => {
    const newData = Object.keys(data).map((i) => ({
      name: i,
      total: data[i].total,
    }));
    setLineData(newData);
  }, [data]);

  return (
    <Box component={Paper} p={2}>
      <ExportAndImportTabs
        value={selectedOption}
        onChange={(value) => setSelectedOption(value)}
      />
      <Box>
        <Chart data={pieData}>
          <PieSeries valueField="amount" argumentField="status" />
          <Legend />
          <Animation />
          <EventTracker />
          <Tooltip />
          <HoverState />
        </Chart>
      </Box>
      {/* </Box> */}
    </Box>
  );
};

export default ExportAndImport;
