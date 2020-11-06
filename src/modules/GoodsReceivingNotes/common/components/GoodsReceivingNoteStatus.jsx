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

const GoodsReceivingNoteStatus = ({
  classes: classesStyle,
  isEdit,
  style,
  value,
  onChange,
}) => {
  const GOOD_RECEIVING_STATUS = ENUMS.GOOD_RECEIVING_STATUS;
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
      case GOOD_RECEIVING_STATUS.NEW:
        return "Mới tạo";
      case GOOD_RECEIVING_STATUS.PENDING:
        return "Chờ xử lý";
      case GOOD_RECEIVING_STATUS.APPROVED:
        return "Đã xác nhận";
      case GOOD_RECEIVING_STATUS.DONE:
        return "Hoàn tất";
      case GOOD_RECEIVING_STATUS.CANCELED:
        return "Hủy";
      default:
        return "Unknown step";
    }
  };

  const renderMenuItem = (status) => {
    let listMenu = Object.values(GOOD_RECEIVING_STATUS);
    switch (status) {
      case GOOD_RECEIVING_STATUS.NEW:
        listMenu = [
          GOOD_RECEIVING_STATUS.NEW,
          GOOD_RECEIVING_STATUS.PENDING,
          GOOD_RECEIVING_STATUS.CANCELED,
        ];
        break;
      case GOOD_RECEIVING_STATUS.PENDING:
        listMenu = [
          GOOD_RECEIVING_STATUS.PENDING,
          GOOD_RECEIVING_STATUS.DONE,
          GOOD_RECEIVING_STATUS.CANCELED,
        ];
        break;
      default:
        break;
    }

    return listMenu.map((item) => (
      <MenuItem key={item} value={item}>{getMenuContent(item)}</MenuItem>
    ));
  };

  const iconSelectComponent = (props) => {
    return <ExpandMoreIcon className={props.className + " " + classes.icon} />;
  };

  return (
    <Box style={{ ...style }} className={classesStyle.productDescription}>
      <InputLabel className={classesStyle.label} style={{ marginBottom: 8 }}>
        Trạng thái
      </InputLabel>
      <Select
        disabled={
          !isEdit ||
          (value !== GOOD_RECEIVING_STATUS.NEW && value !== GOOD_RECEIVING_STATUS.PENDING)
        }
        disableUnderline
        name="status"
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

export default GoodsReceivingNoteStatus;
