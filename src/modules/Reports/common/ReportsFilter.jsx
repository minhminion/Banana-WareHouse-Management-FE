import { Box, Button, InputLabel, makeStyles, Paper } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import { DatePicker } from "@material-ui/pickers";
import dayjs from "dayjs";
import React from "react";
import { titleCase } from "../../../common/helper";
import { useForm } from "../../../common/hooks/useForm";

const initialValues = {};

const useStyles = makeStyles((theme) => ({
  label: {
    minWidth: 70,
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
}));

const ReportsFilter = ({ onSubmit }) => {
  const classes = useStyles();

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
  } = useForm(initialValues, true, validate);

  const handleSubmit = () => {
    if (validate()) {
      try {
        const fromDate = values.fromDate || Date();
        const toDate = values.toDate || fromDate;

        const newValues = {
          "filters[createdAt]": `"${dayjs(fromDate).format(
            "YYYY-mm-DD"
          )}","${dayjs(toDate).format("YYYY-mm-DD")}"`,
          "filterConditions[createdAt]": "between",
        };
        onSubmit && onSubmit(newValues);
      } catch (error) {}
    }
  };

  const renderDateItem = (props) => {
    return (
      <Button
        id={props.id}
        style={{ width: 120 }}
        className={classes.datePicker}
        onClick={props.onClick}
        disabled={props.disabled}
        ref={props.inputRef}
        {...props.InputProps}
        component={Paper}
      >
        {titleCase(props.value)}
      </Button>
    );
  };

  return (
    <Box display="flex" alignItems="center" mb={2}>
      <Box display="flex" alignItems="center">
        <InputLabel className={classes.label} style={{ marginRight: 8 }}>
          Từ ngày
        </InputLabel>
        <DatePicker
          okLabel="Chọn"
          cancelLabel="Hủy"
          TextFieldComponent={renderDateItem}
          value={values.fromDate}
          placeholder="10/10/2018"
          onChange={(date) =>
            handleInputChange({
              target: {
                name: "fromDate",
                value: date,
              },
            })
          }
          format="DD/MM/YYYY"
        />
      </Box>
      <Box mr={1} ml={1} style={{ fontSize: 16 }}>
        -
      </Box>
      <Box display="flex" alignItems="center" mr={2}>
        <InputLabel className={classes.label} style={{ marginRight: 8 }}>
          Đến ngày
        </InputLabel>
        <DatePicker
          okLabel="Chọn"
          cancelLabel="Hủy"
          TextFieldComponent={renderDateItem}
          value={values.toDate}
          placeholder="10/10/2018"
          onChange={(date) =>
            handleInputChange({
              target: {
                name: "toDate",
                value: date,
              },
            })
          }
          minDate={values.fromDate}
          format="DD/MM/YYYY"
        />
      </Box>
      <Button variant="contained" onClick={handleSubmit}>
        Thông kê
      </Button>
    </Box>
  );
};

export default ReportsFilter;
