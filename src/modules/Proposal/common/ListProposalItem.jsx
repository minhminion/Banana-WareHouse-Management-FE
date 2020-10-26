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
  Link,
  IconButton,
  Collapse,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import dayjs from "dayjs";
import clsx from "clsx";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

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

const ListProposalItem = ({ row, status }) => {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const renderStatus = (status) => {
    let label = "Không tìm thấy";
    let style = "notfound";
    switch (status) {
      case 1:
        label = "Mới";
        style = "new";
        break;
      case 2:
        label = "Đang thực hiện";
        style = "processing";
        break;
      case 3:
        label = "Hoàn tất";
        style = "done";
        break;
      case 4:
        label = "Hủy";
        style = "delete";
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
            <strong>{row.creator.name}</strong>
            <Typography variant="body2">{row.creator.email}</Typography>
          </div>
        </TableCell>
        <TableCell align="center">{renderStatus(row.status)}</TableCell>
        <TableCell
          align="left"
          style={{
            color: theme.palette.primary.dark,
          }}
        >
          <strong>{dayjs(row.createdAt).format("HH:mm - DD/mm/YYYY")}</strong>
        </TableCell>
        <TableCell align="center">{row.period} giờ</TableCell>
        {/* Action on row */}
        <TableCell align="left">
          <Box mr={1} clone>
            <Link to={`/products/${row.sku}`}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>
          </Box>
          <Box clone>
            <IconButton color="secondary">
              <DeleteIcon />
            </IconButton>
          </Box>
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
