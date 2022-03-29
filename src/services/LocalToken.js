import { localStorageTokenName } from "../configs/appConfigs";

export default class LocalToken {
  static save = (token) => {
    localStorage.setItem(localStorageTokenName, token);
  };

  static read = () => localStorage.getItem(localStorageTokenName);

  static remove = () => {
    localStorage.removeItem(localStorageTokenName);
  };
}
