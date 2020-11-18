import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Box,
  Paper,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  InputBase,
  IconButton,
  Typography,
  Select,
  MenuItem,
  Menu,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import CKEditor from "@ckeditor/ckeditor5-react";
import Editor from "../../common/components/widget/Editor";
// ICONS
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";

import {
  getQuery,
  notifyError,
  objectToQueryString,
} from "../../common/helper";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import handler from "./constants/handler";
import { MODULE_NAME } from "./constants/models";
import { useSnackbar } from "notistack";
import ListOrdersItem from "./common/ListOrdersItem";
import handler from "./constants/handler";
import { ENUMS } from "../../common/constants";
import { Form } from "../../common/hooks/useForm";
import { ORDER_STATUS } from "../../common/constants/enums";

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
      borderRadius: theme.spacing(2),
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
  dialogRoot: {
    "& .ck-editor": {
      boxShadow: theme.boxShadows.main,
    },
    "& .ck-toolbar": {
      border: theme.border[0],
      borderTopRightRadius: `${theme.spacing(1)}px !important`,
      borderTopLeftRadius: `${theme.spacing(1)}px !important`,
    },
    "& .ck-editor__editable.ck-editor__editable_inline": {
      borderBottomRightRadius: `${theme.spacing(1)}px !important`,
      borderBottomLeftRadius: `${theme.spacing(1)}px !important`,
      minHeight: 200,
      height: "100%",
      maxHeight: 400,
      "&:not(.ck-focused)": {
        border: theme.border[0],
      },
    },
  },
}));

const ORDERS_STATUS = ENUMS.ORDER_STATUS;

