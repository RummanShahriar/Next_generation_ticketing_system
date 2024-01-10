import BusSchedule from "./BusSchedule";
import Ticket from "./Ticket";

class Seat {
  seatId: number;
  seatNo: string;
  busSchedule: BusSchedule;
  ticket: Ticket;

  constructor(
    seatId: number,
    seatNo: string,
    busSchedule: BusSchedule,
    ticket: Ticket
  ) {
    this.seatId = seatId;
    this.seatNo = seatNo;
    this.busSchedule = busSchedule;
    this.ticket = ticket;
  }
}

export default Seat;
