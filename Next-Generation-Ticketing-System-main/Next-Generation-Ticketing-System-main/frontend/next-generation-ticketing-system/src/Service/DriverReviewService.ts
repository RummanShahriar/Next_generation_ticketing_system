import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/driverReviews";

class DriverReviewService {
  insert(driverReview: any) {
    return axios.post(USER_API_BASE_URL + "/insert", driverReview);
  }

  checkReview(ticketView: any) {
    return axios.post(USER_API_BASE_URL + "/checkReview", ticketView);
  }

  getDriverReview(driver: any) {
    return axios.post(USER_API_BASE_URL + "/getDriverReview", driver);
  }
}

export default new DriverReviewService();
