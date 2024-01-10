import axios from "axios";
import TicketView from "../Entity/CustomEntity/TicketView";

const USER_API_BASE_URL = "http://localhost:8080/api/tickets";

class TicketService {
  insert(ticket: any) {
    return axios.post(USER_API_BASE_URL + "/insert", ticket);
  }

  getMyTickets(userId: string) {
    return axios.post(USER_API_BASE_URL + "/getMyTickets", userId);
  }

  getRefund(ticketView: any) {
    return axios.post(USER_API_BASE_URL + "/getRefund", ticketView);
  }

  totalTicket() {
    return axios.get(USER_API_BASE_URL + "/totalTicket");
  }
}

export default new TicketService();
