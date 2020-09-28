import * as actions from "../actions/uiActions";
import { handleActions } from "redux-actions";

const defaultState = {
  navCollapse: false,
  darkMode: false,
  notifications: [
    {
      id: 1,
      title: "New message",
      body: "Hello world",
      createdAt: Date().toISOString,
    },
    {
      id: 2,
      title: "New message",
      body: "Hello world",
      createdAt: Date().toISOString,
    },
    {
      id: 3,
      title: "New message",
      body: "Hello world",
      createdAt: Date().toISOString,
    },
    {
      id: 4,
      title: "New message",
      body: "Hello world",
      createdAt: Date().toISOString,
    },
  ],
};

const handler = {
  [actions.clearAll]: (state, action) => ({
    ...defaultState,
  }),
  [actions.toggleCollapseNavigator]: (state, action) => ({
    ...state,
    navCollapse: !state.navCollapse,
  }),
  [actions.toggleDarkTheme]: (state, action) => ({
    ...state,
    darkMode: !state.darkMode,
  }),
  [actions.addNotification]: (state, action) => ({
    ...state,
    notifications: [
      ...state.notifications,
      {
        id: action.payload.tag,
        title: action.payload.title,
        body: action.payload.body,
        createdAt: Date().toISOString,
      },
    ],
  }),
};

export default handleActions(handler, defaultState);
