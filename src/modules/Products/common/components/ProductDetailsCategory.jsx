import React from "react";
import {
  Box,
  Select,
  MenuItem,
  makeStyles,
  InputLabel,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  select: {
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
  icon: {
    right: 12,
    position: "absolute",
    userSelect: "none",
    pointerEvents: "none",
  },
}));

const ProductDetailsCategory = ({
  classes: classesStyle,
  isEdit,
  style,
  value,
  onChange,
}) => {
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
      <InputLabel className={classesStyle.label} style={{ marginBottom: 8 }}>
        Danh mục sản phẩm
      </InputLabel>
      <Select
        disabled={!isEdit}
        disableUnderline
        name="productCategoryId"
        classes={{ root: classes.select }}
        MenuProps={menuProps}
        IconComponent={iconSelectComponent}
        value={value}
        onChange={onChange}
      >
        <MenuItem value={1}>Trái cây Việt Nam</MenuItem>
        <MenuItem value={2}>Trái cây nhập khẩu từ Mỹ</MenuItem>
        <MenuItem value={3}>Trái cây nhập khẩu từ Úc</MenuItem>
        <MenuItem value={4}>Trái cây nhập khẩu từ Ấn độ</MenuItem>
      </Select>
    </Box>
  );
};

export default ProductDetailsCategory;
