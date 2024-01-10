import BusSchedule from "../BusSchedule";
import Seat from "../Seat";
import RouteDistrict from "../RouteDistrict";

class ScheduleCard {
  busSchedule: BusSchedule;
  seats: Seat[];
  routeDistricts: RouteDistrict[];

  constructor(
    busSchedule: BusSchedule,
    seats: Seat[],
    routeDistricts: RouteDistrict[]
  ) {
    this.busSchedule = busSchedule;
    this.seats = seats;
    this.routeDistricts = routeDistricts;
  }
}

export default ScheduleCard;
