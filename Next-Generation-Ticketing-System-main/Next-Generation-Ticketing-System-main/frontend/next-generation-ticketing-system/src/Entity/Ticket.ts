import BusSchedule from "./BusSchedule";
import User from "./User";

class Ticket {
  ticketId: number;
  purchaseDate: Date;
  busSchedule: BusSchedule;
  user: User;
  refunded: boolean;

  constructor(
    ticketId: number,
    purchaseDate: Date,
    busSchedule: BusSchedule,
    user: User,
    refunded: boolean
  ) {
    this.ticketId = ticketId;
    this.purchaseDate = purchaseDate;
    this.busSchedule = busSchedule;
    this.user = user;
    this.refunded = refunded;
  }
}

export default Ticket;
