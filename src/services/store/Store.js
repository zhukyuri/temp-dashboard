import axios from "axios";
import { makeAutoObservable } from "mobx";
import AuthService from "../AuthService";
import UserService from "../UserService";
import LocalToken from "../LocalToken";
import { AppRoutes } from "../router/routes";

export class AuthStatus {
  static Authorized = "AUTHORIZED";
  static LoginForm = "LOGIN_FORM";
  static RegistrationForm = "REGISTRATION_FORM";
}

export default class Store {
  user = {};
  authStatus = { status: AuthStatus.LoginForm, redirect: null };
  redirect = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuthStatus = (status = AuthStatus.LoginForm, redirect = null) => {
    this.authStatus = { status, redirect };
  };

  setUser = (user) => {
    this.user = user;
  };

  setLoading = (bool) => {
    this.isLoading = bool;
  };

  login = async (email, password, remember) => {
    console.log(">>>>>", email, password, remember);
    try {
      const response = await AuthService.login(email, password, remember);
      //  TODO implementation logic <if error login>
      LocalToken.save(response.data.token);
      this.setAuthStatus(AuthStatus.Authorized);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(">>> Error login:", e.response?.data?.message);
    }
  };

  registration = async (email, password, username) => {
    try {
      const response = await AuthService.registration(email, password, username);
      LocalToken.save(response.data.token);
      this.setAuthStatus(AuthStatus.Authorized);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(">>> Error login:", e.response?.data?.message);
    }
  };

  logout = async () => {
    try {
      // eslint-disable-next-line
      const response_ = AuthService.logout();
      // TODO check errors
      LocalToken.remove();
      this.setAuthStatus(AuthStatus.LoginForm);
      this.setUser({});
    } catch (e) {
      console.log(">>> Error logout:", e.response?.data?.message);
    }
  };

  checkAuth = async () => {
    this.setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/refresh`,
        { withCredentials: true }
      );
      //  TODO implementation logic <if error refresh>
      LocalToken.save(response.data.token);
      this.setAuthStatus(AuthStatus.Authorized);
      this.setUser(response.data.user);
    } catch (e) {
      this.setAuthStatus(AuthStatus.LoginForm, AppRoutes.signIn);
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  };

  removeUser = async () => {
    try {
      // eslint-disable-next-line
      const response_ = await UserService.deleteUser(this.user.id);
      // TODO check errors
      LocalToken.remove();
    } catch (e) {
      console.log(e);
    }
    this.setAuthStatus(AuthStatus.RegistrationForm);
    this.setUser({});
  };
}
