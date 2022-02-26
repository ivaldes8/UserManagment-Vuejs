import axios from 'axios';
import authHeader from './auth-header';
import config from '../utils/config'

class LogService {
  getLogs() {
    return axios.get(config.API_URL + 'logs', { headers: authHeader() });
  }
  getLogsByUser(id) {
    return axios.get(config.API_URL + `logs/${id}`, { headers: authHeader() });
  }
  createLog(data) {
    return axios.post(config.API_URL + 'addLog', data, { headers: authHeader() });
  }
}
export default new LogService();