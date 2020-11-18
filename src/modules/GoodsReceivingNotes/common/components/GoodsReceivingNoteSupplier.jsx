import {
  Box,
  IconButton,
  InputBase,
  InputLabel,
  ListItem,
  ListItemSecondaryAction,
  makeStyles,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";

import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import { useHistory } from "react-router-dom";
import { ENUMS } from "../../../../common/constants";
import { useSelector } from "react-redux";
import { MODULE_NAME as MODULE_AUTHOR } from "../../../Author/constants/models";

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
    transition: ".2s all ease-out",
  },
  icon: {
    right: 12,
    position: "absolute",
    userSelect: "none",
    pointerEvents: "none",
  },
}));

const USER_ROLE = ENUMS.USER_ROLE;

const GoodsReceivingNoteSupplier = ({
  classes: classesStyle,
  isEdit,
  style,
  value,
  suppliers = [],
  onChange,
}) => {
  const history = useHistory();
  const classes = useStyles();

  const { roleName } = useSelector((state) => state[MODULE_AUTHOR]);

  const isAuth = [USER_ROLE.Admin, USER_ROLE.Boss].indexOf(roleName) !== -1;

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
      <MenuItem
        component={ListItem}
        ContainerComponent="div"
        button
        key={supplier.id}
        value={supplier.id}
        style={{
          justifyContent: "space-between",
          cursor: "context-menu",
        }}
      >
        <Box>
          <strong>{supplier.name || "Min da poet"}</strong>
          <Typography variant="body2">
            {`${supplier.email || "minhminion2015@gmail.com"} - ${
              supplier.phoneNumber
            }`}
          </Typography>
        </Box>
        <ListItemSecondaryAction>
          {isAuth ? (
            <IconButton
              onClick={() => history.push(`/suppliers/${supplier.id}/edit`)}
            >
              <EditIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => history.push(`/suppliers/${supplier.id}`)}
            >
              <InfoIcon />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </MenuItem>
    ));
  };

  const iconSelectComponent = (props) => {
    return <ExpandMoreIcon className={props.className + " " + classes.icon} />;
  };

  const isExternalSupplier = value.id === 0;

  return (
    <Box style={{ ...style }} className={classesStyle.productDescription}>
      <InputLabel className={classesStyle.label} style={{ marginBottom: 8 }}>
        Nhà cung cấp
        {isAuth && (
          <Tooltip title="Thêm nhà cung cấp">
            <IconButton
              size="small"
              style={{ marginLeft: 8 }}
              onClick={() => history.push("/suppliers/add")}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </InputLabel>
      <Box>
        <Select
          style={{ marginRight: 16 }}
          disabled={!isEdit}
          disableUnderline
          name="supplierId"
          renderValue={(value) => {
            const supplier = suppliers?.find((item) => item.id === value);
            return supplier ? (
              <Box>
                <strong>{supplier.name || "Min da poet"}</strong>
                <Typography variant="body2">
                  {`${supplier.email || "minhminion2015@gmail.com"} - ${
                    supplier.phoneNumber
                  }`}
                </Typography>
              </Box>
            ) : (
              "Nhà cung cấp ngoài hệ thống"
            );
          }}
          classes={{
            root: clsx(classes.select, {
              [classes.externalSelect]: isExternalSupplier,
            }),
          }}
          MenuProps={menuProps}
          IconComponent={iconSelectComponent}
          value={value.id}
          onChange={onChange}
        >
          <MenuItem key={0} value={0}>
            Nhà cung cấp ngoài hệ thống
          </MenuItem>
          {suppliers && renderMenuItem(suppliers)}
        </Select>
        {isExternalSupplier && (
          <InputBase
            name="supplierName"
            autoFocus={isExternalSupplier}
            style={{ height: 46, marginTop: 8 }}
            disabled={!isEdit}
            placeholder="Tên nhà cung cấp ngoài"
            value={value.name}
            classes={{
              root: classesStyle.inputRoot,
              input: classesStyle.input,
              disabled: classesStyle.inputDisabled,
            }}
            onChange={onChange}
          />
        )}
      </Box>
    </Box>
  );
};

export default GoodsReceivingNoteSupplier;
