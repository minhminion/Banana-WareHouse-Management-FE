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
import { MODULE_NAME as MODULE_AUTHOR } from "../../../Author/constants/models";
import { useSelector } from "react-redux";
import { GOOD_RECEIVING_RETURN_STATUS } from "../../../../common/constants/enums";

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

const GoodsReceivingOfReturnDetailsStatus = ({
  classes: classesStyle,
  isEdit,
  style,
  value,
  onChange,
}) => {
  const GOOD_RECEIVING_RETURN_STATUS = ENUMS.GOOD_RECEIVING_RETURN_STATUS;
  const USER_ROLE = ENUMS.USER_ROLE;
  const classes = useStyles();

  const { roleName } = useSelector((state) => state[MODULE_AUTHOR]);

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
      case GOOD_RECEIVING_RETURN_STATUS.NEW:
        return "Mới tạo";
      case GOOD_RECEIVING_RETURN_STATUS.PENDING:
        return "Chờ xác nhận";
      case GOOD_RECEIVING_RETURN_STATUS.APPROVED:
        return "Đã xác nhận";
      case GOOD_RECEIVING_RETURN_STATUS.DONE:
        return "Hoàn tất";
      case GOOD_RECEIVING_RETURN_STATUS.CANCELED:
        return "Hủy";
      default:
        return "Unknown step";
    }
  };

  const renderMenuItem = (status) => {
    let listMenu = Object.values(GOOD_RECEIVING_RETURN_STATUS);
    switch (status) {
      case GOOD_RECEIVING_RETURN_STATUS.NEW:
        listMenu = [GOOD_RECEIVING_RETURN_STATUS.NEW, GOOD_RECEIVING_RETURN_STATUS.PENDING];
        break;
      case GOOD_RECEIVING_RETURN_STATUS.PENDING:
        if (
          [USER_ROLE.Boss, USER_ROLE.WarehouseKeeperManager].indexOf(
            roleName
          ) !== -1
        ) {
          listMenu = [
            GOOD_RECEIVING_RETURN_STATUS.NEW,
            GOOD_RECEIVING_RETURN_STATUS.PENDING,
            GOOD_RECEIVING_RETURN_STATUS.APPROVED,
            GOOD_RECEIVING_RETURN_STATUS.CANCELED,
          ];
        } else {
          listMenu = [
            GOOD_RECEIVING_RETURN_STATUS.NEW,
            GOOD_RECEIVING_RETURN_STATUS.PENDING,
            GOOD_RECEIVING_RETURN_STATUS.CANCELED,
          ];
        }
        break;
      case GOOD_RECEIVING_RETURN_STATUS.APPROVED:
        listMenu = [
          GOOD_RECEIVING_RETURN_STATUS.APPROVED,
          GOOD_RECEIVING_RETURN_STATUS.DONE,
          GOOD_RECEIVING_RETURN_STATUS.CANCELED,
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
        Trạng thái phiếu
      </InputLabel>
      <Select
        disabled={
          !isEdit ||
          (value !== GOOD_RECEIVING_RETURN_STATUS.NEW &&
            value !== GOOD_RECEIVING_RETURN_STATUS.PENDING &&
            value !== GOOD_RECEIVING_RETURN_STATUS.APPROVED)
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

export default GoodsReceivingOfReturnDetailsStatus;
