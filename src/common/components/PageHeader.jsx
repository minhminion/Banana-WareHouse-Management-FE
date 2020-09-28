import React from "react";
import clsx from "clsx";
import {
  Button,
  Grid,
  Tooltip,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Tabs,
  Tab,
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import { useHistory, useLocation } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  root: {
    zIndex: 0,
  },
  noTabPane: {
    paddingBottom: theme.spacing(2),
  },
  button: {
    borderColor: "rgba(255, 255, 255, 0.7)",
  },
}));
const PageHeader = ({ title, tabPanes }) => {
  const classes = useStyle();
  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname.split("/");

  const handleChangeTabs = (e, newValue) => {
    console.log("======== Bao Minh: handleChangeTabs -> newValue", newValue);
    history.push(`/${pathName[1] || "todo-list"}/${newValue}`);
  };

  return (
    <>
      <AppBar
        component="div"
        className={clsx(classes.root, !tabPanes && classes.noTabPane)}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                variant="outlined"
                color="inherit"
                size="small"
              >
                Web setup
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {tabPanes ? (
        <AppBar
          component="div"
          className={classes.root}
          color="primary"
          position="static"
          elevation={0}
        >
          <Tabs
            value={pathName[2] || tabPanes[0].id}
            textColor="inherit"
            onChange={handleChangeTabs}
          >
            {tabPanes.map((item) => (
              <Tab
                key={item.id}
                value={item.id}
                textColor="inherit"
                label={item.title}
              />
            ))}
          </Tabs>
        </AppBar>
      ) : null}
    </>
  );
};

export default PageHeader;
