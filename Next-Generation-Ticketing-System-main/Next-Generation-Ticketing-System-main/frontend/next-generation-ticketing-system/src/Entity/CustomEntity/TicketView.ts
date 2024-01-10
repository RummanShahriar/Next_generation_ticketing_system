import Ticket from "../Ticket";
import BusSchedule from "../BusSchedule";
import TicketAddress from "../TicketAddress";
import Seat from "../Seat";
import RouteDistrict from "../RouteDistrict";

class TicketView {
  ticket: Ticket;
  busSchedule: BusSchedule;
  ticketAddress: TicketAddress;
  seats: Seat[];
  routeDistricts: RouteDistrict[];

  constructor(
    ticket: Ticket,
    busSchedule: BusSchedule,
    ticketAddress: TicketAddress,
    seats: Seat[],
    routeDistricts: RouteDistrict[]
  ) {
    this.ticket = ticket;
    this.busSchedule = busSchedule;
    this.ticketAddress = ticketAddress;
    this.seats = seats;
    this.routeDistricts = routeDistricts;
  }
}

export default TicketView;
