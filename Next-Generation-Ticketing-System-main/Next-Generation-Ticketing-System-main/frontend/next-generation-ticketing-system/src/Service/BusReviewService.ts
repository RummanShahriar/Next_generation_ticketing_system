import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/busReviews";

class BusReviewService {
  insert(busReview: any) {
    return axios.post(USER_API_BASE_URL + "/insert", busReview);
  }

  checkReview(ticketView: any) {
    return axios.post(USER_API_BASE_URL + "/checkReview", ticketView);
  }

  getBusReview(bus: any) {
    return axios.post(USER_API_BASE_URL + "/getBusReview", bus);
  }
}

export default new BusReviewService();