const LIMIT_PER_PAGE = 5;
const ListOrders = (props) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectCancelOrders, setSelectCancelOrders] = useState({});
  const [filter, setFilter] = useState({
    page: 1,
    ...getQuery(location.search),
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

  const { fetchOrders, editOrder } = useMemo(
    () => handler(dispatch, props),
    [dispatch, props]
  );

  const { data, currentPage, totalPages, totalItems } = useSelector(
    (state) => state[MODULE_NAME].data
  );

  const { isLoading } = useSelector((state) => state[MODULE_NAME]);

  useEffect(() => {
    if (location.search) {
      setFilter((prev) => ({ ...prev, ...getQuery(location.search) }));
    }
  }, [location]);

  useEffect(() => {
    if (filter) {
      fetchOrders({
        ...filter,
        limit: LIMIT_PER_PAGE,
      });
    }
  }, [filter]);

  useEffect(() => {
    if (isLoading) {
      enqueueSnackbar(`Đang tải...`, {
        variant: "info",
        key: `loading-${MODULE_NAME}`,
        persist: true,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } else {
      closeSnackbar(`loading-${MODULE_NAME}`);
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

  const handleFilter = (e, condition = "=") => {
    const { name, value } = e.target;
    let newFilter = filter;
    let extendFilter = {};
    if (value === 0) {
      delete newFilter[`filters[${name}]`];
      delete newFilter[`filterConditions[${name}]`];
    } else {
      extendFilter = {
        [`filters[${name}]`]: value,
        [`filterConditions[${name}]`]: "=",
      };
    }
    history.push({
      pathname: location.pathname,
      search: `?${objectToQueryString({
        ...newFilter,
        page: 1,
        ...extendFilter,
      })}`,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const { name, value } = e.target.getElementsByTagName("input")[0];
    let newFilter = filter;
    let extendFilter = {};
    if (value.trim() === "") {
      delete newFilter[`filters[${name}]`];
      delete newFilter[`filterConditions[${name}]`];
    } else {
      extendFilter = {
        [`filters[${name}]`]: `"${value}"`,
        [`filterConditions[${name}]`]: "like",
      };
    }
    history.push({
      pathname: location.pathname,
      search: `?${objectToQueryString({
        ...newFilter,
        page: 1,
        ...extendFilter,
      })}`,
    });
  };

  const handleCloseCancelOrders = () => {
    setSelectCancelOrders({});
  };

  const handleCancelOrders = async () => {
    if (
      selectCancelOrders &&
      selectCancelOrders.id &&
      editorRef.current &&
      editorRef.current.getData
    ) {
      const result = await editOrder({
        ...selectCancelOrders,
        status: ORDER_STATUS.CANCELED,
        exceptionReason: editorRef.current.getData() || "",
      });
      if (result.id) {
        handleCloseCancelOrders();
        fetchOrders({
          ...filter,
          limit: LIMIT_PER_PAGE,
        });
      } else {
        notifyError(enqueueSnackbar, result);
      }
    }
  };

  const iconSelectComponent = (props) => {
    return <ExpandMoreIcon className={props.className + " " + classes.icon} />;
  };
  return (
    <div>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <div style={{ display: "flex" }}>
          <Box mr={1} clone>
            <Paper
              className={classes.input}
              component={Form}
              onSubmit={handleSearch}
            >
              <InputBase
                name="name"
                className={classes.inputBase}
                placeholder="Tên nhà cung cấp ..."
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
              name="status"
              onChange={handleFilter}
              classes={{ root: classes.select }}
              MenuProps={menuProps}
              IconComponent={iconSelectComponent}
              defaultValue={0}
              value={filter["filters[status]"] || 0}
            >
              <MenuItem value={0}>Tất cả trạng thái</MenuItem>
              <MenuItem value={ORDERS_STATUS.NEW}>Mới tạo</MenuItem>
              <MenuItem value={ORDERS_STATUS.PROCESSING}>Chờ xác nhận</MenuItem>
              <MenuItem value={ORDERS_STATUS.EXPORTED}>Đã xuất kho</MenuItem>
              <MenuItem value={ORDERS_STATUS.DONE}>Hoàn tất</MenuItem>
              <MenuItem value={ORDERS_STATUS.CANCELED}>Đã hủy</MenuItem>
            </Select>
          </Box>
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
            <MenuItem onClick={() => history.push(`/${MODULE_NAME}/add`)}>
              <AddIcon style={{ marginRight: 8 }} />
              Tạo đơn hàng
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
              <TableCell style={{ width: 120 }} align="left">
                Mã đơn hàng
              </TableCell>
              <TableCell style={{ width: 120 }} align="left">
                Người tạo phiếu
              </TableCell>
              <TableCell style={{ width: 180 }} align="left">
                Tổng tiền
              </TableCell>
              <TableCell style={{ width: 200 }} align="left">
                Ngày tạo
              </TableCell>
              <TableCell align="center" style={{ width: 100 }}>
                Trạng thái
              </TableCell>
              <TableCell style={{ width: 150 }} align="center">
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody> */}
          {data &&
            data.map((row) => (
              <ListOrdersItem
                key={row.id}
                row={row}
                onCancel={setSelectCancelOrders}
              />
            ))}
          {/* </TableBody> */}
        </Table>
      </TableContainer>
      {/* Pagination */}
      <Box mb={5} display="flex" justifyContent="space-between">
        {data && (
          <Typography>{`Hiển ${(currentPage - 1) * LIMIT_PER_PAGE + 1} -
                ${(currentPage - 1) * LIMIT_PER_PAGE + data.length} trên ${
            totalItems || 0
          } kết quả`}</Typography>
        )}
        <Pagination
          count={totalPages || 1}
          defaultPage={1}
          page={currentPage || 1}
          boundaryCount={2}
          onChange={handleChangePagination}
        />
      </Box>

      <Dialog
        open={
          selectCancelOrders && selectCancelOrders.id
            ? true
            : false
        }
        className={classes.dialogRoot}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Lý do hủy đơn hàng</DialogTitle>
        <DialogContent>
          <CKEditor
            editor={Editor}
            onInit={(editor) => {
              editorRef.current = editor;
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelOrders}
          >
            Hủy
          </Button>
          <Button onClick={handleCancelOrders} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListOrders;