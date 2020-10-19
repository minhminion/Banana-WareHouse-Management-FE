import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import {
  Paper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Popper,
  Drawer,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  InputBase,
  DialogActions,
} from "@material-ui/core";
import NotificationCard from "./NotificationCard";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { clearAll } from "../redux/actions/uiActions";

const lightColor = "rgba(255, 255, 255, 0.7)";

const useStyles = makeStyles((theme) => ({
  header: {
    height: 64,
    justifyContent: "center",
    boxShadow: theme.boxShadows.main,
  },
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 0,
    marginRight: theme.spacing(1),
    "& .MuiAvatar-root": {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
  userInformation: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "& div:first-child": {
      position: "relative",
      marginBottom: theme.spacing(1),
    },
  },
  userAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginBottom: theme.spacing(1),
  },
  changeImageContainer: {
    background: "#fff",
    bottom: 0,
    position: "absolute",
    right: 0,
    borderRadius: "50%",
    overflow: "visible",
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
  changeImageButton: {
    height: 26,
    width: 26,
    boxShadow:
      "0 1px 1px 0 rgba(65,69,73,0.3), 0 1px 3px 1px rgba(65,69,73,0.15)",
    margin: 4,
    "& .MuiSvgIcon-root": {
      fontSize: 18,
    },
  },
  drawerContent: {
    overflowY: "auto",
    overflowX: "hidden",
    height: "90vh",
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
  iconButton: {
    padding: theme.spacing(1.5),
    margin: theme.spacing(1),
  },
}));

const anchorOrigin = {
  vertical: "top",
  horizontal: "center",
};

const Header = (props) => {
  const { onDrawerToggle } = props;
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);
  const [openChangeProfile, setOpenChangeProfile] = useState(false);
  const [changeProfileError, setChangeProfileError] = useState(false);

  const { enqueueSnackbar: uploadSnack, closeSnackbar } = useSnackbar();
  const classes = useStyles();

  const { info: userInfo, isEmpty: userEmpty } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const notifications = useSelector((state) => state.ui.notifications);

  const handleToggleNotify = () => {
    setOpenNotify((prev) => !prev);
  };

  const handleChangeImage = () => {
    const body = document.getElementById("input-user-img");
    if (body) {
      body.click();
    }
  };

  const handleSubmitUserImage = async (e) => {
    const file = e.target.files[0];
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      uploadSnack("Wrong file submitted", { variant: "error", anchorOrigin });
      return;
    }
    uploadSnack("Uploading...", {
      key: 1,
      variant: "default",
      persist: true,
      anchorOrigin,
    });
    const result = "Upload";
    closeSnackbar(1);
    if (result.error) {
      uploadSnack(result.error, { variant: "error", anchorOrigin });
    } else {
      uploadSnack("Upload success", {
        variant: "success",
        anchorOrigin,
      });
    }
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(false);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleOpenChangeProfile = () => {
    setOpenChangeProfile(true);
  };
  const handleCloseChangeProfile = () => {
    setOpenChangeProfile(false);
  };

  const handleChangeProfile = async (e) => {
    e.preventDefault();
    const input = document.getElementById("user-display-name");

    // Validate input have value
    if (!input || input.value.trim().length === 0) {
      setChangeProfileError("Display name must not be empty");
      return;
    }

    handleCloseChangeProfile();
    uploadSnack("Changing...", {
      key: 2,
      variant: "default",
      persist: true,
      anchorOrigin,
    });
    const result = "Upload";
    closeSnackbar(2);
    if (result.error) {
      uploadSnack(result.error, { variant: "error", anchorOrigin });
    } else {
      uploadSnack("Upload success", {
        variant: "success",
        anchorOrigin,
      });
    }
    setChangeProfileError(null);
  };

  return (
    <React.Fragment>
      <input
        id="input-user-img"
        type="file"
        accept="image/*"
        hidden
        onChange={handleSubmitUserImage}
      />
      <Dialog
        open={openChangeProfile}
        onClose={handleCloseChangeProfile}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle id="responsive-dialog-title">
          {"Change user display name"}
        </DialogTitle>
        <DialogContent>
          {changeProfileError && (
            <Alert severity="error" style={{ marginBottom: 8 }}>
              {changeProfileError}
            </Alert>
          )}
          <Paper
            onSubmit={handleChangeProfile}
            component="form"
            style={{
              display: "flex",
              alignItems: "center",
              padding: 8,
            }}
          >
            <InputBase
              style={{
                flex: "1 1 auto",
              }}
              placeholder="User display name ..."
              defaultValue={
                userInfo
                  ? `${userInfo.lastName} ${userInfo.firstName}`
                  : "No name"
              }
              inputProps={{
                id: "user-display-name",
              }}
            />
            <IconButton
              type="submit"
              className={classes.searchButton}
              aria-label="search"
            >
              <CheckCircleIcon />
            </IconButton>
          </Paper>
        </DialogContent>
        <DialogActions />
      </Dialog>
      <AppBar
        className={classes.header}
        color="inherit"
        position="sticky"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <Link className={classes.link} href="#" variant="body2">
                Go to docs
              </Link>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton
                  color="inherit"
                  onClick={handleToggleNotify}
                  className={classes.iconButton}
                >
                  <Badge
                    invisible={
                      notifications && notifications.length > 0 ? false : true
                    }
                    variant="dot"
                    color="secondary"
                  >
                    <NotificationsIcon color="disabled" />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <div
                ref={anchorRef}
                color="inherit"
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <IconButton className={classes.iconButtonAvatar}>
                  <Avatar
                    src={userInfo && userInfo.photoURL}
                    alt={
                      userInfo &&
                      (`${userInfo.lastName} ${userInfo.firstName}` ||
                        "My Avatar")
                    }
                  />
                </IconButton>
              </div>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                placement="bottom-end"
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: "center top",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        {userInfo && !userEmpty ? (
                          <div style={{ width: 354 }}>
                            <div className={classes.userInformation}>
                              <div>
                                <Avatar
                                  className={classes.userAvatar}
                                  src={userInfo && userInfo.photoURL}
                                  alt={
                                    userInfo &&
                                    (`${userInfo.lastName} ${userInfo.firstName}` ||
                                      "My Avatar")
                                  }
                                />
                                <div className={classes.changeImageContainer}>
                                  <IconButton
                                    onClick={handleChangeImage}
                                    className={classes.changeImageButton}
                                  >
                                    <CameraAltOutlinedIcon />
                                  </IconButton>
                                </div>
                              </div>
                              <Typography variant="h6">
                                {userInfo &&
                                  (`${userInfo.lastName} ${userInfo.firstName}` ||
                                    "No name")}
                              </Typography>
                              <Typography variant="subtitle1">
                                {userInfo &&
                                  (userInfo.email ||
                                    "minhminionadmin@gmail.com")}
                              </Typography>
                            </div>
                            <MenuList
                              autoFocusItem={open}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem onClick={handleOpenChangeProfile}>
                                Change display name
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                My account
                              </MenuItem>
                              <MenuItem onClick={() => dispatch(clearAll())}>
                                Logout
                              </MenuItem>
                            </MenuList>
                          </div>
                        ) : (
                          <MenuList
                            autoFocusItem={open}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}
                          >
                            <Link
                              component={RouterLink}
                              to="/login"
                              underline="none"
                              color="inherit"
                            >
                              <MenuItem>Login</MenuItem>
                            </Link>
                            <Link
                              component={RouterLink}
                              to="/sign-up"
                              underline="none"
                              color="inherit"
                            >
                              <MenuItem>Sign Up</MenuItem>
                            </Link>
                          </MenuList>
                        )}
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        key="notifications"
        anchor="right"
        variant="temporary"
        open={openNotify}
        onClose={handleToggleNotify}
        PaperProps={{
          style: { background: "#ffff" },
        }}
      >
        <div
          style={{
            width: 384,
            height: "100vh",
          }}
        >
          {" "}
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                Notifications
              </Typography>
              <IconButton color="inherit" onClick={handleToggleNotify}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.drawerContent}>
            {notifications && notifications.length ? (
              notifications.map((notification) => (
                <NotificationCard key={notification.id} {...notification} />
              ))
            ) : (
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "100%",
                  alignItems: "center",
                }}
                variants="h4"
              >
                No new notifications
              </Typography>
            )}
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
