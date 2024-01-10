import District from "./District";
import Ticket from "./Ticket";

class TicketAddress {
  ticketAddressId: number;
  source: District;
  destination: District;
  ticket: Ticket;

  constructor(
    ticketAddressId: number,
    source: District,
    destination: District,
    ticket: Ticket
  ) {
    this.ticketAddressId = ticketAddressId;
    this.source = source;
    this.destination = destination;
    this.ticket = ticket;
  }
}

export default TicketAddress;
