import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Navigator from "../components/Navigator";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Progress from "../components/widget/Progress/Progress";
import "../asserts/style.css";

const drawerWidth = 256;
const drawerMinWith = 85;

const transition = "all 250ms ease-in-out 0s";

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      transition: transition,
      flexShrink: 0,
    },
  },
  drawerCollapse: {
    [theme.breakpoints.up("sm")]: {
      width: drawerMinWith,
    },
  },
  app: {
    transition: transition,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    "& main": {
      flex: 1,
      padding: theme.spacing(6, 4),
      background: "#eaeff1",
    },
  },
  content: {
    height: "calc(100vh - 64px)",
    overflowX: "auto",
    "&::-webkit-scrollbar": {
      width: 8,
      "&:hover": {
        width: 16,
      },
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#aaa",
      borderRadius: 8,
    },
  },
  footer: {
    padding: theme.spacing(2),
    background: "#eaeff1",
  },
}));

const MainLayout = (props) => {
  const { children } = props;
  const { key: locationKey } = useLocation();
  const collapse = useSelector((state) => state.ui.navCollapse);
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { isLoading: loadingPage } = useSelector((state) => state.sessions);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Progress isAnimating={loadingPage} locationKey={locationKey} />
      <nav className={clsx(classes.drawer, collapse && classes.drawerCollapse)}>
        <Hidden smUp implementation="js">
          <Navigator
            PaperProps={{
              style: {
                width: drawerWidth,
                transition: transition,
              },
            }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        <Hidden xsDown implementation="css">
          <Navigator
            PaperProps={{
              style: {
                width: collapse ? drawerMinWith : drawerWidth,
                transition: transition,
              },
            }}
            collapse={collapse}
          />
        </Hidden>
      </nav>
      <div className={classes.app}>
        <Header onDrawerToggle={handleDrawerToggle} />
        <div id="content" className={classes.content}>
          <div
            style={{
              margin: 30,
              height: "calc(100% - 60px)",
              position: "relative",
            }}
          >
            {children}
          </div>
        </div>
        {/* <footer className={classes.footer}>
          <Copyright />
        </footer> */}
      </div>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
