import React from "react";
import {
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Chip,
  Box,
  IconButton,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import dayjs from "dayjs";
import clsx from "clsx";

import EditIcon from "@material-ui/icons/Edit";
import BlockIcon from "@material-ui/icons/Block";
import InfoIcon from "@material-ui/icons/Info";

import { Link } from "react-router-dom";
import { ENUMS } from "../../../common/constants";
import { useSelector } from "react-redux";
import { MODULE_NAME as MODULE_AUTHOR } from "../../Author/constants/models";

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
    "&.approved": {
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

const ListGoodsDeliveryNotesItem = ({ row, onCancel }) => {
  const theme = useTheme();
  const classes = useStyles();
  const { roleName } = useSelector((state) => state[MODULE_AUTHOR]);
  const isAuth =
    roleName === ENUMS.USER_ROLE.Boss ||
    roleName === ENUMS.USER_ROLE.WarehouseKeeper ||
    roleName === ENUMS.USER_ROLE.WarehouseKeeperManager;

  const isEditable = (rowStatus) => {
    return (
      isAuth &&
      rowStatus !== ENUMS.GOOD_DELIVERY_STATUS.CANCELED &&
      rowStatus !== ENUMS.GOOD_DELIVERY_STATUS.DONE
    );
  };

  const isAbleToCancel = (rowStatus) => {
    return (
      isAuth &&
      (rowStatus === ENUMS.GOOD_DELIVERY_STATUS.NEW ||
        rowStatus === ENUMS.GOOD_DELIVERY_STATUS.PENDING ||
        rowStatus === ENUMS.GOOD_DELIVERY_STATUS.APPROVED)
    );
  };

  const renderStatus = (status) => {
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

  return (
    <TableBody>
      <TableRow style={{ marginBottom: 0 }}>
        {/* <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
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
        <TableCell align="center">{renderStatus(row.status)}</TableCell>
        <TableCell
          align="left"
          style={{
            color: theme.palette.primary.dark,
          }}
        >
          <strong>{dayjs(row.createdAt).format("DD/MM/YYYY")}</strong>
        </TableCell>
        {/* Action on row */}
        <TableCell align="center">
          <Box mr={1} clone>
            <Link
              to={`/goodsDeliveryNotes/${row.id}${
                isEditable(row.status) ? `/edit` : ""
              }`}
            >
              <IconButton>
                {isEditable(row.status) ? <EditIcon /> : <InfoIcon />}
              </IconButton>
            </Link>
          </Box>
          {isAbleToCancel(row.status) && (
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

export default ListGoodsDeliveryNotesItem;
