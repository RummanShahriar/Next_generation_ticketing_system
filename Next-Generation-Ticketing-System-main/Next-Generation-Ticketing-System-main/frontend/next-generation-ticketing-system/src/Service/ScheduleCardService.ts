import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/scheduleCard";

class ScheduleCardService {
  getScheduleCards(scheduleCard: any) {
    return axios.post(USER_API_BASE_URL + "s", scheduleCard);
  }
  getScheduleCard(scheduleId: number) {
    return axios.post(USER_API_BASE_URL, scheduleId);
  }
}

export default new ScheduleCardService();
