import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// ICONS
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import GroupIcon from "@material-ui/icons/Group";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import AssignmentIcon from "@material-ui/icons/Assignment";
import TimerIcon from "@material-ui/icons/Timer";
import SettingsIcon from "@material-ui/icons/Settings";
import PhonelinkSetupIcon from "@material-ui/icons/PhonelinkSetup";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import CallMadeIcon from "@material-ui/icons/CallMade";
import AssignmentReturnedIcon from "@material-ui/icons/AssignmentReturned";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';

import { useDispatch, useSelector } from "react-redux";
import { toggleCollapseNavigator } from "../redux/actions/uiActions";
import { Link, useLocation } from "react-router-dom";
import { Badge, Collapse, Avatar, Tooltip } from "@material-ui/core";
import { USER_ROLE } from "../constants/enums";
import { MODULE_NAME as MODULE_AUTHOR } from "../../modules/Author/constants/models";

const menus = [
  {
    id: "Chung",
    showHeader: false,
    children: [
      {
        id: "Thống kê",
        icon: <DashboardIcon />,
        link: "",
        isDefault: true,
        acceptRole: [USER_ROLE.Admin],
      },

      {
        id: "Báo cáo",
        icon: <ListAltIcon />,
        link: "reports",
        acceptRole: [USER_ROLE.Admin],
      },
    ],
  },
  {
    id: "Quản lý",
    showHeader: false,
    children: [
      {
        id: "Sản phẩm",
        icon: <ShoppingBasketIcon />,
        link: "products",
        acceptRole: [USER_ROLE.Admin],
      },
      {
        id: "Nhà cung cấp",
        icon: <HomeWorkIcon />,
        link: "suppliers",
        acceptRole: [USER_ROLE.Admin],
      },
    ],
  },
  {
    id: "Kiểm kê",
    showHeader: false,
    children: [
      {
        id: "Kiểm kê sản phẩm",
        icon: <AssignmentTurnedInIcon />,
        link: "inventoryRecordForms",
        acceptRole: [
          USER_ROLE.WarehouseKeeper,
          USER_ROLE.WarehouseKeeperManager,
        ],
      },
      {
        id: "Phiếu hủy sản phẩm",
        icon: <DeleteSweepIcon />,
        link: "productRemoveForms",
        acceptRole: [
          USER_ROLE.WarehouseKeeper,
          USER_ROLE.WarehouseKeeperManager,
        ],
      },
    ],
  },
  {
    id: "Nhập kho",
    showHeader: false,
    children: [
      {
        id: "Đề nghị nhập hàng",
        icon: <AssignmentIcon />,
        link: "proposal",
        acceptRole: [
          USER_ROLE.WarehouseKeeper,
          USER_ROLE.WarehouseKeeperManager,
          USER_ROLE.Sale,
          USER_ROLE.Admin,
        ],
      },
      {
        id: "Phiếu nhập hàng",
        icon: <CallReceivedIcon />,
        link: "goodsReceivingNotes",
        acceptRole: [
          USER_ROLE.WarehouseKeeper,
          USER_ROLE.WarehouseKeeperManager,
          USER_ROLE.Sale,
          USER_ROLE.Admin,
        ],
      },
    ],
  },
  {
    id: "Xuất kho",
    showHeader: false,
    children: [
      {
        id: "Đơn hàng",
        icon: <ReceiptIcon />,
        link: "orders",
        acceptRole: [
          USER_ROLE.WarehouseKeeper,
          USER_ROLE.WarehouseKeeperManager,
          USER_ROLE.Sale,
          USER_ROLE.Admin,
        ],
      },
      {
        id: "Phiếu xuất kho",
        icon: <CallMadeIcon />,
        link: "goodsDeliveryNotes",
        acceptRole: [
          USER_ROLE.WarehouseKeeper,
          USER_ROLE.WarehouseKeeperManager,
          USER_ROLE.Sale,
          USER_ROLE.Admin,
        ],
      },
      {
        id: "Đề nghị trả hàng",
        icon: <AssignmentReturnedIcon />,
        link: "merchandiseReturnProposals",
        acceptRole: [
          USER_ROLE.WarehouseKeeper,
          USER_ROLE.WarehouseKeeperManager,
          USER_ROLE.Sale,
          USER_ROLE.Admin,
        ],
      },
      {
        id: "Nhập kho trả hàng",
        icon: <AssignmentReturnIcon />,
        link: "goodsReceivingOfReturns",
        acceptRole: [
          USER_ROLE.WarehouseKeeper,
          USER_ROLE.WarehouseKeeperManager,
          USER_ROLE.Sale,
          USER_ROLE.Admin,
        ],
      },
    ],
  },
  {
    id: "Quản lý",
    showHeader: false,
    children: [
      {
        id: "Tài khoản",
        icon: <GroupIcon />,
        link: "users",
        acceptRole: [USER_ROLE.SuperAdmin, USER_ROLE.Admin],
      },
    ],
  },
];

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    justifyContent: "center",
    minHeight: 45,
    whiteSpace: "nowrap",
    paddingTop: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.common.white,
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    justifyContent: "center",
    float: "left",
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: theme.palette.primary.main,
  },
  itemCollapseItem: {
    padding: 0,
    width: "auto",
    borderRadius: theme.spacing(0.5),
    "& .MuiListItemIcon-root": {
      display: "flex",
      margin: 0,
      justifyContent: "center",
    },
    "& .MuiListItemText-root": {
      margin: 0,
      display: "none",
    },
  },
  itemPrimary: {
    fontSize: "inherit",
  },
  itemIcon: {
    minWidth: "auto",
    fontSize: 18,
    marginRight: theme.spacing(2),
    "&.locked-icon": {
      display: "none",
    },
  },
  itemToggleCollapse: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: "block",
    width: "auto",
    "& .MuiListItemIcon-root": {
      display: "flex",
      margin: 0,
      justifyContent: "center",
    },
    "& .MuiListItemText-root": {
      margin: 0,
      display: "none",
    },
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    "&:nth-last-child(1)": {
      display: "none",
    },
  },
  menuList: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    maxHeight: "90vh",
    overflowX: "hidden",
    overflowY: "auto",
    "& > a": {
      textDecoration: "none",
    },
    "& > a[disabled]": {
      pointerEvents: "none",
    },
    "&::-webkit-scrollbar": {
      width: 8,
      backgroundColor: "#051e34",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#8a9bb2",
      borderRadius: 8,
      border: "2px solid #262f3d",
    },
  },
  logo: {
    padding: theme.spacing(2),
    height: 64,
  },
  disableLink: {
    pointerEvents: "none",
  },
});

