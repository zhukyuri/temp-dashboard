import axios from "axios";
import LocalToken from "../LocalToken";
import { store } from "../../index";
import { AppRoutes } from "../router/routes";
import { AuthStatus } from "../store/Store";

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${LocalToken.read()}`;

  return config;
});

api.interceptors.response.use((config) => {
  console.log("REFRESH", 0);
  return config;
}, async (error) => {
  const originalRequest = error.config;
  console.log("REFRESH", 1, error.config._isRetry);
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    console.log("REFRESH", 2);
    originalRequest._isRetry = true;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/refresh`,
        { withCredentials: true });
      console.log("REFRESH", response);
      if (!response) { // TODO
        store.setAuthStatus(AuthStatus.LoginForm, AppRoutes.signIn);
      }
      LocalToken.save(response.data.token);
      return api.request(originalRequest);
    } catch (e) {
      console.log("Not Authorized");
      store.setAuthStatus(AuthStatus.LoginForm, AppRoutes.signIn); // TODO
    }
  }
  throw error;
})
;

export default api;
