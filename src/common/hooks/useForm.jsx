import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { formatNumberToReadable, formatVNDToNumber } from "../helper";

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const setDefaultValues = (values) => {
    setValues((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const handleInputChange = (e, isNumber) => {
    const { name, value } = e.target;
    let newValue = value;
    if (isNumber === true) {
      newValue = formatVNDToNumber(value);
      if (newValue.match(/^0/g)) newValue = "";
    }
    setValues({
      ...values,
      [name]: newValue,
    });
    if (validateOnChange) validate({ [name]: newValue });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    setDefaultValues,
  };
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.form} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
