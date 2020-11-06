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

export const rootReducer = {
  [MODULE_AUTH]: authorReducer,
  [MODULE_MEMBER]: memberReducer,
  [MODULE_PROPOSAL]: proposalReducer,
  [MODULE_PRODUCT]: productReducer,
  [MODULE_GOODS_RECEIVING_NOTES]: goodsReceivingNotesReducer,
};

export const rootModules = [
  MODULE_AUTH,
  MODULE_MEMBER,
  MODULE_PROPOSAL,
  MODULE_PRODUCT,
  MODULE_GOODS_RECEIVING_NOTES,
];
