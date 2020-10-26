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
import PageviewIcon from "@material-ui/icons/Pageview";
import {
  formatNumberToVND,
  formatNumberToReadable,
  getQuery,
  objectToQueryString,
} from "../../common/helper";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import handler from "./constants/handler";
import { MODULE_NAME } from "./constants/models";
import { MODULE_NAME as MODULE_AUTHOR } from "../Author/constants/models";
import { useSnackbar } from "notistack";
import { ENUMS } from "../../common/constants";
import { Form } from "../../common/hooks/useForm";

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
    flexGrow: 1,
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
}));

const LIMIT_PER_PAGE = 5;
const ListProduct = (props) => {
  const theme = useTheme();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState({
    page: 1,
    ...getQuery(location.search),
  });
  const classes = useStyles();

  const { data, currentPage, totalPages, totalItems } = useSelector(
    (state) => state[MODULE_NAME].data
  );

  const { roleName } = useSelector((state) => state[MODULE_AUTHOR]);

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

  const { fetchProduct } = useMemo(() => handler(dispatch, props), [
    dispatch,
    props,
  ]);

  const { isLoading } = useSelector((state) => state[MODULE_NAME]);

  useEffect(() => {
    if (location.search) {
      setFilter((prev) => ({
        ...getQuery(location.search),
      }));
    }
  }, [location]);

  useEffect(() => {
    if (filter) {
      fetchProduct({
        ...filter,
        limit: LIMIT_PER_PAGE,
      });
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
    history.push({
      pathname: location.pathname,
      search: `?${objectToQueryString({
        ...filter,
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

  const iconSelectComponent = (props) => {
    return <ExpandMoreIcon className={props.className + " " + classes.icon} />;
  };

  const renderTableBody = (rows) => {
    return rows.map((row) => (
      <TableRow key={row.sku}>
        <TableCell align="left">
          <img
            alt=""
            src={
              process.env.PUBLIC_URL +
              "/images/products/delicious-banana-blue-background.jpg"
            }
            style={{
              width: "100%",
              borderRadius: 8,
            }}
          />
        </TableCell>
        <TableCell align="left">{row.sku}</TableCell>
        <TableCell component="th" scope="row">
          <strong>{row.name}</strong>
        </TableCell>
        <TableCell align="left">
          {row.status === 1 ? "Còn hàng" : "Hết hàng"}
        </TableCell>
        <TableCell align="left">
          {formatNumberToReadable(row.quantity)}
        </TableCell>
        <TableCell align="left">{row.defaultUnit}</TableCell>
        <TableCell
          align="left"
          style={{
            color: theme.palette.primary.dark,
          }}
        >
          <strong>{formatNumberToVND(row.price)}</strong>
        </TableCell>
        <TableCell align="left">{row.productCategory?.name}</TableCell>
        {/* Action on row */}
        <TableCell align="left">
          <Box mr={1} clone>
            <Link
              to={`/products/${row.sku}${
                roleName === ENUMS.USER_ROLE.Admin ? "/edit" : ""
              }`}
            >
              <IconButton>
                {roleName === ENUMS.USER_ROLE.Admin ? (
                  <EditIcon />
                ) : (
                  <PageviewIcon />
                )}
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
        <div style={{ display: "flex", flexFlow: "wrap" }}>
          <Box mr={1} clone>
            <Paper
              className={classes.input}
              component={Form}
              onSubmit={handleSearch}
            >
              <InputBase
                name="name"
                className={classes.inputBase}
                placeholder="Tên sản phẩm ..."
                inputProps={{ "aria-label": "search by name" }}
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
              name="status"
              disableUnderline
              classes={{ root: classes.select }}
              MenuProps={menuProps}
              onChange={handleFilter}
              IconComponent={iconSelectComponent}
              defaultValue={0}
              value={filter["filters[status]"] || 0}
            >
              <MenuItem value={0}>Tất cả trạng thái</MenuItem>
              <MenuItem value={ENUMS.PRODUCT_STATUS.AVAILABLE}>
                Còn hàng
              </MenuItem>
              <MenuItem value={ENUMS.PRODUCT_STATUS.UNAVAILABLE}>
                Ngưng bán
              </MenuItem>
              <MenuItem value={ENUMS.PRODUCT_STATUS.HIDED}>Ẩn</MenuItem>
              <MenuItem value={ENUMS.PRODUCT_STATUS.LOCKED}>Khóa</MenuItem>
            </Select>
          </Box>
          {/* Select Category */}
          <Box mr={1} clone>
            <Select
              name="productCategoryId"
              disableUnderline
              classes={{ root: classes.select }}
              MenuProps={menuProps}
              onChange={handleFilter}
              IconComponent={iconSelectComponent}
              defaultValue={0}
              value={filter["filters[productCategoryId]"] || 0}
            >
              <MenuItem value={0}>Tất cả danh mục</MenuItem>
              <MenuItem value={1}>Trái cây Việt Nam</MenuItem>
              <MenuItem value={2}>Trái cây Mỹ</MenuItem>
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
            {roleName === ENUMS.USER_ROLE.Admin && (
              <MenuItem onClick={() => history.push("/products/add")}>
                <AddIcon style={{ marginRight: 8 }} />
                Tạo sản phẩm mới
              </MenuItem>
            )}
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
              <TableCell style={{ width: 80 }} align="left"></TableCell>
              <TableCell style={{ width: 180 }} align="left">
                Mã SKU
              </TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell style={{ width: 100 }} align="left">
                Tình trạng
              </TableCell>
              <TableCell align="left" style={{ width: 100 }}>
                Số lượng
              </TableCell>
              <TableCell align="left" style={{ width: 100 }}>
                ĐVT
              </TableCell>
              <TableCell align="left" style={{ width: 120 }}>
                Giá bán (đ)
              </TableCell>
              <TableCell align="left" style={{ width: 200 }}>
                Danh mục
              </TableCell>
              <TableCell style={{ width: 150 }} align="left">
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{data && renderTableBody(data)}</TableBody>
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
    </div>
  );
};

export default ListProduct;
