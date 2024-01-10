import React, { useContext, useEffect, useState } from "react";
import { UserToken } from "../../Token/UserToken";
import { useNavigate } from "react-router-dom";
import BusScheduleService from "../../Service/BusScheduleService";
import DriverRide from "../../Entity/CustomEntity/DriverRide";

function UpcomingRide() {
  const [upcomingRide, setUpcomingRide] = useState<DriverRide[]>([]);

  const { authorised, userId, userType } = useContext(UserToken);
  let navigate = useNavigate();
  useEffect(() => {
    if (authorised === "false") {
      navigate("/login");
    }
    if (userType !== "busDriver") {
      navigate("/home");
    }
  }, [authorised, userType]);

  useEffect(() => {
    if (userId) {
      BusScheduleService.getMyRides(Number(userId)).then((response) => {
        setUpcomingRide(response.data);
      });
    }
  }, []);

  function formatTime(date: Date): string {
    date = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    return date.toLocaleString(undefined, options);
  }

  return (
    <div className="flex justify-center h-screen background_image_ticket body_design">
      <div className="w-1/2 p-6 mt-10">
        {upcomingRide.length === 0 && (
          <div className="text-center text-5xl text-white rounded p-20 bg-black bg-opacity-25 mt-10">
            No Upcoming Rides available
          </div>
        )}

        {upcomingRide.map((ride) => (
          <div
            key={ride.busSchedule.scheduleId}
            className="text-white rounded-xl font-bold bg-black bg-opacity-75 mt-10 border-2 border-white p-10"
          >
            <div className="flex justify-between">
              <div>
                Departure Time: {formatTime(ride.busSchedule.departureTime)}
              </div>
              <div>
                Arrival Time: {formatTime(ride.busSchedule.arrivalTime)}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div>Source: {ride.routeDistricts[0].district.distName}</div>
              <div>
                Destination:{" "}
                {
                  ride.routeDistricts[ride.routeDistricts.length - 1].district
                    .distName
                }
              </div>
            </div>
            <div className="mt-4">
              Bus: {ride.busSchedule.bus.busNo} [{ride.busSchedule.bus.busType}]
              [{ride.busSchedule.bus.busCapacity}]
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingRide;
