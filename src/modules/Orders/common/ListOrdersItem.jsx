import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Chip,
  Box,
  IconButton,
  makeStyles,
  useTheme,
  TableHead,
  Table,
  Collapse,
} from "@material-ui/core";
import clsx from "clsx";

import EditIcon from "@material-ui/icons/Edit";
import BlockIcon from "@material-ui/icons/Block";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import InfoIcon from "@material-ui/icons/Info";

import { Link, useHistory } from "react-router-dom";
import { ENUMS } from "../../../common/constants";
import { useSelector } from "react-redux";
import { MODULE_NAME as MODULE_AUTHOR } from "../../Author/constants/models";
import { MODULE_NAME as MODULE_GOODS_DELIVERY_NOTES } from "../../GoodsDeliveryNotes/constants/models";
import { MODULE_NAME } from "../constants/models";
import { formatNumberToVND } from "../../../common/helper";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  chip: {
    width: 120,
    "&.new": {
      color: theme.palette.common.white,
      background: theme.palette.success.light,
    },
    "&.pending": {
      color: theme.palette.common.white,
      background: "#b19cd9",
    },
    "&.exported": {
      color: theme.palette.common.white,
      background: theme.palette.warning.main,
    },
    "&.done": {
      color: theme.palette.common.white,
      background: theme.palette.info.main,
    },
    "&.canceled": {
      color: theme.palette.common.white,
      background: theme.palette.error.main,
    },
  },
  expandTable: {
    "& tr": {
      boxShadow: "none !important",
    },
    "& th": {
      border: "none",
    },
    "& td": {
      border: "none",
    },
  },
  expandCell: {
    // padding: theme.spacing(2),
    transition: "0.3s padding ease-in",
    "&.collapsed": {
      padding: 0,
      border: "none",
    },
  },
}));

const ListOrdersItem = ({ row, onCancel }) => {
  const theme = useTheme();
  const history = useHistory()
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { roleName } = useSelector((state) => state[MODULE_AUTHOR]);
  const isAuth =
    roleName === ENUMS.USER_ROLE.Sale || roleName === ENUMS.USER_ROLE.Boss;

  const isEditable = () => {
    return isAuth;
  };

  const isAbleToCancel = () => {
    return isAuth;
  };

  const renderGoodsDeliveryNotesStatus = (status) => {
    const goodsDeliveryNotesStatus = ENUMS.GOOD_DELIVERY_STATUS;
    let label = "Không tìm thấy";
    let style = "notfound";
    switch (status) {
      case goodsDeliveryNotesStatus.NEW:
        label = "Mới";
        style = "new";
        break;
      case goodsDeliveryNotesStatus.PENDING:
        label = "Chờ xác nhận";
        style = "pending";
        break;
      case goodsDeliveryNotesStatus.APPROVED:
        label = "Xác nhận";
        style = "approved";
        break;
      case goodsDeliveryNotesStatus.DONE:
        label = "Hoàn tất";
        style = "done";
        break;
      case goodsDeliveryNotesStatus.CANCELED:
        label = "Hủy";
        style = "canceled";
        break;
      default:
        break;
    }
    return <Chip className={clsx(classes.chip, style)} label={label} />;
  };

  const renderStatus = (status) => {
    const ordersStatus = ENUMS.ORDER_STATUS;
    let label = "Không tìm thấy";
    let style = "notfound";
    switch (status) {
      case ordersStatus.NEW:
        label = "Mới tạo";
        style = "new";
        break;
      case ordersStatus.PROCESSING:
        label = "Đang xử lý";
        style = "pending";
        break;
      case ordersStatus.EXPORTED:
        label = "Đã xuất kho";
        style = "exported";
        break;
      case ordersStatus.DONE:
        label = "Hoàn tất";
        style = "done";
        break;
      case ordersStatus.CANCELED:
        label = "Đã hủy";
        style = "canceled";
        break;
      default:
        break;
    }
    return <Chip className={clsx(classes.chip, style)} label={label} />;
  };

  return (
    <TableBody>
      <TableRow style={{ marginBottom: 0 }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.id}</TableCell>
        <TableCell component="th" scope="row">
          <div>
            <strong>
              {`${row.user?.lastName} ${row.user?.firstName}` || "Lưu Bảo Minh"}
            </strong>
            <Typography variant="body2">
              {row.user?.email || "minhminion2015@gmail.com"}
            </Typography>
          </div>
        </TableCell>
        <TableCell align="left">{formatNumberToVND(row.totalPrice)}</TableCell>
        <TableCell
          align="center"
          style={{
            color: theme.palette.primary.dark,
          }}
        >
          <strong>{dayjs(row.createdAt).format("DD/MM/YYYY")}</strong>
        </TableCell>
        <TableCell align="center">{renderStatus(row.status)}</TableCell>
        {/* Action on row */}
        <TableCell align="center">
          <Box mr={1} clone>
            <Link
              to={`/${MODULE_NAME}/${row.id}${
                isEditable(row.status) ? `/edit` : ""
              }`}
            >
              <IconButton>
                {isEditable() ? <EditIcon /> : <InfoIcon />}
              </IconButton>
            </Link>
          </Box>
          {isAbleToCancel() && (
            <Box clone>
              <IconButton color="secondary" onClick={() => onCancel(row)}>
                <BlockIcon />
              </IconButton>
            </Box>
          )}
        </TableCell>
      </TableRow>
      <TableRow style={{ boxShadow: theme.boxShadows.inset }}>
        <TableCell
          className={clsx(classes.expandCell, open ? "expended" : "collapsed")}
          colSpan={7}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6">Danh sách phiếu xuất kho</Typography>
              <Table
                size="small"
                aria-label="purchases"
                className={classes.expandTable}
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: 200 }} align="center">
                      Mã phiếu xuất kho
                    </TableCell>
                    <TableCell align="center">Tình trạng</TableCell>
                    <TableCell align="center">Ngày tạo</TableCell>
                    <TableCell align="left">Tổng tiền (đ)</TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.goodsDeliveryNotes?.length > 0 &&
                    row.goodsDeliveryNotes.map((note) => (
                      <TableRow key={note.id}>
                        <TableCell align="center">{note.id}</TableCell>
                        <TableCell align="center">
                          {renderGoodsDeliveryNotesStatus(note.status)}
                        </TableCell>
                        <TableCell align="center">
                          <strong>
                            {dayjs(note.createdAt).format("DD/MM/YYYY")}
                          </strong>
                        </TableCell>
                        <TableCell align="left">
                          {formatNumberToVND(note.totalPrice)}
                        </TableCell>
                        <TableCell align="left">
                          <IconButton onClick={() => history.push(`/${MODULE_GOODS_DELIVERY_NOTES}/${note.id}`)}>
                            <ArrowForwardIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default ListOrdersItem;
