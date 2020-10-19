import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Paper,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  InputBase,
  IconButton,
  Typography,
  Select,
  MenuItem,
  Menu,
  useTheme,
  Chip,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
// ICONS
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getQuery, objectToQueryString } from "../../common/helper";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import handler from "./constants/handler";
import { MODULE_NAME } from "./constants/models";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import clsx from "clsx";

function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
  date.setHours(hour);
  return date;
}

function createData(id, creator, createdAt, period, status) {
  return { id, creator, createdAt, period, status };
}

function genData(row) {
  const data = [];

  for (let i = 1; i < row; i++) {
    let str = "" + i;
    let pad = "000000";
    let id = pad.substring(0, pad.length - str.length) + str;
    data.push(
      createData(
        id,
        {
          uid: i,
          email: `example_${i}@gmail.com`,
          name: `Nguyễn Văn ${i}`,
        },
        randomDate(new Date(2020, 0, 1), new Date(), 0, 24).toISOString(),
        2,
        Math.floor(Math.random() * 4 + 1)
      )
    );
  }

  return data;
}

const rows = [...genData(100)];

const useStyles = makeStyles((theme) => ({
  select: {
    minWidth: 200,
    background: "white",
    border: "1px solid rgba(0,0,0,.1)",
    borderRadius: 8,
    padding: theme.spacing(1.5),
    boxShadow: theme.boxShadows.main,
    "&:focus": {
      borderRadius: 8,
      background: "white",
    },
  },
  icon: {
    right: 12,
    position: "absolute",
    userSelect: "none",
    pointerEvents: "none",
  },
  paper: {
    borderRadius: 12,
    marginTop: 8,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    background: "white",
    "& li": {
      paddingTop: 12,
      paddingBottom: 12,
    },
  },
  tableRoot: {
    minWidth: 1200,
    borderSpacing: `0px ${theme.spacing(2)}px`,
    borderCollapse: "separate",
    paddingBottom: theme.spacing(2),
    "& .MuiPaper-rounded": {
      borderRadius: theme.spacing(3),
    },
    "& tr": {
      boxShadow: theme.boxShadows.main,
    },
    "& th": {
      border: "0px solid rgba(0,0,0,.1)",
      borderTopWidth: 1,
      borderBottomWidth: 1,
    },
    "& td": {
      border: "0px solid rgba(0,0,0,.1)",
      borderTopWidth: 1,
      borderBottomWidth: 1,
    },
    "& td:first-child": {
      borderLeftWidth: 1,
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
    },
    "& td:last-child": {
      borderRightWidth: 1,
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
    },
    "& th:first-child": {
      borderLeftWidth: 1,
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
    },
    "& th:last-child": {
      borderRightWidth: 1,
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
    },
  },
  input: {
    paddingLeft: theme.spacing(1.5),
    display: "flex",
    alignItems: "center",
    width: 400,
    margin: "auto",
    marginRight: theme.spacing(1),
  },
  inputBase: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  actionButton: {
    background: theme.palette.secondary.main,
    width: 120,
    color: "white",
    justifyContent: "space-between",
    "&:hover": {
      background: theme.palette.secondary.main,
    },
  },
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
}));

