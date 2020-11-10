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

const ProposalStatus = ({
  classes: classesStyle,
  isEdit,
  style,
  value,
  onChange,
}) => {
  const ProposalStatus = ENUMS.PROPOSAL_STATUS;
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
      case ProposalStatus.NEW:
        return "Mới tạo";
      case ProposalStatus.PROCESSING:
        return "Đang thực hiện";
      case ProposalStatus.FORCE_DONE:
        return "Buộc hoàn tất";
      case ProposalStatus.CANCELED:
        return "Hủy";
      default:
        return "Unknown step";
    }
  };

  const renderMenuItem = (status) => {
    let listMenu = Object.values(ProposalStatus);
    switch (status) {
      case ProposalStatus.NEW:
        listMenu = [
          ProposalStatus.NEW,
          ProposalStatus.PROCESSING,
          ProposalStatus.CANCELED,
        ];
        break;
      case ProposalStatus.PROCESSING:
        listMenu = [
          ProposalStatus.PROCESSING,
          ProposalStatus.FORCE_DONE,
          ProposalStatus.CANCELED,
        ];
        break;
      default:
        break;
    }

    return listMenu.map((item) => (
      <MenuItem
        key={item}
        value={item}
      >
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
        Trạng thái
      </InputLabel>
      <Select
        disabled={
          !isEdit ||
          (value !== ProposalStatus.NEW && value !== ProposalStatus.PROCESSING)
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

export default ProposalStatus;
