import React, { Fragment, useState } from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Box,
  Table,
  makeStyles,
  useTheme,
  InputBase,
  IconButton,
  Button,
} from "@material-ui/core";
import {
  formatNumberToVND,
  formatNumberToReadable,
} from "../../../../common/helper";

import CloseIcon from "@material-ui/icons/Close";
import { blueGrey } from "@material-ui/core/colors";
import ListProductModal from "./ListProductModal";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    width: "100%",
    border: "1px solid rgba(0,0,0,.1)",
    // "&:hover:not($disabled)": {
    //   boxShadow: theme.boxShadows.hover,
    // },
    "& > svg": {
      color: blueGrey[300],
    },
    "&.MuiFormLabel-root.Mui-disabled": {
      color: blueGrey[300],
    },
    "&.Mui-error": {
      borderColor: theme.palette.error.main,
    },
  },
  input: {
    padding: "0.625rem 0.5rem",
  },
  inputDisabled: {
    color: theme.palette.common.black,
  },
  tableRoot: {
    // minWidth: 1200,
    borderSpacing: `0px ${theme.spacing(2)}px`,
    borderCollapse: "separate",
    paddingBottom: theme.spacing(2),
    "& .MuiPaper-rounded": {
      borderRadius: theme.spacing(3),
    },
    "& tr": {
      borderRadius: theme.spacing(3),
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
  buttonAction: {
    width: "100%",
    borderRadius: theme.spacing(2),
    boxShadow: "none",
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.dark,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const ListProposalProducts = ({ data, onChange }) => {
  console.log('======== Bao Minh: ListProposalProducts -> data', data)
  const classes = useStyles();
  const theme = useTheme();
  const [openListProduct, setOpenListProduct] = useState(false);

  const handleChangeQuantity = (e, productId) => {
    const { name, value } = e.target;
    const fieldName = name.split("_")[0];
    const index = data.findIndex((product) => product.id === productId);
    if (index === -1) return;
    let newProducts = data;
    newProducts[index] = {
      ...newProducts[index],
      [fieldName]: value,
      action: newProducts[index].action !== "created" ? "updated" : "created",
    };
    onChange({
      target: {
        name: "products",
        value: newProducts,
      },
    });
  };

  const handleDeleteProduct = (productId, action) => {
    if (data) {
      let newUnits;
      if (action === "created") {
        newUnits = data.filter((unit) => unit.id !== productId);
      } else {
        const index = data.findIndex((unit) => unit.id === productId);
        newUnits = data;
        newUnits[index] = {
          ...newUnits[index],
          action: "deleted",
        };
      }
      onChange({
        target: {
          name: "products",
          value: newUnits,
        },
      });
    }
  };

  const renderTableBody = (rows) => {
    return rows.map(
      (row) =>
        row.action !== "deleted" && (
          <TableRow key={row.id}>
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
            <TableCell component="th" scope="row">
              <strong>{row.name}</strong>
            </TableCell>
            <TableCell align="left">
              <InputBase
                name={`choiceQuantity_product_${row.id}`}
                value={formatNumberToVND(row.choiceQuantity || 1)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.input,
                  disabled: classes.inputDisabled,
                }}
                onChange={(e) => handleChangeQuantity(e, row.id)}
              />
            </TableCell>
            {/* Action on row */}
            <TableCell align="center">
              <Box clone>
                <IconButton
                  color="secondary"
                  onClick={() => handleDeleteProduct(row.id, row.action)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        )
    );
  };

  return (
    <Fragment>
      <TableContainer component={Box}>
        <Table
          className={classes.tableRoot}
          size="small"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 80 }} align="left"></TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell align="left" style={{ width: 150 }}>
                Số lượng mua
              </TableCell>
              <TableCell style={{ width: 130 }} align="center">
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && renderTableBody(data)}
            <TableRow>
              <TableCell style={{ padding: 0 }} colSpan={4}>
                <Button
                  className={classes.buttonAction}
                  onClick={() => setOpenListProduct(true)}
                >
                  Thêm sản phẩm
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ListProductModal
        open={openListProduct}
        onChange={onChange}
        onClose={() => setOpenListProduct(false)}
        initialValue={data || []}
      />
    </Fragment>
  );
};

export default ListProposalProducts;
