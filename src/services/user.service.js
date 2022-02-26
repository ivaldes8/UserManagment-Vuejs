import axios from 'axios';
import authHeader from './auth-header';
import config from '../utils/config'

class UserService {
  getProfile() {
    return axios.get(config.API_URL + 'currentUser', { headers: authHeader() });
  }
  getUser(id) {
    return axios.get(config.API_URL + `users/${id}`, { headers: authHeader() });
  }
  getUsers() {
    return axios.get(config.API_URL + 'users', { headers: authHeader() });
  }
  updateUser(id, data) {
    return axios.put(config.API_URL + `users/${id}`, data, { headers: authHeader() });
  }
  deleteUser(id) {
    return axios.delete(config.API_URL + `users/${id}`, { headers: authHeader() });
  }
}
export default new UserService();