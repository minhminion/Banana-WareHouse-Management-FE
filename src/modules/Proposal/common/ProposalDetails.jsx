import React, { useEffect } from "react";
import {
  Grid,
  makeStyles,
  TextField,
  InputLabel,
  Box,
} from "@material-ui/core";
import clsx from "clsx";
import { blueGrey } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";
import { useForm } from "../../../common/hooks/useForm";
import ListProposalProducts from "./components/ListProposalProducts";
import { ENUMS } from "../../../common/constants";

const defaultValues = {
  id: 1,
  creator: "231",
  createdAt: Date.now(),
  period: 2,
  status: 1,
  products: [
    {
      id: 1,
      name: "Bưởi Năm Roi",
      quantity: 2000,
      action: "deleted"
    },
    {
      id: 2,
      name: "Bưởi Năm Roi",
      quantity: 2000,
    },
  ],
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
    width: "calc(100% - 550px)",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  rightSide: {
    width: 550,
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

const PROPOSAL_STATUS = ENUMS.PRODUCT_STATUS.AVAILABLE;

const ProposalDetails = (initialValues, isEdit = false, onSubmit) => {
  const classes = useStyles();
  const history = useHistory();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
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
    setDefaultValues(initialValues);
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
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item className={clsx(classes.root, classes.leftSide)}>
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
        </Grid>
        <Grid item className={clsx(classes.root, classes.rightSide)}>
          <Box className={classes.productDescription}>
            {/* <InputLabel className={classes.label} style={{ marginBottom: 8 }}>
              Danh sách sản phẩm
            </InputLabel> */}
            <ListProposalProducts
              status={PROPOSAL_STATUS}
              data={values.products}
              errors={errors}
              onChange={handleInputChange}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProposalDetails;
