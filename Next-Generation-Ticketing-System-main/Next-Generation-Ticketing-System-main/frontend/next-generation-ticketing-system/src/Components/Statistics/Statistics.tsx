import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserToken } from "../../Token/UserToken";
import "./../Homepage/homepage.css";
import UserService from "../../Service/UserService";
import DriverService from "../../Service/DriverService";
import AuthService from "../../Service/AuthService";
import BusService from "../../Service/BusService";
import RouteService from "../../Service/RouteService";
import BusScheduleService from "../../Service/BusScheduleService";
import TicketService from "../../Service/TicketService";
import SeatService from "../../Service/SeatService";

function Statistics() {
  const [totalUser, setTotalUser] = useState(0);
  const [totalDriver, setTotalDriver] = useState(0);
  const [totalPassenger, setTotalPassenger] = useState(0);
  const [totalBus, setTotalBus] = useState(0);
  const [totalRoute, setTotalRoute] = useState(0);
  const [totalUpcomingRide, setTotalUpcomingRide] = useState(0);
  const [totalCompletedRide, setTotalCompletedRide] = useState(0);
  const [totalTicketSold, setTotalTicketSold] = useState(0);
  const [averageSeatOccupancy, setAverageSeatOccupancy] = useState(0);

  const { authorised, userId, userType } = useContext(UserToken);
  let navigate = useNavigate();

  useEffect(() => {
    if (authorised === "false") {
      navigate("/login");
    }
    if (userType !== "admin") {
      navigate("/home");
    }
  }, [authorised, userType]);

  useEffect(() => {
    UserService.totalUser().then((res) => {
      setTotalUser(res.data);
    });

    DriverService.totalDriver().then((res) => {
      setTotalDriver(res.data);
    });

    AuthService.totalPassenger().then((res) => {
      setTotalPassenger(res.data);
    });

    BusService.getAllBus().then((res) => {
      setTotalBus(res.data.length);
    });

    RouteService.totalRoute().then((res) => {
      setTotalRoute(res.data);
    });

    BusScheduleService.totalUpcomingRides().then((res) => {
      setTotalUpcomingRide(res.data);
    });

    BusScheduleService.totalCompletedRides().then((res) => {
      setTotalCompletedRide(res.data);
    });

    TicketService.totalTicket().then((res) => {
      setTotalTicketSold(res.data);
    });

    SeatService.averageSeatOccupancy().then((res) => {
      setAverageSeatOccupancy(res.data);
    });
  }, [authorised, userType]);

  return (
    <div className="flex justify-center h-screen background_image_homepage body_design">
      <div className="w-1/3 p-6 mt-16">
        <div className="bg-black bg-opacity-75 border-2 border-white p-4 rounded">
          <div className="font-bold text-xl text-white bg-violet-950 p-2 text-center rounded">
            Total User
          </div>
          <div className="text-8xl text-white text-center font-extrabold">
            {totalUser}
          </div>
        </div>

        <div className="bg-black bg-opacity-75 border-2 border-white p-4 rounded mt-10">
          <div className="font-bold text-xl text-white bg-violet-950 p-2 text-center rounded">
            Total Passenger
          </div>
          <div className="text-8xl text-white text-center font-extrabold">
            {totalPassenger}
          </div>
        </div>

        <div className="bg-black bg-opacity-75 border-2 border-white p-4 rounded mt-10">
          <div className="font-bold text-xl text-white bg-violet-950 p-2 text-center rounded">
            Total Driver
          </div>
          <div className="text-8xl text-white text-center font-extrabold">
            {totalDriver}
          </div>
        </div>

        <div className="bg-black bg-opacity-75 border-2 border-white p-4 rounded mt-10">
          <div className="font-bold text-xl text-white bg-violet-950 p-2 text-center rounded">
            Total Bus
          </div>
          <div className="text-8xl text-white text-center font-extrabold">
            {totalBus}
          </div>
        </div>

        <div className="bg-black bg-opacity-75 border-2 border-white p-4 rounded mt-10">
          <div className="font-bold text-xl text-white bg-violet-950 p-2 text-center rounded">
            Total Route
          </div>
          <div className="text-8xl text-white text-center font-extrabold">
            {totalRoute}
          </div>
        </div>

        <div className="bg-black bg-opacity-75 border-2 border-white p-4 rounded mt-10">
          <div className="font-bold text-xl text-white bg-violet-950 p-2 text-center rounded">
            Total upcoming Ride
          </div>
          <div className="text-8xl text-white text-center font-extrabold">
            {totalUpcomingRide}
          </div>
        </div>

        <div className="bg-black bg-opacity-75 border-2 border-white p-4 rounded mt-10">
          <div className="font-bold text-xl text-white bg-violet-950 p-2 text-center rounded">
            Total Completed Ride
          </div>
          <div className="text-8xl text-white text-center font-extrabold">
            {totalCompletedRide}
          </div>
        </div>

        <div className="bg-black bg-opacity-75 border-2 border-white p-4 rounded mt-10">
          <div className="font-bold text-xl text-white bg-violet-950 p-2 text-center rounded">
            Total Ticket Sold
          </div>
          <div className="text-8xl text-white text-center font-extrabold">
            {totalTicketSold}
          </div>
        </div>

        <div className="bg-black bg-opacity-75 border-2 border-white p-4 rounded mt-10">
          <div className="font-bold text-xl text-white bg-violet-950 p-2 text-center rounded">
            Average Seat Occupancy
          </div>
          <div className="text-8xl text-white text-center font-extrabold">
            {averageSeatOccupancy}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
