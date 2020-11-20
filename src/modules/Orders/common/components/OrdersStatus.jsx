import React from "react";
import {
  Box,
  Select,
  MenuItem,
  makeStyles,
  InputLabel,
} from "@material-ui/core";
import { ENUMS } from "../../../../common/constants";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  select: {
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

const OrdersStatus = ({
  classes: classesStyle,
  isEdit,
  style,
  value,
  onChange,
}) => {
  const ORDER_STATUS = ENUMS.ORDER_STATUS;
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

  const getMenuContent = (status) => {
    switch (status) {
      case ORDER_STATUS.NEW:
        return "Mới tạo";
      case ORDER_STATUS.PROCESSING:
        return "Đang xử lý";
      case ORDER_STATUS.EXPORTED:
        return "Đã xuất kho";
      case ORDER_STATUS.DONE:
        return "Hoàn tất";
      case ORDER_STATUS.CANCELED:
        return "Đã hủy";
      default:
        return "Unknown step";
    }
  };

  const renderMenuItem = (status) => {
    let listMenu = Object.values(ORDER_STATUS);
    switch (status) {
      case ORDER_STATUS.NEW:
        listMenu = [
          ORDER_STATUS.NEW,
          ORDER_STATUS.PROCESSING,
          ORDER_STATUS.CANCELED,
        ];
        break;
      case ORDER_STATUS.PROCESSING:
        listMenu = [ORDER_STATUS.PROCESSING, ORDER_STATUS.CANCELED];
        break;
      case ORDER_STATUS.EXPORTED:
        listMenu = [
          ORDER_STATUS.EXPORTED,
          ORDER_STATUS.DONE,
          ORDER_STATUS.CANCELED,
        ];
        break;
      default:
        break;
    }

    return listMenu.map((item) => (
      <MenuItem key={item} value={item}>
        {getMenuContent(item)}
      </MenuItem>
    ));
  };

  const iconSelectComponent = (props) => {
    return <ExpandMoreIcon className={props.className + " " + classes.icon} />;
  };

  return (
    <Box style={{ ...style }} className={classesStyle.productDescription}>
      <InputLabel className={classesStyle.label} style={{ marginBottom: 8 }}>
        Tình trạng phiếu
      </InputLabel>
      <Select
        disabled={
          !isEdit ||
          (value !== ORDER_STATUS.NEW && value !== ORDER_STATUS.PROCESSING)
        }
        disableUnderline
        name="status"
        style={{ width: "100%" }}
        classes={{ root: classes.select }}
        MenuProps={menuProps}
        IconComponent={iconSelectComponent}
        value={value}
        onChange={onChange}
      >
        {renderMenuItem(value)}
      </Select>
    </Box>
  );
};

export default OrdersStatus;
