import React from "react";
import { Select, MenuItem, makeStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { USER_ROLE } from "../../../../common/constants/enums";

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

const UserRole = ({
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

  const renderRoleName = (roleName) => {
    let name;
    switch (roleName) {
      case USER_ROLE.Boss:
        name = "Ban lãnh đạo";
        break;
      case USER_ROLE.SuperAdmin:
        name = "Quản tri cấp cao";
        break;
      case USER_ROLE.Admin:
        name = "Quản trị viên";
        break;
      case USER_ROLE.Sale:
        name = "Phòng kinh doanh";
        break;
      case USER_ROLE.WarehouseKeeper:
        name = "Thủ kho";
        break;
      case USER_ROLE.WarehouseKeeperManager:
        name = "Thủ kho trưởng";
        break;
      case USER_ROLE.Customer:
        name = "Khách hàng";
        break;
      default:
        name = "Người lạ";
        break;
    }

    return name;
  };

  const renderMenuItem = () => {
    let listMenu = Object.values(USER_ROLE);

    return listMenu.map((item) => (
      <MenuItem key={item} value={item}>
        {renderRoleName(item)}
      </MenuItem>
    ));
  };

  const iconSelectComponent = (props) => {
    return <ExpandMoreIcon className={props.className + " " + classes.icon} />;
  };

  return (
    <Select
      // disabled={
      //   !isEdit || (value !== USER_ROLE.NEW && value !== USER_ROLE.PROCESSING)
      // }
      disableUnderline
      name="roleName"
      classes={{ root: classes.select }}
      MenuProps={menuProps}
      IconComponent={iconSelectComponent}
      value={value}
      onChange={onChange}
    >
      {renderMenuItem(value)}
    </Select>
  );
};

export default UserRole;