import axios from "axios";
import {
  fetchEnd,
  fetchStart,
  fetchSuccess,
  fetchFailure,
  loadStart,
  loadEnd,
} from "./redux/actions/session";

import { MODULE_NAME as MODULE_AUTH } from "../modules/Author/constants/models";
import storeAccessible from "./utils/storeAccessible";
import { TIMEOUT } from "./config";
// import dayjs from "dayjs";

export async function loading(fetchingProcess, done = undefined) {
  storeAccessible.dispatch(loadStart({ config: { key: "loading" } }));
  try {
    const ret = await fetchingProcess();
    storeAccessible.dispatch(loadEnd({ config: { key: "loading" } }));
    if (done) {
      await done();
    }
    return ret;
  } catch (error) {
    storeAccessible.dispatch(loadEnd({ config: { key: "loading" } }));
    console.error("ERROR", error);
    throw error;
  }
}

export async function loadingProcess(fetchingProcess, done = undefined) {
  storeAccessible.dispatch(fetchStart({ config: { key: "loading" } }));
  try {
    const ret = await fetchingProcess();
    storeAccessible.dispatch(fetchEnd({ config: { key: "loading" } }));
    if (done) {
      await done();
    }
    return ret;
  } catch (error) {
    storeAccessible.dispatch(fetchEnd({ config: { key: "loading" } }));
    console.error("ERROR", error);
    throw error;
  }
}

export async function fetch({ url, headers, ...options }) {
  return axios({
    method: "GET",
    timeout: TIMEOUT,
    url,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...options,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

export async function fetchLoading({ url, module, headers, ...options }) {
  storeAccessible.dispatch(fetchStart({ config: { key: module || url } }));
  return axios({
    method: "get",
    timeout: TIMEOUT,
    url,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...options,
  })
    .then((response) => {
      storeAccessible.dispatch(
        fetchSuccess({ config: { key: module || url } })
      );
      return response;
    })
    .catch((err) => {
      storeAccessible.dispatch(
        fetchFailure({ config: { key: module || url } })
      );
      throw err;
    });
}

export function fetchAuth({ url, headers, ...options }) {
  const user = storeAccessible.getState(MODULE_AUTH);
  if (!user || !user.token) {
    throw new Error("MISSING_USER_TOKEN");
  }
  return axios({
    method: "GET",
    timeout: TIMEOUT,
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
      ...headers,
    },
    ...options,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

// export async function fetchAuthLoading({ url, headers, ...options }) {
//   try {
//     const user = storeAccessible.getState(MODULE_USER);
//     if (!user || !user.token) {
//       throw new Error("MISSING_USER_TOKEN");
//     }

//     storeAccessible.dispatch(fetchStart({ config: { key: url } }));

//     const { exp } = user;
//     let token = user.token;

//     if (dayjs.utc().unix() >= exp) {
//       const result = await axios({
//         method: "post",
//         timeout: TIMEOUT,
//         url: ENDPOINTS.refreshToken,
//         data: {
//           token,
//         },
//       });
//       const { user: newUser, exp: newExp, token: newToken } = result.data;

//       token = newToken;
//     }

//     const response = await axios({
//       method: "get",
//       timeout: TIMEOUT,
//       url,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//         ...headers,
//       },
//       ...options,
//     });
//     storeAccessible.dispatch(fetchSuccess({ config: { key: url } }));
//     return response;
//   } catch (error) {
//     storeAccessible.dispatch(fetchFailure({ config: { key: url } }));
//     throw error;
//   }
// }
