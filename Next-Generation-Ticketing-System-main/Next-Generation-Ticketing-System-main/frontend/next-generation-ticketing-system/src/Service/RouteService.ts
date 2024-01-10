import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/routes";

class RouteService {
  insert(route: any) {
    return axios.post(USER_API_BASE_URL + "/insert", route);
  }

  totalRoute() {
    return axios.get(USER_API_BASE_URL + "/totalRoute");
  }
}

export default new RouteService();
