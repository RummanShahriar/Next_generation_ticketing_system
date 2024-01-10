import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/names";

class NameService {
  insert(name: any) {
    return axios.post(USER_API_BASE_URL + "/insert", name);
  }

  getFreeDriver(busSchedule: any) {
    return axios.post(USER_API_BASE_URL + "/getFreeDriver", busSchedule);
  }

  getDriverName(user: any) {
    return axios.post(USER_API_BASE_URL + "/getDriverName", user);
  }

  getAllUser() {
    return axios.get(USER_API_BASE_URL + "/getAllUser");
  }

  getAllDriver() {
    return axios.get(USER_API_BASE_URL + "/getAllDriver");
  }
}

export default new NameService();
