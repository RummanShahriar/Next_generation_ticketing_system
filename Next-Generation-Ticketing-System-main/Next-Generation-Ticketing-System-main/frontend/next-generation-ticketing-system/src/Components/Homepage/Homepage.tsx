import React, { useContext, useEffect, useState } from "react";
import { UserToken } from "../../Token/UserToken";
import { Link, useNavigate } from "react-router-dom";
import "./homepage.css";
import DistrictService from "../../Service/DistrictService";
import District from "../../Entity/District";
import ScheduleCardService from "../../Service/ScheduleCardService";
import ScheduleCard from "../../Entity/CustomEntity/ScheduleCard";
import Seat from "../../Entity/Seat";
import RouteDistrict from "../../Entity/RouteDistrict";
import BusSchedule from "../../Entity/BusSchedule";
import TwoDistrict from "../../Entity/CustomEntity/TwoDistrict";

function Homepage() {
  let sourceFound = false;

  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [scheduleCards, setScheduleCards] = useState<ScheduleCard[]>([]);
  const [twoDistrict, setTwoDistrict] = useState<TwoDistrict>();
  const [dateError, setDateError] = useState<string>("");

  const { authorised, userId, userType } = useContext(UserToken);
  let navigate = useNavigate();
  useEffect(() => {
    if (authorised === "false") {
      navigate("/login");
    }
  }, [authorised]);

  useEffect(() => {
    DistrictService.getAllDistricts().then((res) => {
      let districts = res.data._embedded.districts;
      let tempDistricts: District[] = [];
      for (let i = 0; i < districts.length; i++) {
        tempDistricts.push(new District(i + 1, districts[i].distName));
      }
      setDistricts(tempDistricts);
    });
  }, []);

  useEffect(() => {
    if (selectedSource && selectedDestination && selectedDate) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [selectedSource, selectedDestination, selectedDate]);

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSource(e.target.value);
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDestination(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currentDate = new Date();
    let selectedDate = new Date(e.target.value);
    if (selectedDate.getDate() < currentDate.getDate()) {
      setDateError("Invalid Date");
      setSelectedDate("");
      return;
    } else {
      setDateError("");
      setSelectedDate(e.target.value);
    }
  };

  const handleFindClick = () => {
    let tempTwoDistrict = {
      source: districts[Number(selectedSource)],
      destination: districts[Number(selectedDestination)],
      timestamp: new Date(selectedDate),
    };
    setTwoDistrict(tempTwoDistrict);
    ScheduleCardService.getScheduleCards(tempTwoDistrict).then((res) => {
      let tempScheduleCard: ScheduleCard[] = res.data;
      setScheduleCards(tempScheduleCard);
    });
  };

  const freeSeats = (seats: Seat[]) => {
    let freeSeat = 0;
    for (let i = 0; i < seats.length; i++) {
      if (!seats[i].ticket) {
        freeSeat += 1;
      }
    }
    return freeSeat;
  };

  const routeOrder = (routeDistrictProp: RouteDistrict[]): District[] => {
    let tempSortedDistrict: District[] = [];
    for (let i = 0; i < routeDistrictProp.length; i++) {
      tempSortedDistrict.splice(
        routeDistrictProp[i].distOrder,
        0,
        routeDistrictProp[i].district
      );
    }
    return tempSortedDistrict;
  };

  function formatTime(date: Date): string {
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

  const timeCalculation = (
    busSchedule: BusSchedule,
    routeDistricts: RouteDistrict[],
    districtPosition: number
  ) => {
    let totalDistrict = routeDistricts.length;
    let departureTime = new Date(busSchedule.departureTime);
    let arrivalTime = new Date(busSchedule.arrivalTime);
    if (districtPosition === 1) {
      return formatTime(departureTime);
    } else if (districtPosition === totalDistrict) {
      return formatTime(arrivalTime);
    } else if (districtPosition > 1 && districtPosition < totalDistrict) {
      const duration = arrivalTime.getTime() - departureTime.getTime();
      const interval = duration / (totalDistrict - 1);
      const finalTime = new Date(
        departureTime.getTime() + (districtPosition - 1) * interval
      );
      return formatTime(finalTime);
    }
  };

  const priceCalculation = (
    busSchedule: BusSchedule,
    routeDistricts: RouteDistrict[]
  ) => {
    let isAC: boolean = busSchedule.bus.busType === "AC";
    let startingPoint = 0;
    let endingPoint = 0;
    for (let i = 0; i < routeDistricts.length; i++) {
      if (
        routeDistricts[i].district.distName === twoDistrict?.source.distName
      ) {
        startingPoint = routeDistricts[i].distOrder;
      }
      if (
        routeDistricts[i].district.distName ===
        twoDistrict?.destination.distName
      ) {
        endingPoint = routeDistricts[i].distOrder;
      }
    }
    let totalCheckpoint = endingPoint - startingPoint;
    if (isAC) {
      return totalCheckpoint * 400;
    } else {
      return totalCheckpoint * 300;
    }
  };

  return (
    <div className="flex justify-center h-screen background_image_homepage body_design">
      <div className="w-1/3 p-6">
        <div className="flex justify-center mt-10">
          <div className="flex space-x-4">
            <select
              aria-label="source"
              className="p-2 border border-gray-300 rounded"
              value={selectedSource}
              onChange={handleSourceChange}
            >
              <option className="selected">Select Source</option>
              {districts.map((district, index) => (
                <option key={district.distId} value={index}>
                  {district.distName}
                </option>
              ))}
            </select>
            <select
              aria-label="dest"
              className="p-2 border border-gray-300 rounded"
              value={selectedDestination}
              onChange={handleDestinationChange}
            >
              <option className="selected">Select Destination</option>
              {districts.map((district, index) => (
                <option key={district.distId} value={index}>
                  {district.distName}
                </option>
              ))}
            </select>
            <div>
              <input
                aria-label="date"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="p-2 border border-gray-300 rounded"
              />
              <div className="text-red-600 text-xs">{dateError}</div>
            </div>
            <button
              className={`ps-6 pe-6 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                isButtonDisabled
                  ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
                  : ""
              }`}
              disabled={isButtonDisabled}
              onClick={handleFindClick}
            >
              Find
            </button>
          </div>
        </div>
        {scheduleCards.length === 0 && (
          <div className="text-center text-5xl text-white rounded p-20 bg-black bg-opacity-25 mt-10">
            No Bus Found
          </div>
        )}
        {scheduleCards.map((scheduleCard, idxS) => (
          <Link
            to={{
              pathname: "/buyTicket",
              search: `?data=${encodeURIComponent(
                JSON.stringify({
                  twoDistrict: twoDistrict,
                  scheduleId: scheduleCard.busSchedule.scheduleId,
                })
              )}`,
            }}
            key={scheduleCard.busSchedule.scheduleId}
            className={`p-1 block justify-center mt-10 border ${
              scheduleCards.length - 1 === idxS && "mb-96"
            } ${
              freeSeats(scheduleCard.seats) == 0
                ? "border-red-300 bg-red-200 pointer-events-none"
                : "border-blue-300 hover:border-blue-600 bg-blue-200 hover:bg-blue-300"
            } bg-opacity-75 rounded hover:bg-opacity-70`}
          >
            <div className="flex justify-between">
              <div className="font-bold text-xl">
                Bus Number: {scheduleCard.busSchedule.bus.busNo} [
                {scheduleCard.busSchedule.bus.busType}]
              </div>
              <div className="font-bold text-xl">
                Seat Available ={" "}
                <span
                  className={`text-indigo-700 ${
                    freeSeats(scheduleCard.seats) === 0 && "text-red-600"
                  }`}
                >
                  {freeSeats(scheduleCard.seats)}
                </span>
              </div>
            </div>
            <div className="mt-2">
              {routeOrder(scheduleCard.routeDistricts).map(
                (district, index) => (
                  <div key={index}>
                    {district.distName === twoDistrict?.source.distName &&
                      (sourceFound = true)}
                    {sourceFound ? (
                      <>
                        <div className="flex justify-between bg-blue-100  bg-opacity-50">
                          <div className="text-indigo-700 font-bold">
                            &#9745; {district.distName}
                          </div>
                          <div className="text-indigo-700 font-bold">
                            {timeCalculation(
                              scheduleCard.busSchedule,
                              scheduleCard.routeDistricts,
                              index + 1
                            )}
                          </div>
                        </div>
                        {index !== scheduleCard.routeDistricts.length - 1 &&
                          (district.distName !==
                          twoDistrict?.destination.distName ? (
                            <div className="text-indigo-700 font-bold  bg-blue-100 bg-opacity-50">
                              &#9900;
                            </div>
                          ) : (
                            <div>&#9900;</div>
                          ))}
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <div>&#9744; {district.distName}</div>
                          <div>
                            {timeCalculation(
                              scheduleCard.busSchedule,
                              scheduleCard.routeDistricts,
                              index + 1
                            )}
                          </div>
                        </div>
                        {index !== scheduleCard.routeDistricts.length - 1 && (
                          <div>&#9900;</div>
                        )}
                      </>
                    )}
                    {district.distName === twoDistrict?.destination.distName &&
                      (sourceFound = false)}
                  </div>
                )
              )}
            </div>
            <div className="font-bold text-center text-4xl mt-2">
              {priceCalculation(
                scheduleCard.busSchedule,
                scheduleCard.routeDistricts
              )}{" "}
              BDT
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
