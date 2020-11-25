import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { useSelector } from "react-redux";
import { MODULE_NAME as MODULE_AUTHOR } from "../modules/Author/constants/models";
import MainLayout from "./HOCS/MainLayout";
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

// Orders Pages
import OrdersPage from "../pages/Orders/OrdersPage";
import CreateOrder from "../modules/Orders/CreateOrder";
import OrderDetailsPage from "../pages/Orders/OrderDetailsPage";
import EditOrderPage from "../pages/Orders/EditOrderPage";

// Inventory Record Pages
import InventoryRecordFormsPage from "../pages/InventoryRecordForms/InventoryRecordFormsPage";
import CreateInventoryRecordFormPage from "../pages/InventoryRecordForms/CreateInventoryRecordFormPage";
import SingleInventoryRecordFormDetails from "../modules/InventoryRecordForms/SingleInventoryRecordFormDetails";
import EditInventoryRecordFormPage from "../pages/InventoryRecordForms/EditInventoryRecordFormPage";

// Goods Delivery Notes Pages
import GoodsDeliveryNoteDetailsPage from "../pages/GoodsDeliveryNotes/GoodsDeliveryNoteDetailsPage";
import ListGoodsDeliveryNotesPage from "../pages/GoodsDeliveryNotes/ListGoodsDeliveryNotesPage";
import EditGoodsDeliveryNotePage from "../pages/GoodsDeliveryNotes/EditGoodsDeliveryNotePage";
import AddGoodsDeliveryNotePage from "../pages/GoodsDeliveryNotes/AddGoodsDeliveryNotePage";

// Product Remove Pages
import ProductRemoveFormsPage from "../pages/ProductRemoveForms/ProductRemoveFormsPage";
import CreateProductRemoveFormPage from "../pages/ProductRemoveForms/CreateProductRemoveFormPage";
import SingleProductRemoveFormDetails from "../modules/ProductRemoveForms/SingleProductRemoveFormDetails";
import EditProductRemoveFormPage from "../pages/ProductRemoveForms/EditProductRemoveFormPage";
import ReportsPage from "../pages/Reports/ReportsPage";

// Statistics Pages
import StatisticsPage from "../pages/StatisticsPage";

// Users Pages
import UsersPage from "../pages/Users/UsersPage";

// Merchandise Return Proposal
import ListMerchandiseReturnProposalsPage from "../pages/MerchandiseReturnProposals/ListMerchandiseReturnProposalsPage";
import EditMerchandiseReturnProposalPage from "../pages/MerchandiseReturnProposals/EditMerchandiseReturnProposalPage";
import AddMerchandiseReturnProposalPage from "../pages/MerchandiseReturnProposals/AddMerchandiseReturnProposalPage";
import MerchandiseReturnProposalDetailsPage from "../pages/MerchandiseReturnProposals/MerchandiseReturnProposalDetailsPage";

// Goods Receiving Of Return
import GoodsReceivingOfReturnsPage from "../pages/GoodsReceivingOfReturns/GoodsReceivingOfReturnsPage";
import CreateGoodsReceivingOfReturnPage from "../pages/GoodsReceivingOfReturns/CreateGoodsReceivingOfReturnPage";
import EditGoodsReceivingOfReturnPage from "../pages/GoodsReceivingOfReturns/EditGoodsReceivingOfReturnPage";
import GoodsReceivingOfReturnDetailsPage from "../pages/GoodsReceivingOfReturns/GoodsReceivingOfReturnDetailsPage";
import CreateUserPage from "../pages/Users/CreateUserPage";

