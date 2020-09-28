import React from "react";
import { Provider } from "react-redux";
import MainPage from "./MainPage";
import { SnackbarProvider } from "notistack";

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
        <MainPage />
      </SnackbarProvider>
    </Provider>
  );
};

export default Root;
