import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Chip,
  Box,
  IconButton,
  Collapse,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import dayjs from "dayjs";
import clsx from "clsx";

import EditIcon from "@material-ui/icons/Edit";
import BlockIcon from "@material-ui/icons/Block";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import InfoIcon from "@material-ui/icons/Info";

import { Link, useHistory } from "react-router-dom";
import { ENUMS } from "../../../common/constants";
import { useSelector } from "react-redux";
import { MODULE_NAME as MODULE_AUTHOR } from "../../Author/constants/models";
import { MODULE_NAME as MODULE_GOODS_RECEIVING_NOTES } from "../../GoodsReceivingNotes/constants/models";
import { formatNumberToVND } from "../../../common/helper";

const useStyles = makeStyles((theme) => ({
  chip: {
    width: 120,
    "&.new": {
      color: theme.palette.common.white,
      background: theme.palette.success.light,
    },
    "&.processing": {
      color: theme.palette.common.white,
      background: theme.palette.warning.main,
    },
    "&.done": {
      color: theme.palette.common.white,
      background: theme.palette.info.main,
    },
    "&.delete": {
      color: theme.palette.common.white,
      background: theme.palette.error.main,
    },
    "&.force__done": {
      color: theme.palette.common.white,
      background: "#b19cd9",
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

const ListProposalItem = ({ row, onCancel }) => {
  const theme = useTheme();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { roleName } = useSelector((state) => state[MODULE_AUTHOR]);
  const isAuth =
    roleName === ENUMS.USER_ROLE.Boss || roleName === ENUMS.USER_ROLE.Sale;

  const isEditable = (rowStatus) => {
    return (
      isAuth &&
      rowStatus !== ENUMS.PROPOSAL_STATUS.CANCELED &&
      rowStatus !== ENUMS.PROPOSAL_STATUS.DONE &&
      rowStatus !== ENUMS.PROPOSAL_STATUS.FORCE_DONE
    );
  };

  const isAbleToDelete = (rowStatus) => {
    return (
      isAuth &&
      (rowStatus === ENUMS.PROPOSAL_STATUS.NEW ||
        rowStatus === ENUMS.PROPOSAL_STATUS.PROCESSING)
    );
  };

  const renderGoodsReceivingNotesStatus = (status) => {
    const goodsReceivingNotesStatus = ENUMS.GOOD_RECEIVING_STATUS;
    let label = "Không tìm thấy";
    let style = "notfound";
    switch (status) {
      case goodsReceivingNotesStatus.NEW:
        label = "Mới";
        style = "new";
        break;
      case goodsReceivingNotesStatus.PENDING:
        label = "Chờ xác nhận";
        style = "pending";
        break;
      case goodsReceivingNotesStatus.APPROVED:
        label = "Xác nhận";
        style = "approved";
        break;
      case goodsReceivingNotesStatus.DONE:
        label = "Hoàn tất";
        style = "done";
        break;
      case goodsReceivingNotesStatus.CANCELED:
        label = "Hủy";
        style = "canceled";
        break;
      default:
        break;
    }
    return <Chip className={clsx(classes.chip, style)} label={label} />;
  };

  const renderStatus = (status) => {
    const proposalStatus = ENUMS.PROPOSAL_STATUS;
    let label = "Không tìm thấy";
    let style = "notfound";
    switch (status) {
      case proposalStatus.NEW:
        label = "Mới";
        style = "new";
        break;
      case proposalStatus.PROCESSING:
        label = "Đang thực hiện";
        style = "processing";
        break;
      case proposalStatus.DONE:
        label = "Hoàn tất";
        style = "done";
        break;
      case proposalStatus.CANCELED:
        label = "Hủy";
        style = "delete";
        break;
      case proposalStatus.FORCE_DONE:
        label = "Buộc hoàn tất";
        style = "force__done";
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
        <TableCell align="center">{renderStatus(row.status)}</TableCell>
        <TableCell
          align="left"
          style={{
            color: theme.palette.primary.dark,
          }}
        >
          <strong>{dayjs(row.createdAt).format("DD/MM/YYYY")}</strong>
        </TableCell>
        <TableCell align="center">
          {dayjs(row.deadline).format("DD/MM/YYYY")}
        </TableCell>
        {/* Action on row */}
        <TableCell align="center">
          <Box mr={1} clone>
            <Link
              to={`/proposal/${row.id}${isEditable(row.status) ? "/edit" : ""}`}
            >
              <IconButton>
                {isEditable(row.status) ? <EditIcon /> : <InfoIcon />}
              </IconButton>
            </Link>
          </Box>
          {isAbleToDelete(row.status) && (
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
              <Typography variant="h6">Danh sách phiếu nhập</Typography>
              <Table
                size="small"
                aria-label="purchases"
                className={classes.expandTable}
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: 200 }} align="center">
                      Mã phiếu nhập kho
                    </TableCell>
                    <TableCell>Nhà cung cấp</TableCell>
                    <TableCell align="center">Tình trạng</TableCell>
                    <TableCell align="center">Ngày tạo</TableCell>
                    <TableCell align="left">Tổng tiền (đ)</TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.goodsReceivingNotes?.length > 0 &&
                    row.goodsReceivingNotes.map((note) => (
                      <TableRow key={note.id}>
                        <TableCell align="center">{note.id}</TableCell>
                        <TableCell>
                          <div>
                            <strong>
                              {note.supplierName || "Min da poet"}
                            </strong>
                            {note.supplierId !== 0 && (
                              <Typography variant="body2">
                                #{note.supplierId || "minhminion2015@gmail.com"}
                              </Typography>
                            )}
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          {renderGoodsReceivingNotesStatus(note.status)}
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
                          <IconButton onClick={() => history.push(`/${MODULE_GOODS_RECEIVING_NOTES}/${note.id}`)}>
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

export default ListProposalItem;
