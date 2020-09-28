import { createAction } from "redux-actions";

export const clearAll = createAction("UI_CLEAR_ALL")
export const toggleCollapseNavigator = createAction("TOGGLE_COLLAPSE_NAV")
export const toggleDarkTheme = createAction("TOGGLE_DARK_THEME")
export const addNotification = createAction("ADD_NOTIFICATION")