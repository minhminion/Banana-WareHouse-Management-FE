import React, { Fragment, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "../routes";
import { ThemeProvider, CssBaseline, makeStyles } from "@material-ui/core";
import theme from "./globalTheme";
import LoadingPage from "../components/widget/LoadingPage/LoadingPage";
import { useSelector } from "react-redux";
// Date Picker
import DayJsUtils from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import locale from "dayjs/locale/vi";

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
        <MuiPickersUtilsProvider utils={DayJsUtils} locale={locale}>
          <LoadingPage isAnimating={sessionLoading} />
          <div className={classes.root}>
            <CssBaseline />
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </div>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Fragment>
  );
};

export default MainPage;
