import axios from 'axios';
import config from '../utils/config'
class AuthService {
  login(user) {
    return axios
      .post(config.API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
  }
  register(user) {
    return axios.post(config.API_URL + 'register', user).then(response => {
      if (response.data.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
  }
}
export default new AuthService();