import Route from "./Route";
import District from "./District";

class RouteDistrict {
  routeDistrictId: number;
  route: Route;
  district: District;
  distOrder: number;

  constructor(
    routeDistrictId: number,
    route: Route,
    district: District,
    distOrder: number
  ) {
    this.routeDistrictId = routeDistrictId;
    this.route = route;
    this.district = district;
    this.distOrder = distOrder;
  }
}

export default RouteDistrict;
