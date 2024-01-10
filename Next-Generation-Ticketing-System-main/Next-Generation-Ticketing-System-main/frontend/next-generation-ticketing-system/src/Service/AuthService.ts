import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/auths";

class AuthService {
  insert(auth: any) {
    return axios.post(USER_API_BASE_URL + "/insert", auth);
  }

  update(user: any) {
    return axios.post(USER_API_BASE_URL + "/update", user);
  }
  getAllDriver() {
    return axios.get(USER_API_BASE_URL + "/getAllDriver");
  }

  totalPassenger() {
    return axios.get(USER_API_BASE_URL + "/totalPassenger");
  }

  deleteDriver(user_id: any) {
    return axios.delete(`http://localhost:8080/api/auths/` + user_id);
  }
}

export default new AuthService();
