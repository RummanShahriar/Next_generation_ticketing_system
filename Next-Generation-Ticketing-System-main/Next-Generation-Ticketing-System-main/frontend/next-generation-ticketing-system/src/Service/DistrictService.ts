import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/districts";

class DistrictService {
  getAllDistricts() {
    return axios.get(USER_API_BASE_URL + "?page=0&size=64");
  }
}

export default new DistrictService();