const LIMIT_PER_PAGE = 5;
const ListProposal = (props) => {
  const theme = useTheme();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState({
    page: 1,
  });
  const classes = useStyles();

  const menuProps = {
    classes: {
      paper: classes.paper,
      list: classes.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };

  // const { fetchProduct } = useMemo(() => handler(dispatch, props), [
  //   dispatch,
  //   props,
  // ]);

  const { isLoading } = useSelector((state) => state[MODULE_NAME]);

  useEffect(() => {
    if (location.search) {
      setFilter((prev) => ({ ...prev, ...getQuery(location.search) }));
    }
  }, [location]);

  useEffect(() => {
    if (filter) {
      // fetchProduct(filter);
    }
  }, [filter]);

  useEffect(() => {
    if (isLoading) {
      enqueueSnackbar(`Đang tải...`, {
        variant: "info",
        key: "loading-product",
        persist: true,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } else {
      closeSnackbar("loading-product");
    }
  }, [isLoading, enqueueSnackbar, closeSnackbar]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePagination = (e, newPage) => {
    const newFilter = filter;
    history.push({
      pathname: location.pathname,
      search: `?${objectToQueryString({
        ...newFilter,
        page: newPage,
      })}`,
    });
  };

  const iconSelectComponent = (props) => {
    return <ExpandMoreIcon className={props.className + " " + classes.icon} />;
  };

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

  const renderTableBody = (rows, pagination) => {
    const page = (pagination.page - 1) * LIMIT_PER_PAGE;
    return rows.slice(page, page + LIMIT_PER_PAGE).map((row) => (
      <TableRow key={row.id}>
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
    ));
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <div style={{ display: "flex" }}>
          <Box mr={1} clone>
            <Paper className={classes.input}>
              <InputBase
                className={classes.inputBase}
                placeholder="Tên người tạo ..."
                inputProps={{ "aria-label": "search by creator" }}
              />
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
          {/* Select status */}
          <Box mr={1} clone>
            <Select
              disableUnderline
              classes={{ root: classes.select }}
              MenuProps={menuProps}
              IconComponent={iconSelectComponent}
              defaultValue={0}
            >
              <MenuItem value={0}>Tất cả trạng thái</MenuItem>
              <MenuItem value={1}>Mới</MenuItem>
              <MenuItem value={2}>Đang thực hiện</MenuItem>
              <MenuItem value={3}>Hoàn tất</MenuItem>
              <MenuItem value={4}>Hủy</MenuItem>
              <MenuItem value={5}>Buộc hoàn tất</MenuItem>
            </Select>
          </Box>
          {/* Select Category
          <Box mr={1} clone>
            <Select
              disableUnderline
              classes={{ root: classes.select }}
              MenuProps={menuProps}
              IconComponent={iconSelectComponent}
              defaultValue={0}
            >
              <MenuItem value={0}>Tất cả danh mục</MenuItem>
              <MenuItem value={1}>Trái cây Việt Nam</MenuItem>
              <MenuItem value={2}>Trái cây Mỹ</MenuItem>
            </Select>
          </Box> */}
          <Box p={1.5} mr={1} clone>
            <IconButton color="primary" component={Paper}>
              <FilterListIcon />
            </IconButton>
          </Box>
        </div>
        <div>
          <Box p={1.5} mr={1} clone>
            <Button
              // variant="contained"
              className={classes.actionButton}
              component={Paper}
              onClick={handleClick}
            >
              <span>Thêm</span>
              <ExpandMoreIcon
                style={{
                  transform: anchorEl ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </Button>
          </Box>
          <Menu
            id="simple-menu"
            // classes={{ paper: downloadMenuClasses.paper }}
            {...menuProps}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            // keepMounted
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <AddIcon style={{ marginRight: 8 }} />
              Tạo sản phẩm mới
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <PublishIcon style={{ marginRight: 8 }} />
              Import XLS
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <GetAppIcon style={{ marginRight: 8 }} />
              Export XLS
            </MenuItem>
          </Menu>
        </div>
      </Box>
      {/* Table */}
      <TableContainer component={Box}>
        <Table className={classes.tableRoot} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 180 }} align="left">
                Mã phiếu
              </TableCell>
              <TableCell>Người tạo phiếu</TableCell>
              <TableCell style={{ width: 200 }} align="center">
                Tình trạng
              </TableCell>
              <TableCell align="left" style={{ width: 200 }}>
                Ngày tạo
              </TableCell>
              <TableCell align="center" style={{ width: 100 }}>
                Thời hạn
              </TableCell>
              <TableCell style={{ width: 150 }} align="left">
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody(rows, filter)}</TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <Box mb={5} display="flex" justifyContent="space-between">
        <Typography>{`Hiển ${(filter.page - 1) * LIMIT_PER_PAGE + 1} -
                ${filter.page * LIMIT_PER_PAGE + 1} trên ${
          rows.length
        } kết quả`}</Typography>
        <Pagination
          count={Math.round(rows.length / LIMIT_PER_PAGE)}
          defaultPage={1}
          page={parseInt(filter.page)}
          boundaryCount={2}
          onChange={handleChangePagination}
        />
      </Box>
    </div>
  );
};

export default ListProposal;