const Routes = () => {
  const USER_ROLE = ENUMS.USER_ROLE;
  const { isSigned, roleName } = useSelector((state) => state[MODULE_AUTHOR]);

  if (isSigned) {
    return (
      <MainLayout>
        <AnimatedSwitch>
          <Route exact path="/" component={StatisticsPage} />
          <AuthRoute
            exact
            path="/users"
            component={UsersPage}
            roleName={roleName}
            acceptRoles={[USER_ROLE.Admin, USER_ROLE.SuperAdmin]}
          />
          <AuthRoute
            exact
            path="/users/add"
            component={CreateUserPage}
            roleName={roleName}
            acceptRoles={[USER_ROLE.Admin, USER_ROLE.SuperAdmin]}
          />
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
            path="/goodsReceivingNotes"
            component={ListGoodsReceivingNotesPage}
          />
          <AuthRoute
            exact
            path="/goodsReceivingNotes/:purchaseProposalFormId/add"
            component={AddGoodsReceivingNotePage}
            roleName={roleName}
            acceptRoles={[
              USER_ROLE.WarehouseKeeper,
              USER_ROLE.WarehouseKeeperManager,
            ]}
          />
          <Route
            exact
            path="/goodsReceivingNotes/:goodsReceivingNotesId"
            component={GoodsReceivingNoteDetailsPage}
          />
          <AuthRoute
            exact
            path="/goodsReceivingNotes/:goodsReceivingNotesId/edit"
            component={EditGoodsReceivingNotePage}
            roleName={roleName}
            acceptRoles={[
              USER_ROLE.WarehouseKeeper,
              USER_ROLE.WarehouseKeeperManager,
            ]}
          />

          {/* Suppliers Page */}
          <Route exact path="/suppliers" component={SuppliersPage} />
          <AuthRoute
            exact
            path="/suppliers/add"
            component={CreateSupplierPage}
            roleName={roleName}
            acceptRoles={[USER_ROLE.Admin]}
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

          {/* Orders Pages */}
          <Route exact path="/orders" component={OrdersPage} />
          <AuthRoute
            exact
            path="/orders/add"
            component={CreateOrder}
            roleName={roleName}
            acceptRoles={[USER_ROLE.Sale, USER_ROLE.Boss]}
          />
          <Route exact path="/orders/:orderId" component={OrderDetailsPage} />
          <AuthRoute
            exact
            path="/orders/:orderId/edit"
            component={EditOrderPage}
            roleName={roleName}
            acceptRoles={[USER_ROLE.Sale, USER_ROLE.Boss]}
          />

          {/* Inventory Record Forms */}
          <Route
            exact
            path="/inventoryRecordForms"
            component={InventoryRecordFormsPage}
          />
          <AuthRoute
            exact
            path="/inventoryRecordForms/add"
            component={CreateInventoryRecordFormPage}
            roleName={roleName}
            acceptRoles={[
              USER_ROLE.WarehouseKeeper,
              USER_ROLE.WarehouseKeeperManager,
              USER_ROLE.Boss,
            ]}
          />
          <Route
            exact
            path="/inventoryRecordForms/:inventoryRecordFormId"
            component={SingleInventoryRecordFormDetails}
          />
          <AuthRoute
            exact
            path="/inventoryRecordForms/:inventoryRecordFormId/edit"
            component={EditInventoryRecordFormPage}
            roleName={roleName}
            acceptRoles={[
              USER_ROLE.WarehouseKeeper,
              USER_ROLE.WarehouseKeeperManager,
              USER_ROLE.Boss,
            ]}
          />

          {/* Goods Delivery Notes */}
          <Route
            exact
            path="/goodsDeliveryNotes"
            component={ListGoodsDeliveryNotesPage}
          />
          <AuthRoute
            exact
            path="/goodsDeliveryNotes/:orderId/add"
            component={AddGoodsDeliveryNotePage}
            roleName={roleName}
            acceptRoles={[
              USER_ROLE.WarehouseKeeper,
              USER_ROLE.WarehouseKeeperManager,
            ]}
          />
          <Route
            exact
            path="/goodsDeliveryNotes/:goodsDeliveryNoteId"
            component={GoodsDeliveryNoteDetailsPage}
          />
          <AuthRoute
            exact
            path="/goodsDeliveryNotes/:goodsDeliveryNoteId/edit"
            component={EditGoodsDeliveryNotePage}
            roleName={roleName}
            acceptRoles={[
              USER_ROLE.WarehouseKeeper,
              USER_ROLE.WarehouseKeeperManager,
            ]}
          />

          {/* Product Remove Forms */}
          <Route
            exact
            path="/productRemoveForms"
            component={ProductRemoveFormsPage}
          />
          <AuthRoute
            exact
            path="/productRemoveForms/add"
            component={CreateProductRemoveFormPage}
            roleName={roleName}
            acceptRoles={[
              USER_ROLE.WarehouseKeeper,
              USER_ROLE.WarehouseKeeperManager,
              USER_ROLE.Boss,
            ]}
          />
          <Route
            exact
            path="/productRemoveForms/:productRemoveFormId"
            component={SingleProductRemoveFormDetails}
          />
          <AuthRoute
            exact
            path="/productRemoveForms/:productRemoveFormId/edit"
            component={EditProductRemoveFormPage}
            roleName={roleName}
            acceptRoles={[
              USER_ROLE.WarehouseKeeper,
              USER_ROLE.WarehouseKeeperManager,
              USER_ROLE.Boss,
            ]}
          />

          {/* Merchandise Return Proposal Pages */}
          <Route
            exact
            path="/merchandiseReturnProposals"
            component={ListMerchandiseReturnProposalsPage}
          />
          <AuthRoute
            exact
            path="/merchandiseReturnProposals/:goodsDeliveryNoteId/add"
            component={AddMerchandiseReturnProposalPage}
            roleName={roleName}
            acceptRoles={[
              USER_ROLE.WarehouseKeeper,
              USER_ROLE.WarehouseKeeperManager,
            ]}
          />
          <Route
            exact
            path="/merchandiseReturnProposals/:merchandiseReturnProposalId"
            component={MerchandiseReturnProposalDetailsPage}
          />
          <AuthRoute
            exact
            path="/merchandiseReturnProposals/:merchandiseReturnProposalId/edit"
            component={EditMerchandiseReturnProposalPage}
            roleName={roleName}
            acceptRoles={[
              USER_ROLE.WarehouseKeeper,
              USER_ROLE.WarehouseKeeperManager,
            ]}
          />

          {/* Goods Receiving Of Return */}
          <Route
            exact
            path="/goodsReceivingOfReturns"
            component={GoodsReceivingOfReturnsPage}
          />
          <AuthRoute
            exact
            path="/goodsReceivingOfReturns/:merchandiseReturnProposalId/add"
            component={CreateGoodsReceivingOfReturnPage}
            roleName={roleName}
            acceptRoles={[
              USER_ROLE.WarehouseKeeper,
              USER_ROLE.WarehouseKeeperManager,
              USER_ROLE.Boss,
            ]}
          />
          <Route
            exact
            path="/goodsReceivingOfReturns/:goodsReceivingOfReturnId"
            component={GoodsReceivingOfReturnDetailsPage}
          />
          <AuthRoute
            exact
            path="/goodsReceivingOfReturns/:goodsReceivingOfReturnId/edit"
            component={EditGoodsReceivingOfReturnPage}
            roleName={roleName}
            acceptRoles={[
              USER_ROLE.WarehouseKeeper,
              USER_ROLE.WarehouseKeeperManager,
              USER_ROLE.Boss,
            ]}
          />

          {/* Reports Pages */}
          <Route path="/reports" component={ReportsPage} />

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
