import React from "react";
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
} from "@material-ui/core";
import clsx from "clsx";

import EditIcon from "@material-ui/icons/Edit";
import BlockIcon from "@material-ui/icons/Block";
import InfoIcon from "@material-ui/icons/Info";

import { Link } from "react-router-dom";
import { ENUMS } from "../../../common/constants";
import { useSelector } from "react-redux";
import { MODULE_NAME as MODULE_AUTHOR } from "../../Author/constants/models";
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
  const classes = useStyles();
  const { roleName } = useSelector((state) => state[MODULE_AUTHOR]);
  const isAuth =
    roleName === ENUMS.USER_ROLE.Sale || roleName === ENUMS.USER_ROLE.Boss;

  const isEditable = () => {
    return isAuth;
  };

  const isAbleToCancel = () => {
    return isAuth;
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
        label = "Chờ xác nhận";
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
        <TableCell>{row.id}</TableCell>
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
          align="left"
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
    </TableBody>
  );
};

export default ListOrdersItem;