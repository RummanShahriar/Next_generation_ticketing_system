import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/phones";

class PhoneService {
  insert(phone: any) {
    return axios.post(USER_API_BASE_URL + "/insert", phone);
  }
}

export default new PhoneService();
