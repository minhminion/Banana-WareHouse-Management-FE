import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { useSelector } from "react-redux";
import { MODULE_NAME as MODULE_AUTHOR } from "../modules/Author/constants/models";
import MainLayout from "./HOCS/MainLayout";
import MembersPage from "../pages/MembersPage";
import AnimatedSwitch from "./components/Routes/AnimatedSwitch";
// Product Pages
import ListProductPage from "../pages/Products/ListProductPage";
import ProductDetailsPage from "../pages/Products/ProductDetailsPage";
import AddProductPage from "../pages/Products/AddProductPage";
import EditProductPage from "../pages/Products/EditProductPage";

// Proposal Pages
import ListProposalPage from "../pages/Proposals/PurchaseProposalPage";

import AuthRoute from "./components/Routes/AuthRoute";
import { ENUMS } from "./constants/index";
import CreateProposal from "../modules/Proposal/CreateProposal";

const Routes = () => {
  const USER_ROLE = ENUMS.USER_ROLE;
  const { isSigned, roleName } = useSelector((state) => state[MODULE_AUTHOR]);

  if (isSigned) {
    return (
      <MainLayout>
        <AnimatedSwitch>
          <Route exact path="/" component={() => <div>Analytics 1</div>} />
          <Route exact path="/members" component={MembersPage} />
          {/* Product Pages */}
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
          <AuthRoute
            exact
            path="/products/:productSKU/edit"
            component={EditProductPage}
            roleName={roleName}
            acceptRoles={[USER_ROLE.Admin]}
          />

          {/* Proposal Pages */}
          <Route exact path="/proposal" component={ListProposalPage} />
          <AuthRoute
            exact
            path="/proposal/add"
            component={CreateProposal}
            roleName={roleName}
            acceptRoles={[USER_ROLE.Admin]}
          />
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
