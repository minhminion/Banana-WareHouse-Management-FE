import React from "react";
import { Provider } from "react-redux";
import MainPage from "./MainPage";
import { SnackbarProvider } from "notistack";
import { CircularProgress } from "@material-ui/core";
import ConfirmProvider from "../hooks/useConfirm/ConfirmProvider";

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <ConfirmProvider>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          maxSnack={3}
          autoHideDuration={1500}
          iconVariant={{
            info: <CircularProgress size={20} style={{ marginRight: 8 }} />,
          }}
        >
          <MainPage />
        </SnackbarProvider>
      </ConfirmProvider>
    </Provider>
  );
};

export default Root;
