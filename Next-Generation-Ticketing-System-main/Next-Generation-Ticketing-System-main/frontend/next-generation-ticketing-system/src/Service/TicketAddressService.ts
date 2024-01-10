import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/ticketAddresses";

class TicketAddressService {
  insert(ticketAddress: any) {
    return axios.post(USER_API_BASE_URL + "/insert", ticketAddress);
  }
}

export default new TicketAddressService();
