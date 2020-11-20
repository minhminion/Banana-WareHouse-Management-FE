import { MODULE_NAME as MODULE_AUTH } from "./Author/constants/models";
import authorReducer from "./Author/constants/reducer";

import { MODULE_NAME as MODULE_MEMBER } from "./Member/constants/models";
import memberReducer from "./Member/constants/reducer";

import { MODULE_NAME as MODULE_PRODUCT } from "./Products/constants/models";
import productReducer from "./Products/constants/reducer";

import { MODULE_NAME as MODULE_PROPOSAL } from "./Proposal/constants/models";
import proposalReducer from "./Proposal/constants/reducer";

import { MODULE_NAME as MODULE_GOODS_RECEIVING_NOTES } from "./GoodsReceivingNotes/constants/models";
import goodsReceivingNotesReducer from "./GoodsReceivingNotes/constants/reducer";

import { MODULE_NAME as MODULE_SUPPLIERS } from "./Suppliers/constants/models";
import suppliersReducer from "./Suppliers/constants/reducer";

import { MODULE_NAME as MODULE_ORDERS } from "./Orders/constants/models";
import ordersReducer from "./Orders/constants/reducer";

import { MODULE_NAME as MODULE_INVENTORY_RECORD_FORMS } from "./InventoryRecordForms/constants/models";
import inventoryRecordFormsReducer from "./InventoryRecordForms/constants/reducer";

import { MODULE_NAME as MODULE_GOODS_DELIVERY_NOTES } from "./GoodsDeliveryNotes/constants/models";
import goodsDeliveryNotesReducer from "./GoodsDeliveryNotes/constants/reducer";

import { MODULE_NAME as MODULE_PRODUCT_REMOVE_FORMS } from "./ProductRemoveForms/constants/models";
import productRemoveFormsReducer from "./ProductRemoveForms/constants/reducer";

export const rootReducer = {
  [MODULE_AUTH]: authorReducer,
  [MODULE_MEMBER]: memberReducer,
  [MODULE_PROPOSAL]: proposalReducer,
  [MODULE_PRODUCT]: productReducer,
  [MODULE_GOODS_RECEIVING_NOTES]: goodsReceivingNotesReducer,
  [MODULE_SUPPLIERS]: suppliersReducer,
  [MODULE_ORDERS]: ordersReducer,
  [MODULE_INVENTORY_RECORD_FORMS]: inventoryRecordFormsReducer,
  [MODULE_GOODS_DELIVERY_NOTES]: goodsDeliveryNotesReducer,
  [MODULE_PRODUCT_REMOVE_FORMS]: productRemoveFormsReducer,
};

export const rootModules = [
  MODULE_AUTH,
  MODULE_MEMBER,
  MODULE_PROPOSAL,
  MODULE_PRODUCT,
  MODULE_GOODS_RECEIVING_NOTES,
  MODULE_SUPPLIERS,
  MODULE_ORDERS,
  MODULE_INVENTORY_RECORD_FORMS,
  MODULE_GOODS_DELIVERY_NOTES,
  MODULE_PRODUCT_REMOVE_FORMS,
];
