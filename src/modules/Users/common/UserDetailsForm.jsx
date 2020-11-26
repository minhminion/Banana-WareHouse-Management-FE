import {
  Box,
  Button,
  Grid,
  InputBase,
  InputLabel,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import React, { useEffect } from "react";
import { useForm } from "../../../common/hooks/useForm";
import clsx from "clsx";
import UserRole from "./components/UserRole";
import { USER_ROLE } from "../../../common/constants/enums";

const defaultValues = {
  email: "",
  password: "",
  passwordConfirm: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  roleName: USER_ROLE.Sale,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
    width: "80%",
    maxWidth: 700,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
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

const UserDetailsForm = ({
  initialValues,
  isEdit = true,
  onSubmit,
  okLabel = "Cập nhật",
  resetLabel = "Làm mới",
  cancelLabel = "Hủy",
}) => {
  const classes = useStyles();

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
      } catch (error) { }
    }
  };

  return (
    <Box alignItems="center" className={classes.root}>
      <Box className={clsx(classes.root, classes.leftSide)}>
        <Box className={classes.productDescription}>
          <InputLabel
            className={classes.label}
            style={{ height: 30, marginBottom: 8, lineHeight: 1.7 }}
          >
            Tên người đại diện
          </InputLabel>
          <Box display="flex" alignItems="center">
            <InputBase
              disabled={!isEdit}
              inputProps={{
                style: {
                  padding: 12,
                },
              }}
              name="lastName"
              onChange={handleInputChange}
              value={values.lastName}
              placeholder="Họ"
              classes={{
                root: classes.inputRoot,
                input: classes.input,
                disabled: classes.inputDisabled,
              }}
            />
            <Box ml={2} mr={2}>
              -
            </Box>
            <InputBase
              disabled={!isEdit}
              inputProps={{
                style: {
                  padding: 12,
                },
              }}
              name="firstName"
              onChange={handleInputChange}
              value={values.firstName}
              placeholder="Tên"
              classes={{
                root: classes.inputRoot,
                input: classes.input,
                disabled: classes.inputDisabled,
              }}
            />
          </Box>
        </Box>
        <Box className={classes.productDescription}>
          <InputLabel
            className={classes.label}
            style={{ height: 30, marginBottom: 8, lineHeight: 1.7 }}
          >
            Quyền của tài khoản
          </InputLabel>
          <UserRole value={values.roleName} onChange={handleInputChange} />
        </Box>
        <TextField
          disabled={!isEdit}
          name="email"
          style={{
            width: "100%",
            marginBottom: 24,
          }}
          label={"Email"}
          value={values.email}
          helperText={errors.email}
          error={errors.email?.length > 0}
          onChange={handleInputChange}
          placeholder={"Email..."}
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
        <TextField
          disabled={!isEdit}
          name="phoneNumber"
          style={{
            width: "100%",
            marginBottom: 24,
          }}
          label={"Số điện thoại"}
          value={values.phoneNumber}
          helperText={errors.phoneNumber}
          error={errors.phoneNumber?.length > 0}
          onChange={handleInputChange}
          placeholder={"Sđt..."}
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
        <TextField
          type="password"
          disabled={!isEdit}
          name="password"
          style={{
            width: "100%",
            marginBottom: 24,
          }}
          label={"Mật khẩu"}
          value={values.password}
          helperText={errors.password}
          error={errors.password?.length > 0}
          onChange={handleInputChange}
          placeholder={"Mật khẩu..."}
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
        <TextField
          disabled={!isEdit}
          type="password"
          name="passwordConfirm"
          style={{
            width: "100%",
            marginBottom: 24,
          }}
          label={"Nhập lại mật khẩu"}
          value={values.passwordConfirm}
          helperText={errors.passwordConfirm}
          error={errors.passwordConfirm?.length > 0}
          onChange={handleInputChange}
          placeholder={"Xác nhận..."}
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
        </Box>
      </Box>
    </Box>
  );
};

export default UserDetailsForm;
