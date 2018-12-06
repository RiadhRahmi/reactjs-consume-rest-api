import {ApiClient} from "./client";


let apiClient = new ApiClient();

export default {


  post(user) {
    return apiClient.post('users', user);
  },
  update(id, user) {
    return apiClient.update('users/' + id + '/update', user);
  },
  get() {
    return apiClient.get('users');
  },
  deleteUsers(users_id) {
    return apiClient.post('users/delete', users_id);
  },
  uniqueEmail(email) {
    return apiClient.post('users/unique-email', email);

  }

}
