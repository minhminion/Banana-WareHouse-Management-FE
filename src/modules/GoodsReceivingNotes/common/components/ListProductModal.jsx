import React, { useMemo, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  Slide,
  DialogContent,
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  makeStyles,
  Box,
  useTheme,
  IconButton,
  Checkbox,
  Typography,
  Button,
} from "@material-ui/core";
import {
  formatNumberToReadable,
  formatNumberToVND,
} from "../../../../common/helper";
import handler from "../../../Products/constants/handler";
import { useSelector, useDispatch } from "react-redux";
import { MODULE_NAME as MODULE_PRODUCT } from "../../../Products/constants/models";
import Pagination from "@material-ui/lab/Pagination";
import { useCallback } from "react";
import { uniqBy } from "lodash";

const useStyles = makeStyles((theme) => ({
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
  actionButton: {
    background: theme.palette.secondary.main,
    width: 120,
    color: theme.palette.common.white,
    justifyContent: "center",
    "&:hover": {
      background: theme.palette.secondary.main,
    },
    "&.btn__cancel": {
      background: "none",
      color: theme.palette.common.black,
    },
    "&.btn__reset": {
      background: theme.palette.info.light,
      color: theme.palette.common.white,
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ListProductModal = (props) => {
  const {
    onClose,
    open = false,
    LIMIT_PER_PAGE = 4,
    initialValue,
    onChange,
  } = props;
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState({});
  const [filter, setFilter] = useState({
    page: 1,
  });
  const { fetchProduct } = useMemo(() => handler(dispatch, props), [
    dispatch,
    props,
  ]);
  const { data, currentPage, totalPages, totalItems } = useSelector(
    (state) => state[MODULE_PRODUCT].data
  );

  const handleFilter = useCallback((e, condition = "=") => {
    const { name, value } = e.target;
    let newFilter = filter;
    let extendFilter = {};
    if (value === 0) {
      delete newFilter[`filters[${name}]`];
      delete newFilter[`filterConditions[${name}]`];
    } else {
      extendFilter = {
        [`filters[${name}]`]: value,
        [`filterConditions[${name}]`]: condition,
      };
    }
    setFilter({
      ...newFilter,
      page: 1,
      ...extendFilter,
    });
  }, []);

  useEffect(() => {
    if (initialValue?.length > 0) {
      const value = initialValue.reduce((accumulator, currentValue) => {
        if (currentValue.action !== "deleted")
          return accumulator.concat(currentValue["productId"]);
        return accumulator;
      }, []);
      handleFilter(
        {
          target: {
            name: "id",
            value: value.join(","),
          },
        },
        "notin"
      );
    }
  }, [initialValue, handleFilter]);

  useEffect(() => {
    if (open && filter) {
      fetchProduct({
        ...filter,
        limit: LIMIT_PER_PAGE,
      });
    }
  }, [filter, open, fetchProduct, LIMIT_PER_PAGE]);

  const handleChangePagination = (e, newPage) => {
    setFilter((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newData = data.reduce((result, product) => {
        return result.concat({
          description: "",
          quantity: 1,
          productId: product.id,
          product: product,
        });
      }, []);
      setSelected((prev) => ({
        ...prev,
        [filter.page]: newData,
      }));
      return;
    }
    setSelected((prev) => ({
      ...prev,
      [filter.page]: [],
    }));
  };

  const handleCheckProduct = (e, product) => {
    const selectedInPage = selected[filter.page] || [];
    const selectedIndex = selectedInPage.findIndex(
      (item) => item.productId === product.id
    );
    const selectProduct = {
      description: "",
      action: "created",
      quantity: 1,
      productId: product.id,
      product: product,
    };
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedInPage, selectProduct);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedInPage.slice(1));
    } else if (selectedIndex === selectedInPage.length - 1) {
      newSelected = newSelected.concat(selectedInPage.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedInPage.slice(0, selectedIndex),
        selectedInPage.slice(selectedIndex + 1)
      );
    }

    setSelected((prev) => ({
      ...prev,
      [filter.page]: newSelected,
    }));
  };

  const handleSubmit = () => {
    const newProducts = Object.values(selected).reduce(
      (accumulator, currentValue) => accumulator.concat(currentValue),
      []
    );

    if (newProducts.length > 0 || onChange) {
      // Get list unique IDs
      const idsNewProduct = new Set(newProducts.map((d) => d.id));

      const newValues = uniqBy([...initialValue, ...newProducts], "productId");

      // Change action of Initial Values to update
      newValues.forEach((el) => {
        if (idsNewProduct.has(el.id) && el.action === "deleted")
          el.action = "update";
      });

      onChange({
        target: {
          name: "goodsReceivingNoteDetails",
          value: newValues,
        },
      });
      setSelected([]);
      onClose();
    }
  };

  const renderTableBody = (rows) => {
    return rows.map((row) => {
      const isItemSelected = selected[filter.page]
        ? selected[filter.page].findIndex(
            (item) => item.productId === row.id
          ) !== -1
        : false;
      const product = row;
      return (
        <TableRow key={product.sku}>
          <TableCell padding="checkbox">
            <Checkbox
              checked={isItemSelected}
              onChange={(e) => handleCheckProduct(e, product)}
              inputProps={{ "aria-labelledby": `check_product_${product.id}` }}
            />
          </TableCell>
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
          <TableCell align="left">{product.sku}</TableCell>
          <TableCell component="th" scope="row">
            <strong>{product.name}</strong>
          </TableCell>
          <TableCell align="left">
            {product.status === 1 ? "Còn hàng" : "Hết hàng"}
          </TableCell>
          <TableCell align="left">
            {formatNumberToReadable(product.quantity)}
          </TableCell>
          <TableCell align="left">{product.defaultUnit}</TableCell>
          <TableCell
            align="left"
            style={{
              color: theme.palette.primary.dark,
            }}
          >
            <strong>{formatNumberToVND(product.price)}</strong>
          </TableCell>
          <TableCell align="left">{product.productCategory?.name}</TableCell>
          {/* Action on row */}
          <TableCell align="left">
            <Box clone>
              <IconButton color="secondary">{/* <DeleteIcon /> */}</IconButton>
            </Box>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Dialog
      onClose={onClose}
      maxWidth="lg"
      fullWidth={true}
      TransitionComponent={Transition}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Danh sách sản phẩm</DialogTitle>
      <DialogContent style={{ minHeight: 710 }}>
        <TableContainer component={Box}>
          <Table className={classes.tableRoot} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected[filter.page]?.length > 0 &&
                      selected[filter.page]?.length < data?.length
                    }
                    checked={
                      data?.length > 0 &&
                      selected[filter.page]?.length === data?.length
                    }
                    onChange={handleSelectAllClick}
                    inputProps={{ "aria-label": "select all desserts" }}
                  />
                </TableCell>
                <TableCell style={{ width: 80 }} align="left">
                  Ảnh
                </TableCell>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Chọn
        </Button>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ListProductModal;
