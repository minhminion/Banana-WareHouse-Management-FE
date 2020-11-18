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
import { INVENTORY_RECORD_STATUS } from "../../../../common/constants/enums";

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

const InventoryRecordFormDetailsStatus = ({
  classes: classesStyle,
  isEdit,
  style,
  value,
  onChange,
}) => {
  const INVENTORY_RECORD_STATUS = ENUMS.INVENTORY_RECORD_STATUS;
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
      case INVENTORY_RECORD_STATUS.NEW:
        return "Mới tạo";
      case INVENTORY_RECORD_STATUS.PENDING:
        return "Chờ xác nhận";
      case INVENTORY_RECORD_STATUS.APPROVED:
        return "Đã xác nhận";
      case INVENTORY_RECORD_STATUS.DONE:
        return "Hoàn tất";
      case INVENTORY_RECORD_STATUS.CANCELED:
        return "Hủy";
      default:
        return "Unknown step";
    }
  };

  const renderMenuItem = (status) => {
    let listMenu = Object.values(INVENTORY_RECORD_STATUS);
    switch (status) {
      case INVENTORY_RECORD_STATUS.NEW:
        listMenu = [
          INVENTORY_RECORD_STATUS.NEW,
          INVENTORY_RECORD_STATUS.PENDING,
        ];
        break;
      case INVENTORY_RECORD_STATUS.PENDING:
        if (
          [USER_ROLE.Boss, USER_ROLE.WarehouseKeeperManager].indexOf(
            roleName
          ) !== -1
        ) {
          listMenu = [
            INVENTORY_RECORD_STATUS.NEW,
            INVENTORY_RECORD_STATUS.PENDING,
            INVENTORY_RECORD_STATUS.APPROVED,
            INVENTORY_RECORD_STATUS.CANCELED,
          ];
        } else {
          listMenu = [
            INVENTORY_RECORD_STATUS.NEW,
            INVENTORY_RECORD_STATUS.PENDING,
            INVENTORY_RECORD_STATUS.CANCELED,
          ];
        }
        break;
      case INVENTORY_RECORD_STATUS.APPROVED:
        listMenu = [
          INVENTORY_RECORD_STATUS.APPROVED,
          INVENTORY_RECORD_STATUS.DONE,
          INVENTORY_RECORD_STATUS.CANCELED,
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
          (value !== INVENTORY_RECORD_STATUS.NEW &&
            value !== INVENTORY_RECORD_STATUS.PENDING)
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

export default InventoryRecordFormDetailsStatus;
