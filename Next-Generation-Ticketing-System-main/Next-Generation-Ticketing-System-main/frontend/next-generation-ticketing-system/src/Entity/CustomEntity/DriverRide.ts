import BusSchedule from "../BusSchedule";
import RouteDistrict from "../RouteDistrict";

class DriverRide {
  busSchedule: BusSchedule;
  routeDistricts: RouteDistrict[];

  constructor(busSchedule: BusSchedule, routeDistricts: RouteDistrict[]) {
    this.busSchedule = busSchedule;
    this.routeDistricts = routeDistricts;
  }
}

export default DriverRide;
