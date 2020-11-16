import React, { useEffect } from "react";
import {
  Grid,
  makeStyles,
  Box,
  Paper,
  Button,
  TextField,
  InputLabel,
  InputBase,
  FormHelperText,
} from "@material-ui/core";
import clsx from "clsx";
import { blueGrey } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";
import { useForm } from "../../../common/hooks/useForm";
import Alert from "@material-ui/lab/Alert";

// Helper
import { ENUMS } from "../../../common/constants";
import parse from "html-react-parser";
import useConfirm from "../../../common/hooks/useConfirm/useConfirm";
import SupplierDetailsStatus from "./components/SupplierDetailsStatus";
import { MODULE_NAME } from "../constants/models";
import ListProductModal from "./components/ListProductModal";
import ListSupplierProducts from "./components/ListSupplierProducts";

const defaultValues = {
  address: "",
  email: "",
  name: "",
  phoneNumber: "",
  representative: "",
  status: 1,
  supplierProducts: [],
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
    "& .MuiAlert-message p": {
      margin: 0,
    },
  },
  leftSide: {
    width: "calc(100% - 600px)",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  rightSide: {
    width: 600,
    [theme.breakpoints.down("sm")]: {
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
      minHeight: 200,
      height: "100%",
      maxHeight: 400,
      "&:not(.ck-focused)": {
        border: theme.border[0],
      },
    },
  },
  datePicker: {
    minWidth: 300,
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
  actionButton: {
    background: theme.palette.secondary.main,
    minWidth: 120,
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

const SupplierDetails = ({
  supplierProducts,
  initialValues,
  isEdit = true,
  onSubmit,
  okLabel = "Cập nhật",
  resetLabel = "Làm mới",
  cancelLabel = "Hủy",
}) => {
  let minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  const classes = useStyles();
  const history = useHistory();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues) {
      if (fieldValues.name.trim().length !== 0) {
        temp.name = "";
      } else {
        temp.name = "Vui lòng nhập tên nhà cung cấp";
      }
    }
    if ("email" in fieldValues) {
      if (fieldValues.email.trim().length !== 0) {
        temp.email = /$^|.+@.+..+/.test(fieldValues.email)
          ? ""
          : "Email không hợp lệ";
      } else {
        temp.email = "Vui lòng nhập email nhà cung cấp";
      }
    }
    if ("phoneNumber" in fieldValues) {
      if (fieldValues.phoneNumber.trim().length !== 0) {
        temp.phoneNumber = /(09|01[2|6|8|9])+([0-9]{8})\b/g.test(
          fieldValues.phoneNumber
        )
          ? ""
          : "Số điện thoại không hợp lệ";
      } else {
        temp.phoneNumber = "Vui lòng nhập số điện nhà cung cấp";
      }
    }
    if ("address" in fieldValues) {
      if (fieldValues.address.trim().length !== 0) {
        temp.address = "";
      } else {
        temp.address = "Vui lòng nhập địa chỉ nhà cung cấp";
      }
    }
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
    handleResetValues();
  }, [initialValues]);

  const handleResetValues = () => {
    if (initialValues) {
      setDefaultValues(initialValues);
    } else {
      setDefaultValues(defaultValues);
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      try {
        const newValues = {
          ...values,
        };
        onSubmit && onSubmit(newValues);
      } catch (error) {}
    }
  };

  return (
    <Box className={classes.root}>
      {values.status === ENUMS.GOOD_RECEIVING_STATUS.CANCELED && (
        <Box clone mb={2}>
          <Alert severity="error">
            {parse(initialValues?.exceptionReason || "")}
          </Alert>
        </Box>
      )}

      <Grid container spacing={3}>
        <Grid item className={clsx(classes.root, classes.leftSide)}>
          {/* Supplier Name */}
          <TextField
            disabled={!isEdit}
            name="name"
            style={{
              width: "100%",
              marginBottom: 24,
            }}
            label={"Tên nhà cung cấp"}
            value={values.name}
            helperText={errors.name}
            error={errors.name?.length > 0}
            onChange={handleInputChange}
            placeholder={"Tên nhà cung cấp"}
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

          {/* Representative & Status */}
          <Box
            className={classes.productDescription}
            display="flex"
            justifyContent="space-between"
          >
            <div style={{ width: "60%" }}>
              <InputLabel
                className={classes.label}
                style={{ height: 30, marginBottom: 8, lineHeight: 1.7 }}
              >
                Tên người đại diện
              </InputLabel>
              <InputBase
                disabled={!isEdit}
                inputProps={{
                  style: {
                    padding: 12,
                  },
                }}
                name="representative"
                onChange={handleInputChange}
                value={values.representative}
                placeholder="Tên người đại diện"
                classes={{
                  root: classes.inputRoot,
                  input: classes.input,
                  disabled: classes.inputDisabled,
                }}
              />
              <p></p>
            </div>
            <SupplierDetailsStatus
              value={values.status}
              onChange={handleInputChange}
              classes={classes}
              isEdit={isEdit && values.id}
              style={{ minWidth: 50, marginBottom: 0 }}
            />
          </Box>

          {/* Email & Phone number */}
          <Box
            className={classes.productDescription}
            display="flex"
            justifyContent="space-between"
          >
            <div style={{ width: "48%" }}>
              <InputLabel
                className={classes.label}
                style={{ height: 30, marginBottom: 8, lineHeight: 1.7 }}
              >
                Email
              </InputLabel>
              <InputBase
                disabled={!isEdit}
                inputProps={{
                  style: {
                    padding: 12,
                  },
                }}
                name="email"
                onChange={handleInputChange}
                value={values.email}
                error={errors.email?.length > 0}
                placeholder="Email"
                classes={{
                  root: classes.inputRoot,
                  input: classes.input,
                  disabled: classes.inputDisabled,
                }}
              />
              {errors.email?.length > 0 && (
                <FormHelperText error>{errors.email}</FormHelperText>
              )}
            </div>
            <div style={{ width: "48%" }}>
              <InputLabel
                className={classes.label}
                style={{ height: 30, marginBottom: 8, lineHeight: 1.7 }}
              >
                Số điện thoại
              </InputLabel>
              <InputBase
                disabled={!isEdit}
                inputProps={{
                  style: {
                    padding: 12,
                  },
                }}
                name="phoneNumber"
                onChange={handleInputChange}
                value={values.phoneNumber}
                error={errors.phoneNumber?.length > 0}
                placeholder="Số điện thoại"
                classes={{
                  root: classes.inputRoot,
                  input: classes.input,
                  disabled: classes.inputDisabled,
                }}
              />
              {errors.phoneNumber?.length > 0 && (
                <FormHelperText error>{errors.phoneNumber}</FormHelperText>
              )}
            </div>
          </Box>
          <TextField
            disabled={!isEdit}
            name="address"
            style={{
              width: "100%",
              marginBottom: 24,
            }}
            label={"Địa chỉ nhà cung cấp"}
            value={values.address}
            helperText={errors.address}
            error={errors.address?.length > 0}
            onChange={handleInputChange}
            placeholder={"Địa chỉ nhà cung cấp"}
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
                  onClick={() => history.push(`/${MODULE_NAME}`)}
                >
                  {cancelLabel}
                </Button>
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item className={clsx(classes.root, classes.rightSide)}>
          <Box className={classes.productDescription}>
            <ListSupplierProducts
              listProduct={supplierProducts}
              isEdit={isEdit}
              data={values.supplierProducts}
              errors={errors}
              onChange={handleInputChange}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SupplierDetails;
