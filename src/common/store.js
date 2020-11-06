import { createStore, compose, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import { getCookie } from "./utils/cookie";
import { persistCombineReducers, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import uiReducer from "./redux/reducers/uiReducer";
import { rootReducer, rootModules } from "../modules";
import session from "./redux/reducers/session";
import jwt_decode from "jwt-decode";

const config = {
  key: "shopping",
  storage,
  blacklist: ["sessions", ...rootModules],
};
const createMiddlewares = (thunk) => {
  const middlewares = [];

  if (thunk) {
    middlewares.push(thunk);
  }

  return applyMiddleware.apply({}, middlewares);
};

function mapCookieToStorage() {
  let initialState;
  try {
    const user = JSON.parse(getCookie("user"));
    const token = getCookie("token");
    initialState = {
      auth: {
        info: user,
        exp: getCookie("exp"),
        token: token,
        roleName: jwt_decode(token)?.role,
        refreshToken: getCookie("refreshToken"),
        isSigned: user && true,
      },
    };
  } catch (err) {
    initialState = undefined;
  }
  return initialState;
}

const createReducers = (reducers) => {
  return persistCombineReducers(config, {
    ui: uiReducer,
    sessions: session,
    ...rootReducer,
  });
};
const composeEnhancers =
  process.env.NODE_ENV !== "production"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const buildStore = (reducers) => {
  const initialState = mapCookieToStorage();
  const store = createStore(
    createReducers(reducers),
    initialState,
    composeEnhancers(createMiddlewares(thunk))
  );

  const persistor = persistStore(store);
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(createReducers(reducers));
    });
  }

  store.reducers = createReducers(reducers);
  return { persistor, store };
};

export default buildStore();
