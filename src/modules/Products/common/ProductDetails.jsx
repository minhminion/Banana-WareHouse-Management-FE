
import React, { useEffect, useMemo, useState } from "react";
import {
  makeStyles,
  TextField,
  InputLabel,
  Box,
  Grid,
  InputBase,
  Paper,
  FormHelperText,
  Button,
} from "@material-ui/core";
// Components
import ProductDetailsCategory from "./components/ProductDetailsCategory";
import ProductDetailsImages from "./components/ProductDetailsImages";
import ProductDetailsUnit from "./components/ProductDetailsUnit";
import ProductDetailsStatus from "./components/ProductDetailsStatus";
import CKEditor from "@ckeditor/ckeditor5-react";
import Editor from "../../../common/components/widget/Editor";
// Helper
import clsx from "clsx";
import { blueGrey } from "@material-ui/core/colors";
import parse from "html-react-parser";
import { formatNumberToVND } from "../../../common/helper";
import { useForm } from "../../../common/hooks/useForm";
import { useHistory } from "react-router-dom";
import { ENUMS } from "../../../common/constants";
import handler from "../constants/handler";
import { useDispatch } from "react-redux";

const defaultValues = {
  name: "",
  status: ENUMS.PRODUCT_STATUS.AVAILABLE,
  productCategoryId: 1,
  description: "<p>Nhập mô tả của bạn ở đây<p>",
  minQuantity: 2000,
  maxQuantity: 5000,
  purchasePrice: 120000,
  price: 150000,
  defaultUnit: "Kg",
  productUnits: [
    {
      id: 1,
      name: "Thùng",
      ratioFromDefault: 10,
    },
  ],
  // images: [
  //   {
  //     id: 1,
  //     src: "https://source.unsplash.com/random",
  //   },
  //   {
  //     id: 2,
  //     src: "https://source.unsplash.com/random",
  //   },
  //   {
  //     id: 4,
  //     src: "https://source.unsplash.com/random",
  //   },
  // ],
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& label + .MuiInput-formControl": {
      marginTop: theme.spacing(3),
      // marginBottom: theme.spacing(2),
    },
    "& .MuiFormControl-marginNormal": {
      marginTop: 0,
    },
  },
  leftSide: {
    width: 800,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  rightSide: {
    width: "calc(100% - 800px)",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  label: {
    color: `#18202c !important `,
    fontWeight: 500,
    fontSize: 16,
    "&:focus:not($disabled)": {
      color: blueGrey[500],
    },
    "&.MuiInputLabel-shrink": {
      transform: "scale(1)",
    },
  },
  inputRoot: {
    width: "100%",
    borderRadius: theme.spacing(1),
    border: "1px solid rgba(0,0,0,.1)",
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.boxShadows.main,
    "&:hover:not($disabled)": {
      // borderColor: blueGrey[500],
      boxShadow: theme.boxShadows.hover,
    },
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
    // border: "none",
  },
  productDescription: {
    marginBottom: theme.spacing(3),
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
      // minHeight: 200,
      maxHeight: 300,
      "&:not(.ck-focused)": {
        border: theme.border[0],
      },
    },
    "& .product__description": {
      // minHeight: 200,
      boxShadow: theme.boxShadows.inset,
      overflow: "auto",
      maxHeight: 300,
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

const ProductDetails = (props) => {
  const {
    initialValues,
    isEdit = false,
    onSubmit,
    okLabel = "Cập nhật",
    resetLabel = "Làm mới",
    cancelLabel = "Hủy",
  } = props;
  const classes = useStyles();
  const history = useHistory();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues) {
      temp.name =
        fieldValues.name.trim().length > 0 ? "" : "Vui lòng không để trống";
    }
    if ("purchasePrice" in fieldValues)
      temp.purchasePrice =
        fieldValues.purchasePrice.length !== 0 ? "" : "Vui lòng không để trống";
    if ("price" in fieldValues)
      temp.price =
        fieldValues.price.length !== 0 ? "" : "Vui lòng không để trống";
    if ("defaultUnit" in fieldValues)
      temp.defaultUnit =
        fieldValues.defaultUnit.trim().length !== 0
          ? ""
          : "Vui lòng không để trống";
    if ("minQuantity" in fieldValues)
      temp.minQuantity =
        fieldValues.minQuantity.length !== 0 ? "" : "Vui lòng không để trống";
    if ("maxQuantity" in fieldValues)
      temp.maxQuantity =
        fieldValues.maxQuantity.length !== 0 ? "" : "Vui lòng không để trống";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    errors,
    setErrors,
    handleInputChange,
    setDefaultValues,
  } = useForm(
    initialValues
      ? {
          ...defaultValues,
          ...initialValues,
        }
      : {
          ...defaultValues,
        },
    true,
    validate
  );

  useEffect(() => {
    setDefaultValues({ ...initialValues });
  }, [initialValues]);

  const handleResetValues = () => {
    setDefaultValues(initialValues || defaultValues);
  };

  const handleSubmit = () => {
    if (validate()) {
      const newValues = {
        id: values.id,
        name: values.name,
        status: values.status,
        description: values.description,
        defaultUnit: values.defaultUnit,
        purchasePrice: parseInt(values.purchasePrice),
        price: parseInt(values.price),
        productCategoryId: values.productCategoryId,
        minQuantity: parseInt(values.minQuantity),
        maxQuantity: parseInt(values.maxQuantity),
        productUnits: values.productUnits,
      };
      onSubmit && onSubmit(newValues);
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item className={clsx(classes.root, classes.leftSide)}>
          {/* Product name */}
          <TextField
            disabled={!isEdit}
            name="name"
            style={{
              width: "100%",
              marginBottom: 24,
            }}
            label={"Tên sản phẩm"}
            value={values.name}
            helperText={errors.name}
            error={errors.name?.length > 0}
            onChange={handleInputChange}
            placeholder={"Tên sản phẩm"}
            margin={"normal"}
            InputLabelProps={{
              classes: {
                root: classes.label,
              },
              focused: false,
              shrink: true,
            }}
            InputProps={{
              classes: {
                root: classes.inputRoot,
                input: classes.input,
                disabled: classes.inputDisabled,
              },
              disableUnderline: true,
            }}
          />
          {/* Product status */}
          <Box display="flex" alignItems="center">
            <ProductDetailsStatus
              value={values.status}
              onChange={handleInputChange}
              style={{ width: "50%" }}
              classes={classes}
              isEdit={isEdit}
            />
            <ProductDetailsCategory
              value={values.productCategoryId}
              onChange={handleInputChange}
              style={{ width: "50%" }}
              classes={classes}
              isEdit={isEdit}
            />
          </Box>
          {/* Product description */}
          <Box className={classes.productDescription}>
            <InputLabel className={classes.label} style={{ marginBottom: 8 }}>
              Mô tả sản phẩm
            </InputLabel>
            {isEdit ? (
              <CKEditor
                editor={Editor}
                data={values.description || ""}
                onInit={(editor) => {
                  // You can store the "editor" and use when it is needed.
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleInputChange({
                    target: { name: "description", value: data },
                  });
                }}
                onBlur={(event, editor) => {}}
                onFocus={(event, editor) => {}}
              />
            ) : (
              <Box p={2} className="product__description" component={Paper}>
                {parse(values.description || "")}
              </Box>
            )}
          </Box>

          {/* Product images */}
          <ProductDetailsImages
            classes={classes}
            isEdit={isEdit}
            value={values.images || []}
            onChange={handleInputChange}
          />
        </Grid>
        {/* Right side */}
        <Grid item className={clsx(classes.root, classes.rightSide)}>
          {/* Product amount */}
          <Box className={classes.productDescription}>
            <InputLabel className={classes.label} style={{ marginBottom: 8 }}>
              Tồn kho min - max
            </InputLabel>
            <Box display="flex" alignItems="end">
              <Box>
                <InputBase
                  name="minQuantity"
                  value={formatNumberToVND(values.minQuantity)}
                  onChange={(e) => handleInputChange(e, true)}
                  error={errors.minQuantity?.length > 0}
                  disabled={!isEdit}
                  autoFocus
                  classes={{
                    root: classes.inputRoot,
                    input: classes.input,
                    disabled: classes.inputDisabled,
                  }}
                />
                {errors.minQuantity?.length > 0 && (
                  <FormHelperText error>{errors.minQuantity}</FormHelperText>
                )}
              </Box>
              <InputLabel
                className={classes.label}
                style={{ margin: 8, fontSize: 26 }}
              >
                -
              </InputLabel>
              <Box>
                <InputBase
                  name="maxQuantity"
                  disabled={!isEdit}
                  value={formatNumberToVND(values.maxQuantity)}
                  error={errors.maxQuantity?.length > 0}
                  onChange={(e) => handleInputChange(e, true)}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.input,
                    disabled: classes.inputDisabled,
                  }}
                />
                {errors.maxQuantity?.length > 0 && (
                  <FormHelperText error>{errors.maxQuantity}</FormHelperText>
                )}
              </Box>
            </Box>
          </Box>
          {/* Product purchase price */}
          <Box className={classes.productDescription}>
            <InputLabel className={classes.label} style={{ marginBottom: 8 }}>
              Giá mua
            </InputLabel>
            <Box display="flex" style={{ minWidth: 150 }}>
              <InputBase
                disabled={!isEdit}
                name="purchasePrice"
                label={"Giá mua"}
                value={formatNumberToVND(values.purchasePrice)}
                error={errors.purchasePrice?.length > 0}
                onChange={(e) => handleInputChange(e, true)}
                style={{
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                }}
                classes={{
                  root: classes.inputRoot,
                  input: classes.input,
                  disabled: classes.inputDisabled,
                }}
              />
              <p
                style={{
                  padding: "0.5rem",
                  backgroundColor: blueGrey[500],
                  color: "white",
                  fontWeight: 500,
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "stretch",
                  borderBottomRightRadius: 8,
                  borderTopRightRadius: 8,
                }}
              >
                {values.defaultUnit}
              </p>
            </Box>
            {errors.purchasePrice?.length > 0 && (
              <FormHelperText error>{errors.purchasePrice}</FormHelperText>
            )}
          </Box>
          {/* Product Sale price */}
          <Box className={classes.productDescription}>
            <InputLabel className={classes.label} style={{ marginBottom: 8 }}>
              Giá bán
            </InputLabel>
            <Box display="flex" style={{ minWidth: 150 }}>
              <InputBase
                disabled={!isEdit}
                name="price"
                value={formatNumberToVND(values.price)}
                onChange={(e) => handleInputChange(e, true)}
                error={errors.price?.length > 0}
                label={"Giá bán"}
                style={{
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                }}
                classes={{
                  root: classes.inputRoot,
                  input: classes.input,
                  disabled: classes.inputDisabled,
                }}
              />
              <p
                style={{
                  padding: "0.5rem",
                  backgroundColor: blueGrey[500],
                  color: "white",
                  fontWeight: 500,
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "stretch",
                  borderBottomRightRadius: 8,
                  borderTopRightRadius: 8,
                }}
              >
                {values.defaultUnit}
              </p>
            </Box>
            {errors.price?.length > 0 && (
              <FormHelperText error>{errors.price}</FormHelperText>
            )}
          </Box>
          {/* Product Unit */}
          <ProductDetailsUnit
            classes={classes}
            isEdit={isEdit}
            values={{
              defaultUnit: values.defaultUnit,
              productUnits: values.productUnits,
            }}
            errors={errors}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      {/* Actions Button */}
      {isEdit && (
        <Box className={classes.productDescription}>
          <Box p={1.5} mr={1} clone>
            <Button
              // variant="contained"
              className={classes.actionButton}
              component={Paper}
              onClick={handleSubmit}
            >
              {okLabel}
            </Button>
          </Box>
          <Box p={1.5} mr={1} clone>
            <Button
              // variant="contained"
              className={clsx(classes.actionButton, "btn__reset")}
              component={Paper}
              onClick={handleResetValues}
            >
              {resetLabel}
            </Button>
          </Box>
          <Box p={1.5} mr={1} clone>
            <Button
              className={clsx(classes.actionButton, "btn__cancel")}
              component={Paper}
              onClick={() => history.push("/products")}
            >
              {cancelLabel}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductDetails;
