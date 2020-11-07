import {
  Box,
  Divider,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";

import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  select: {
    display: "flex",
    minWidth: 400,
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

const GoodsReceivingNoteSupplier = ({
  classes: classesStyle,
  isEdit,
  style,
  value,
  suppliers,
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

  const renderMenuItem = (suppliers) => {
    return suppliers.map((supplier) => (
      <MenuItem key={supplier.id} value={supplier.id}>
        {/* {supplier.name} */}
        <strong>{supplier.name || "Min da poet"}</strong>
        <Typography variant="body2" style={{ marginLeft: 16 }}>
          {`${supplier.email || "minhminion2015@gmail.com"} - ${
            supplier.phoneNumber
          }`}
        </Typography>
      </MenuItem>
    ));
  };

  const iconSelectComponent = (props) => {
    return <ExpandMoreIcon className={props.className + " " + classes.icon} />;
  };
  return (
    <Box style={{ ...style }} className={classesStyle.productDescription}>
      <InputLabel className={classesStyle.label} style={{ marginBottom: 8 }}>
        Nhà cung cấp
        <Tooltip title="Thêm nhà cung cấp">
          <IconButton size="small" style={{ marginLeft: 8 }}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </InputLabel>
      <Select
        disabled={!isEdit}
        disableUnderline
        name="supplierId"
        classes={{ root: classes.select }}
        MenuProps={menuProps}
        IconComponent={iconSelectComponent}
        value={value}
        onChange={onChange}
      >
        <MenuItem key={0} value={0}>
          Nhà cung cấp ngoài hệ thống
        </MenuItem>
        {suppliers && renderMenuItem(suppliers)}
      </Select>
    </Box>
  );
};

export default GoodsReceivingNoteSupplier;
