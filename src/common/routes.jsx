import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { useSelector } from "react-redux";
import { MODULE_NAME as MODULE_AUTHOR } from "../modules/Author/constants/models";
import MainLayout from "./HOCS/MainLayout";
import MembersPage from "../pages/MembersPage";
import AnimatedSwitch from "./components/Routes/AnimatedSwitch";
const Routes = () => {
  const isSigned = useSelector((state) => state[MODULE_AUTHOR].isSigned);

  if (isSigned) {
    return (
      <MainLayout>
        <AnimatedSwitch>
          <Route exact path="/" component={() => <div>Analytics 1</div>} />
          <Route exact path="/members" component={MembersPage} />
        </AnimatedSwitch>
      </MainLayout>
    );
  }

  return (
    <Switch>
      <Route path="/" component={LoginPage} />
    </Switch>
  );
};

export default Routes;
