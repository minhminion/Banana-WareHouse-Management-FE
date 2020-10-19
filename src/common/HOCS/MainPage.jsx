import React, { Fragment, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "../routes";
import { ThemeProvider, CssBaseline, makeStyles } from "@material-ui/core";
import theme from "./globalTheme";
import LoadingPage from "../components/widget/LoadingPage/LoadingPage";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#fffff",
  },
}));

const MainPage = () => {
  const classes = useStyles();
  const sessionLoading = useSelector((state) => state.sessions.sessionLoading);

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <LoadingPage isAnimating={sessionLoading} />
        <div className={classes.root}>
          <CssBaseline />
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </Fragment>
  );
};

export default MainPage;
