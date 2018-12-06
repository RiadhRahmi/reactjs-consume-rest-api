import {ApiClient} from "./client";


let apiClient = new ApiClient();

export class AuthService {


  static login(data) {
    return apiClient.post('login', data);
  }

  static register(data) {
    return apiClient.post('register', data);
  }

  static logout() {
    return apiClient.get('logout');
  }


  isLoggedIn() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      return true;
    } else {
      return false;
    }
  }

  isRole(role) {
    const roles = ['admin', 'editor'];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (roles[currentUser.role] === role) {
      return true;
    }
    return false;
  }


}
