import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/routeDistricts";

class RouteDistrictService {
  insert(routeDistrict: any) {
    return axios.post(USER_API_BASE_URL + "/insert", routeDistrict);
  }
  getAll() {
    return axios.get(USER_API_BASE_URL + "/getAll");
  }
}

export default new RouteDistrictService();
