import api from "./http";

export default class UserService {
  static async getUsers() {
    return api.get("/users");
  }

  static async deleteUser(userId) {
    return api.delete(`/delete/${userId}`);
  }
}
