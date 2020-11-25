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
import InfoIcon from "@material-ui/icons/Info";

import { Link } from "react-router-dom";
import { ENUMS } from "../../../common/constants";
import { useSelector } from "react-redux";
import { MODULE_NAME as MODULE_AUTHOR } from "../../Author/constants/models";
import { MODULE_NAME } from "../constants/models";
import HTMLReactParser from "html-react-parser";
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

const USER_ROLE = ENUMS.USER_ROLE;

const ListGoodsReceivingOfReturnsItem = ({ row, onCancel }) => {
  const theme = useTheme();
  const classes = useStyles();
  const { roleName } = useSelector((state) => state[MODULE_AUTHOR]);
  const isAuth =
    [
      USER_ROLE.WarehouseKeeper,
      USER_ROLE.WarehouseKeeperManager,
      USER_ROLE.Boss,
    ].indexOf(roleName) !== -1;

  const isEditable = () => {
    return isAuth;
  };


  const renderStatus = (status) => {
    const GOOD_RECEIVING_RETURN_STATUS = ENUMS.GOOD_RECEIVING_RETURN_STATUS;
    let label = "Không tìm thấy";
    let style = "notfound";
    switch (status) {
      case GOOD_RECEIVING_RETURN_STATUS.NEW:
        label = "Mới";
        style = "new";
        break;
      case GOOD_RECEIVING_RETURN_STATUS.PENDING:
        label = "Chờ xác nhận";
        style = "pending";
        break;
      case GOOD_RECEIVING_RETURN_STATUS.APPROVED:
        label = "Xác nhận";
        style = "approved";
        break;
      case GOOD_RECEIVING_RETURN_STATUS.DONE:
        label = "Hoàn tất";
        style = "done";
        break;
      case GOOD_RECEIVING_RETURN_STATUS.CANCELED:
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
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default ListGoodsReceivingOfReturnsItem;
