import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { useSelector } from "react-redux";
import { MODULE_NAME as MODULE_AUTHOR } from "../modules/Author/constants/models";
import MainLayout from "./HOCS/MainLayout";
import MembersPage from "../pages/MembersPage";
import AnimatedSwitch from "./components/Routes/AnimatedSwitch";
import ListProductPage from "../pages/ListProductPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ListProposalPage from "../pages/PurchaseProposalPage";
import AddProductPage from "../pages/AddProductPage";
import AuthRoute from "./components/Routes/AuthRoute";
import { ENUMS } from "./constants/index";
import EditProductPage from "../pages/EditProductPage";

const Routes = () => {
  const USER_ROLE = ENUMS.USER_ROLE;
  const { isSigned, roleName } = useSelector((state) => state[MODULE_AUTHOR]);

  if (isSigned) {
    return (
      <MainLayout>
        <AnimatedSwitch>
          <Route exact path="/" component={() => <div>Analytics 1</div>} />
          <Route exact path="/members" component={MembersPage} />
          <Route exact path="/products" component={ListProductPage} />
          <AuthRoute
            exact
            path="/products/add"
            component={AddProductPage}
            roleName={roleName}
            acceptRoles={[USER_ROLE.Admin]}
          />
          <AuthRoute
            exact
            path="/products/:productSKU/edit"
            component={EditProductPage}
            roleName={roleName}
            acceptRoles={[USER_ROLE.Admin]}
          />
          <Route
            exact
            path="/products/:productSKU"
            component={ProductDetailsPage}
          />
          <Route exact path="/proposal" component={ListProposalPage} />
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
