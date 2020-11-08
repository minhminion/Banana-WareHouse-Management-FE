import React from "react";
import {
  Box,
  Select,
  MenuItem,
  makeStyles,
  InputLabel,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ENUMS } from "../../../../common/constants";

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
}));

const ProductDetailsStatus = ({
  classes: classesStyle,
  isEdit,
  style,
  value,
  onChange,
}) => {
  const ProductStatus = ENUMS.PRODUCT_STATUS;
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

  const iconSelectComponent = (props) => {
    return <ExpandMoreIcon className={props.className + " " + classes.icon} />;
  };

  return (
    <Box style={{ ...style }} className={classesStyle.productDescription}>
      <InputLabel
        className={classesStyle.label}
        style={{ marginBottom: 8, height: 30, lineHeight: 1.7 }}
      >
        Trạng thái
      </InputLabel>
      <Select
        disabled={!isEdit}
        disableUnderline
        name="status"
        classes={{ root: classes.select }}
        MenuProps={menuProps}
        IconComponent={iconSelectComponent}
        value={value}
        onChange={onChange}
      >
        <MenuItem value={ProductStatus.AVAILABLE}>Còn bán</MenuItem>
        <MenuItem value={ProductStatus.UNAVAILABLE}>Ngưng bán</MenuItem>
        <MenuItem value={ProductStatus.HIDED}>Ẩn</MenuItem>
        <MenuItem value={ProductStatus.LOCKED}>Khóa</MenuItem>
      </Select>
    </Box>
  );
};

export default ProductDetailsStatus;
