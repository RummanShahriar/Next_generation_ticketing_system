import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ScheduleCard from "../../Entity/CustomEntity/ScheduleCard";
import TwoDistrict from "../../Entity/CustomEntity/TwoDistrict";
import { UserToken } from "../../Token/UserToken";
import ScheduleCardService from "../../Service/ScheduleCardService";
import "./buyTicket.css";
import Seat from "../../Entity/Seat";
import RouteDistrict from "../../Entity/RouteDistrict";
import District from "../../Entity/District";
import BusSchedule from "../../Entity/BusSchedule";
import UserService from "../../Service/UserService";
import TicketService from "../../Service/TicketService";
import TicketAddressService from "../../Service/TicketAddressService";
import SeatService from "../../Service/SeatService";

function BuyTicket() {
  let sourceFound = false;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jsonString = searchParams.get("data") || "";
  const [scheduleCard, setScheduleCard] = useState<ScheduleCard>();
  const [seatSelected, setSeatSelected] = useState<Seat[]>([]);
  const [twoDistrict, setTwoDistrict] = useState<TwoDistrict>();
  const [successfulTicket, setSuccessfulTicket] = useState<boolean>(false);

  const { authorised, userId, userType } = useContext(UserToken);
  let navigate = useNavigate();
  useEffect(() => {
    if (authorised === "false") {
      navigate("/login");
    }
  }, [authorised]);

  const renderSeatButtons = () => {
    const handleSeatClick = (seat: Seat) => {
      let seatSelectedTemp = [...seatSelected];
      if (seatSelectedTemp.some((st) => st === seat)) {
        seatSelectedTemp = seatSelectedTemp.filter((st) => st !== seat);
        setSeatSelected(seatSelectedTemp);
      } else {
        seatSelectedTemp.push(seat);
        setSeatSelected(seatSelectedTemp);
      }
    };
    return (
      <div className="border-2 border-white p-6 rounded-2xl bg-black bg-opacity-75">
        <div className="flex justify-between pb-2">
          <img
            src={require("./../../Pictures/Icons/exit-alt-white.png")}
            alt="steering wheel icon"
            width={64}
          />
          <img
            src={require("./../../Pictures/Icons/steering-wheel-white.png")}
            alt="steering wheel icon"
            width={64}
          />
        </div>
        <div>
          {Array.from({ length: 10 }).map((_, colIndex) => (
            <div key={colIndex} className="flex justify-center">
              {Array.from({ length: 4 }).map((_, rowIndex) => {
                const seatIndex = colIndex * 4 + rowIndex;
                const seat = scheduleCard?.seats[seatIndex];
                if (seat !== undefined && seat !== null) {
                  return (
                    <button
                      key={seat.seatId}
                      className={`${rowIndex === 2 && "ms-10"} ${
                        seatSelected.some((st) => st === seat) &&
                        "bg-blue-950 bg-opacity-75 border-green-700 hover:bg-blue-700 hover:bg-opacity-75"
                      } bg-blue-400 bg-opacity-75 border border-1 border-blue-200 rounded ${
                        seat.ticket &&
                        "pointer-events-none bg-gray-500 bg-opacity-75 border-red-500"
                      } hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 w-16`}
                      onClick={() => handleSeatClick(seat)}
                    >
                      {seat.seatNo}
                    </button>
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSuccessfulTicket = () => {
    return (
      <div className="bg-blue-300 bg-opacity-75 border-2 border-white rounded-2xl p-10">
        <div className="text-black text-3xl font-bold text-center">
          {seatSelected.length} Ticket/s Bought Successfully
        </div>
        <div className="text-black text-xl font-bold text-center">
          Please check your ticket in the ticket section
        </div>
        <div className="flex justify-center mt-5">
          <Link to="/tickets">
            <div className=" w-64 text-center bg-blue-500 rounded-2xl border-2 border-white p-3 text-black font-bold text-xl hover:bg-blue-700 hover:bg-opacity-75">
              OK
            </div>
          </Link>
        </div>
      </div>
    );
  };

  const renderDetailsInfo = () => {
    const freeSeats = (seats: Seat[]) => {
      let freeSeat = 0;
      for (let i = 0; i < seats.length; i++) {
        if (!seats[i].ticket) {
          freeSeat += 1;
        }
      }
      return freeSeat - seatSelected.length;
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
        return totalCheckpoint * 400 * seatSelected.length;
      } else {
        return totalCheckpoint * 300 * seatSelected.length;
      }
    };

    const districtChangeHandler = (
      district: District,
      routeDistrictsProp: RouteDistrict[]
    ) => {
      if (twoDistrict) {
        let tempTwoDistrict: TwoDistrict = { ...twoDistrict };
        const sortedDistricts = routeOrder(routeDistrictsProp);
        const districtIndex = sortedDistricts.indexOf(district);
        const sourceIndex = sortedDistricts.indexOf(twoDistrict.source);
        const destinationIndex = sortedDistricts.indexOf(
          twoDistrict.destination
        );
        if (
          districtIndex > destinationIndex ||
          (districtIndex < destinationIndex && districtIndex > sourceIndex)
        ) {
          tempTwoDistrict.destination = district;
        }
        if (
          districtIndex < sourceIndex ||
          (districtIndex > sourceIndex && districtIndex < destinationIndex)
        ) {
          tempTwoDistrict.source = district;
        }
        setTwoDistrict(tempTwoDistrict);
      }
    };

    const buyTicketHandler = () => {
      if (twoDistrict) {
        UserService.getUserById(userId).then((res) => {
          let ticket = {
            purchaseDate: new Date(),
            busSchedule: scheduleCard?.busSchedule,
            user: res.data,
            refunded: false,
          };
          TicketService.insert(ticket).then((res1) => {
            let ticketAddress = {
              source: twoDistrict.source,
              destination: twoDistrict.destination,
              ticket: res1.data,
            };
            TicketAddressService.insert(ticketAddress).then((res2) => {
              seatSelected.forEach((seat) => {
                seat.ticket = res1.data;
                SeatService.updateTicket(seat).then((res3) => {});
              });
              setSuccessfulTicket(true);
            });
          });
        });
      }
    };

    return (
      scheduleCard && (
        <div
          key={scheduleCard?.busSchedule.scheduleId}
          className={`p-3 block justify-center mt-10 border-2 border-white bg-black bg-opacity-75 rounded-2xl text-white`}
        >
          <div className="flex justify-between">
            <div className="font-bold text-xl">
              Bus Number: {scheduleCard.busSchedule.bus.busNo} [
              {scheduleCard.busSchedule.bus.busType}]
            </div>
            <div className="ps-8 font-bold text-xl">
              Seat Available ={" "}
              <span
                className={`text-indigo-400 ${
                  freeSeats(scheduleCard.seats) === 0 && "text-red-600"
                }`}
              >
                {freeSeats(scheduleCard.seats)}
              </span>
            </div>
          </div>
          <div className="mt-2">
            {routeOrder(scheduleCard.routeDistricts).map((district, index) => (
              <div key={index}>
                {district.distName === twoDistrict?.source.distName &&
                  (sourceFound = true)}
                {sourceFound ? (
                  <>
                    <div
                      className="flex justify-between bg-gray-900  bg-opacity-90  hover:bg-opacity-30 hover:bg-blue-300 hover:cursor-pointer"
                      onClick={() => {
                        districtChangeHandler(
                          district,
                          scheduleCard.routeDistricts
                        );
                      }}
                    >
                      <div className="text-indigo-400 font-bold">
                        &#9745; {district.distName}
                      </div>
                      <div className="ps-10 text-indigo-400 font-bold">
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
                        <div className="text-indigo-400 font-bold  bg-gray-900  bg-opacity-90">
                          &#9900;
                        </div>
                      ) : (
                        <div>&#9900;</div>
                      ))}
                  </>
                ) : (
                  <>
                    <div
                      className="flex justify-between hover:bg-opacity-30 hover:bg-blue-300 hover:cursor-pointer"
                      onClick={() => {
                        districtChangeHandler(
                          district,
                          scheduleCard.routeDistricts
                        );
                      }}
                    >
                      <div>&#9744; {district.distName}</div>
                      <div className="ps-10">
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
            ))}
          </div>
          <div className="font-bold text-center text-4xl mt-2">
            {priceCalculation(
              scheduleCard.busSchedule,
              scheduleCard.routeDistricts
            )}{" "}
            BDT
          </div>
          <div
            onClick={buyTicketHandler}
            className={`${
              twoDistrict?.source.distName ===
                twoDistrict?.destination.distName &&
              "bg-gray-500 pointer-events-none hover:bg-gray-500"
            } ${
              seatSelected.length < 1 &&
              "bg-gray-500 pointer-events-none hover:bg-gray-500"
            } flex justify-center rounded-2xl border-2 border-white bg-blue-500 bg-opacity-25 hover:bg-green-300 hover:bg-opacity-30 hover:cursor-pointer p-4 mt-3 font-bold text-2xl`}
          >
            Buy
          </div>
        </div>
      )
    );
  };

  useEffect(() => {
    if (jsonString === "") {
      navigate("/home");
      return;
    }
    const data = JSON.parse(decodeURIComponent(jsonString));
    const scheduleId: number = data.scheduleId;
    const twoDistrict: TwoDistrict = data.twoDistrict;
    setTwoDistrict(twoDistrict);
    ScheduleCardService.getScheduleCard(scheduleId).then((res) => {
      setScheduleCard(res.data);
    });
  }, [jsonString]);

  return (
    <div className="flex justify-center items-center h-screen  background_image_buy_ticket">
      {successfulTicket ? (
        renderSuccessfulTicket()
      ) : (
        <>
          <div className=" flex-col items-center pt-20 ms-4">
            {renderSeatButtons()}
          </div>
          <div className=" flex-col items-center ms-4">
            {renderDetailsInfo()}
          </div>
        </>
      )}
    </div>
  );
}

export default BuyTicket;