function Navigator(props) {
  const { classes, collapse, ...other } = props;
  const dispatch = useDispatch();
  const location = useLocation();

  const { roleName } = useSelector((state) => state[MODULE_AUTHOR]);

  const [open, setOpen] = useState(false);

  const handleCollapsed = () => {
    if (open) setOpen("");
    dispatch(toggleCollapseNavigator());
  };

  const handleOpenSub = (childId) => {
    if (collapse) dispatch(toggleCollapseNavigator());
    setOpen((prev) => (prev === childId ? "" : childId));
  };

  const handleClickDisableLink = (e, subNav, link) => {
    if (subNav || link === location.pathname) {
      e.preventDefault();
    }
  };

  const pathName = location.pathname.substring(1);

  const renderNavigatorItem = (
    { id: childId, icon, link, isDefault, subNav, acceptRole },
    step = 1
  ) => {
    const active =
      pathName.length > 0 ? pathName.split("/")[0] === link : isDefault;
    const count = 0;
    const auth = acceptRole
      ? [...acceptRole, USER_ROLE.Boss].indexOf(roleName) !== -1
      : true;
    return (
      auth && (
        <Fragment key={childId}>
          <Link
            to={subNav ? "#" : `/${link}`}
            onClick={(e) => handleClickDisableLink(e, subNav, `/${link}`)}
          >
            <Tooltip
              disableHoverListener={!collapse}
              title={childId}
              aria-label={link}
              arrow
              placement="right"
            >
              <ListItem
                button
                disableGutters
                onClick={() => subNav && handleOpenSub(childId)}
                className={clsx(
                  classes.item,
                  active && classes.itemActiveItem,
                  collapse && classes.itemCollapseItem
                )}
              >
                <ListItemIcon className={classes.itemIcon}>
                  <Badge
                    invisible={!collapse || count === 0}
                    color="secondary"
                    max={99}
                    badgeContent={count}
                  >
                    {icon}
                  </Badge>
                </ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
                {subNav && (
                  <ListItemIcon
                    className={clsx(
                      classes.itemIcon,
                      collapse && "locked-icon"
                    )}
                    style={{ float: "right", margin: 0 }}
                  >
                    {open === childId ? <ExpandLess /> : <ExpandMore />}
                  </ListItemIcon>
                )}
              </ListItem>
            </Tooltip>
          </Link>
          {subNav && (
            <Collapse in={open === childId} timeout="auto" unmountOnExit>
              <List
                className={classes.menuList}
                disablePadding
                style={{ marginLeft: step * 8, paddingRight: 0 }}
              >
                {subNav.map((nav) => renderNavigatorItem(nav, step + 1))}
              </List>
            </Collapse>
          )}
        </Fragment>
      )
    );
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding className={classes.logo}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <ListItem disableGutters button className={clsx(classes.firebase)}>
            <ListItemIcon className={classes.itemIcon}>
              <Avatar
                alt="Remy Sharp"
                src={`${process.env.PUBLIC_URL}/images/logo.svg`}
              />
            </ListItemIcon>
            {!collapse && <ListItemText>Banana Boys</ListItemText>}
          </ListItem>
        </Link>
      </List>
      <List className={clsx(classes.menuList)}>
        {menus.map(({ id, showHeader, children }) => (
          <React.Fragment key={id}>
            <ListItem
              style={!showHeader || collapse ? { display: "none" } : {}}
              className={classes.categoryHeader}
            >
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map((child) => renderNavigatorItem(child))}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
      {collapse !== undefined && (
        <React.Fragment>
          <Divider className={classes.divider} style={{ marginTop: 0 }} />
          <ListItem
            key="collapse"
            button
            onClick={handleCollapsed}
            className={clsx(classes.item, classes.itemToggleCollapse)}
          >
            <ListItemIcon className={classes.itemIcon}>
              {collapse ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
            </ListItemIcon>
          </ListItem>
        </React.Fragment>
      )}
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
