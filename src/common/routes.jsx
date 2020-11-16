import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { useSelector } from "react-redux";
import { MODULE_NAME as MODULE_AUTHOR } from "../modules/Author/constants/models";
import MainLayout from "./HOCS/MainLayout";
import MembersPage from "../pages/MembersPage";
import AnimatedSwitch from "./components/Routes/AnimatedSwitch";
import AuthRoute from "./components/Routes/AuthRoute";
import { ENUMS } from "./constants/index";
// Product Pages
import ListProductPage from "../pages/Products/ListProductPage";
import ProductDetailsPage from "../pages/Products/ProductDetailsPage";
import AddProductPage from "../pages/Products/AddProductPage";
import EditProductPage from "../pages/Products/EditProductPage";

// Proposal Pages
import ListProposalPage from "../pages/Proposals/PurchaseProposalPage";
import CreateProposal from "../modules/Proposal/CreateProposal";
import ProposalDetailsPage from "../pages/Proposals/ProposalDetailsPage";
import EditProposalPage from "../pages/Proposals/EditProposalPage";
import NotFoundPage from "../pages/NotFoundPage";

// Goods Receiving Notes Pages
import ListGoodsReceivingNotesPage from "../pages/GoodsReceivingNotes/ListGoodsReceivingNotesPage";
import AddGoodsReceivingNotePage from "../pages/GoodsReceivingNotes/AddGoodsReceivingNotePage";
import GoodsReceivingNoteDetailsPage from "../pages/GoodsReceivingNotes/GoodsReceivingNoteDetailsPage";
import EditGoodsReceivingNotePage from "../pages/GoodsReceivingNotes/EditGoodsReceivingNotePage";

// Suppliers Pages
import SuppliersPage from "../pages/Suppliers/SuppliersPage";
import CreateSupplierPage from "../pages/Suppliers/CreateSupplierPage";
import SupplierDetailsPage from "../pages/Suppliers/SupplierDetailsPage";
import EditSupplierPage from "../pages/Suppliers/EditSupplierPage";

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
            acceptRoles={[USER_ROLE.Sale]}
          />
          <Route
            exact
            path="/proposal/:purchaseProposalFormId"
            component={ProposalDetailsPage}
          />
          <AuthRoute
            exact
            path="/proposal/:purchaseProposalFormId/edit"
            component={EditProposalPage}
            roleName={roleName}
            acceptRoles={[USER_ROLE.Sale]}
          />

          {/* Goods Receiving Notes */}
          <Route
            exact
            path="/goods-receiving-notes"
            component={ListGoodsReceivingNotesPage}
          />
          <AuthRoute
            exact
            path="/goods-receiving-notes/:purchaseProposalFormId/add/"
            component={AddGoodsReceivingNotePage}
            roleName={roleName}
            acceptRoles={[USER_ROLE.WarehouseKeeper, USER_ROLE.WarehouseKeeperManager]}
          />
          <Route
            exact
            path="/goods-receiving-notes/:goodsReceivingNotesId"
            component={GoodsReceivingNoteDetailsPage}
          />
          <AuthRoute
            exact
            path="/goods-receiving-notes/:goodsReceivingNotesId/edit"
            component={EditGoodsReceivingNotePage}
            roleName={roleName}
            acceptRoles={[USER_ROLE.WarehouseKeeper, USER_ROLE.WarehouseKeeperManager]}
          />

          {/* Suppliers Page */}
          <Route
            exact
            path="/suppliers"
            component={SuppliersPage}
          />
          <AuthRoute
            exact
            path="/suppliers/add"
            component={CreateSupplierPage}
            roleName={roleName}
            acceptRoles={[USER_ROLE.Admin, USER_ROLE.Boss]}
          />
           <Route
            exact
            path="/suppliers/:supplierId"
            component={SupplierDetailsPage}
          />
          <AuthRoute
            exact
            path="/suppliers/:supplierId/edit"
            component={EditSupplierPage}
            roleName={roleName}
            acceptRoles={[USER_ROLE.Admin, USER_ROLE.Boss]}
          />

          {/* 404 Not Found */}
          <Route exact path="*" component={NotFoundPage} />
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
