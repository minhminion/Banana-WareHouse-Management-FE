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
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { roleName } = useSelector((state) => state[MODULE_AUTHOR]);

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
        <TableCell align="left">{row.id}</TableCell>
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
              to={`/proposal/${row.id}${
                roleName === ENUMS.USER_ROLE.Sale &&
                row.status !== ENUMS.PROPOSAL_STATUS.CANCELED &&
                row.status !== ENUMS.PROPOSAL_STATUS.DONE &&
                row.status !== ENUMS.PROPOSAL_STATUS.FORCE_DONE
                  ? "/edit"
                  : ""
              }`}
            >
              <IconButton>
                {roleName === ENUMS.USER_ROLE.Sale &&
                row.status !== ENUMS.PROPOSAL_STATUS.CANCELED &&
                row.status !== ENUMS.PROPOSAL_STATUS.DONE &&
                row.status !== ENUMS.PROPOSAL_STATUS.FORCE_DONE ? (
                  <EditIcon />
                ) : (
                  <InfoIcon />
                )}
              </IconButton>
            </Link>
          </Box>
          {roleName === ENUMS.USER_ROLE.Sale &&
            (row.status === ENUMS.PROPOSAL_STATUS.NEW ||
              row.status === ENUMS.PROPOSAL_STATUS.PROCESSING) && (
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
                    <TableCell>Mã phiếu nhập kho</TableCell>
                    <TableCell>Tình trạng</TableCell>
                    <TableCell align="left">Ngày tạo</TableCell>
                    <TableCell align="left">Tổng tiền (đ)</TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Đang thực hiện</TableCell>
                    <TableCell align="left">20/11</TableCell>
                    <TableCell align="left">1,000,000</TableCell>
                    <TableCell align="left">
                      <IconButton>
                        <ArrowForwardIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
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
