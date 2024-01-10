import Bus from "./Bus";
import route from "./Route";
import User from "./User";

class BusSchedule {
  scheduleId: number;
  bus: Bus;
  route: route;
  departureTime: Date;
  arrivalTime: Date;
  driver: User;

  constructor(
    scheduleId: number,
    bus: Bus,
    route: route,
    departureTime: Date,
    arrivalTime: Date,
    driver: User
  ) {
    this.scheduleId = scheduleId;
    this.bus = bus;
    this.route = route;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
    this.driver = driver;
  }
}

export default BusSchedule;
