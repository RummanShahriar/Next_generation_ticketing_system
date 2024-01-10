import React, { useContext, useEffect, useState } from "react";
import "./ticketPage.css";
import { UserToken } from "../../Token/UserToken";
import { Link, useNavigate } from "react-router-dom";
import TicketService from "../../Service/TicketService";
import TicketView from "../../Entity/CustomEntity/TicketView";
import User from "../../Entity/User";
import Name from "../../Entity/Name";
import NameService from "../../Service/NameService";
import BusSchedule from "../../Entity/BusSchedule";
import RouteDistrict from "../../Entity/RouteDistrict";
import TicketAddress from "../../Entity/TicketAddress";
import District from "../../Entity/District";
import BusReviewService from "../../Service/BusReviewService";
import DriverReviewService from "../../Service/DriverReviewService";

interface BusRateComponentProps {
  ticketView: TicketView;
}

const BusRateComponent: React.FC<BusRateComponentProps> = ({ ticketView }) => {
  const [hasReview, setHasReview] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      const res = await BusReviewService.checkReview(ticketView);
      setHasReview(res.data);
    };

    fetchReview();
  }, [ticketView]);

  return (
    <>
      {!hasReview ? (
        <Link
          to={{
            pathname: "/busReview",
            search: `?data=${encodeURIComponent(
              JSON.stringify({
                ticketView: ticketView,
              })
            )}`,
          }}
          className="border-2 border-white bg-blue-500 bg-opacity-75 text-2xl rounded-xl p-2 mt-4 text-center hover:bg-blue-700 hover:bg-opacity-75 cursor-pointer"
        >
          Rate Bus
        </Link>
      ) : (
        <div className="border-2 border-white bg-gray-500 bg-opacity-75 text-2xl rounded-xl p-2 mt-4 text-center">
          Bus Rated
        </div>
      )}
    </>
  );
};

interface DriverRateComponentProps {
  ticketView: TicketView;
}

const DriverRateComponent: React.FC<DriverRateComponentProps> = ({
  ticketView,
}) => {
  const [hasReview, setHasReview] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      const res = await DriverReviewService.checkReview(ticketView);
      setHasReview(res.data);
    };

    fetchReview();
  }, [ticketView]);

  return (
    <>
      {!hasReview ? (
        <Link
          to={{
            pathname: "/driverReview",
            search: `?data=${encodeURIComponent(
              JSON.stringify({
                ticketView: ticketView,
              })
            )}`,
          }}
          className="border-2 border-white bg-blue-500 bg-opacity-75 text-2xl rounded-xl p-2 mt-4 text-center hover:bg-blue-700 hover:bg-opacity-75 cursor-pointer"
        >
          Rate Driver
        </Link>
      ) : (
        <div className="border-2 border-white bg-gray-500 bg-opacity-75 text-2xl rounded-xl p-2 mt-4 text-center">
          Driver Rated
        </div>
      )}
    </>
  );
};

const DriverNameComponent = ({ user }: { user: User }) => {
  const [driverName, setDriverName] = useState("");

  useEffect(() => {
    NameService.getDriverName(user).then((res) => {
      let name = res.data;
      setDriverName(name.firstName + " " + name.lastName);
    });
  }, [user]);

  return (
    <span>
      {driverName} [{user.email}]
    </span>
  );
};

function TicketPage() {
  const [ticketViews, setTicketViews] = useState<TicketView[]>([]);

  const { authorised, userId, userType } = useContext(UserToken);
  let navigate = useNavigate();
  useEffect(() => {
    if (authorised === "false") {
      navigate("/login");
    }
  }, [authorised]);

  useEffect(() => {
    TicketService.getMyTickets(userId).then((res) => {
      let tempTicketViews: TicketView[] = res.data;
      setTicketViews(tempTicketViews);
    });
  }, []);

  function formatTime(date: Date): string {
    let timestamp = date.toString();
    date = new Date(timestamp);
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

  function getDriverName(user: User) {
    NameService.getDriverName(user).then((res) => {
      let name: Name = res.data;
      return name.firstName + " " + name.lastName;
    });
  }

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

  const timeCalculationForRefund = (
    busSchedule: BusSchedule,
    routeDistricts: RouteDistrict[],
    districtPosition: number
  ) => {
    let totalDistrict = routeDistricts.length;
    let departureTime = new Date(busSchedule.departureTime);
    let arrivalTime = new Date(busSchedule.arrivalTime);
    if (districtPosition === 1) {
      return new Date(departureTime);
    } else if (districtPosition === totalDistrict) {
      return new Date(arrivalTime);
    } else if (districtPosition > 1 && districtPosition < totalDistrict) {
      const duration = arrivalTime.getTime() - departureTime.getTime();
      const interval = duration / (totalDistrict - 1);
      return new Date(
        departureTime.getTime() + (districtPosition - 1) * interval
      );
    }
  };
  const timeCalculationHandleForRefund = (
    busSchedule: BusSchedule,
    routeDistricts: RouteDistrict[],
    districtOption: string,
    ticketAddress: TicketAddress
  ) => {
    let index = 0;
    let sortedDistricts = routeOrder(routeDistricts);
    if (districtOption === "Source") {
      for (let i = 0; i < sortedDistricts.length; i++) {
        if (sortedDistricts[i].distName === ticketAddress.source.distName) {
          index = i;
          break;
        }
      }
      return timeCalculationForRefund(busSchedule, routeDistricts, index + 1);
    } else {
      for (let i = 0; i < sortedDistricts.length; i++) {
        if (
          sortedDistricts[i].distName === ticketAddress.destination.distName
        ) {
          index = i;
          break;
        }
      }
      return timeCalculationForRefund(busSchedule, routeDistricts, index + 1);
    }
  };

  const timeCalculationHandle = (
    busSchedule: BusSchedule,
    routeDistricts: RouteDistrict[],
    districtOption: string,
    ticketAddress: TicketAddress
  ) => {
    let index = 0;
    let sortedDistricts = routeOrder(routeDistricts);
    if (districtOption === "Source") {
      for (let i = 0; i < sortedDistricts.length; i++) {
        if (sortedDistricts[i].distName === ticketAddress.source.distName) {
          index = i;
          break;
        }
      }
      return timeCalculation(busSchedule, routeDistricts, index + 1);
    } else {
      for (let i = 0; i < sortedDistricts.length; i++) {
        if (
          sortedDistricts[i].distName === ticketAddress.destination.distName
        ) {
          index = i;
          break;
        }
      }
      return timeCalculation(busSchedule, routeDistricts, index + 1);
    }
  };

  const priceCalculation = (
    busSchedule: BusSchedule,
    routeDistricts: RouteDistrict[],
    ticketAddress: TicketAddress
  ) => {
    let isAC: boolean = busSchedule.bus.busType === "AC";
    let startingPoint = 0;
    let endingPoint = 0;
    for (let i = 0; i < routeDistricts.length; i++) {
      if (
        routeDistricts[i].district.distName === ticketAddress.source.distName
      ) {
        startingPoint = routeDistricts[i].distOrder;
      }
      if (
        routeDistricts[i].district.distName ===
        ticketAddress.destination.distName
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

  const getRefundHandler = (ticketView: TicketView) => {
    TicketService.getRefund(ticketView).then((res) => {
      let tempTicketViews: TicketView[] = res.data;
      setTicketViews(tempTicketViews);
    });
  };

  const refundValidator = (ticketView: TicketView) => {
    let departureTime = timeCalculationHandleForRefund(
      ticketView.busSchedule,
      ticketView.routeDistricts,
      "Source",
      ticketView.ticketAddress
    );
    if (departureTime) {
      let currentTime = new Date().getTime();
      return departureTime.getTime() - currentTime >= 86400000;
    }
  };

  const travelCompleteValidator = (ticketView: TicketView) => {
    let arrivalTime = timeCalculationHandleForRefund(
      ticketView.busSchedule,
      ticketView.routeDistricts,
      "Destination",
      ticketView.ticketAddress
    );
    if (arrivalTime) {
      let currentTime = new Date().getTime();
      return arrivalTime.getTime() - currentTime <= 0;
    }
  };

  return (
    <div className="flex justify-center h-screen background_image_ticket body_design">
      <div className="w-1/3 p-6 mt-10">
        {ticketViews.length === 0 && (
          <div className="text-center text-5xl text-white rounded p-20 bg-black bg-opacity-25 mt-10">
            No Ticket Found
          </div>
        )}
        {ticketViews.map((ticketView) => (
          <div
            key={ticketView.ticket.ticketId}
            className="border-2 border-white bg-blue-300 bg-opacity-75 rounded-xl font-bold p-4 mt-10"
          >
            <div className="flex justify-between">
              <div>Ticket ID: {ticketView.ticket.ticketId}</div>
              <div>
                Purchase Date: {formatTime(ticketView.ticket.purchaseDate)}
              </div>
            </div>
            <div className="flex justify-between gap-x-10">
              <div>
                Bus: {ticketView.busSchedule.bus.busNo} [
                {ticketView.busSchedule.bus.busType}]
              </div>
              <div>
                Driver:{" "}
                <DriverNameComponent user={ticketView.busSchedule.driver} />
              </div>
            </div>
            <div className="mt-4 flex justify-between gap-x-10">
              <div>From: {ticketView.ticketAddress.source.distName}</div>
              <div>
                Departure:{" "}
                {timeCalculationHandle(
                  ticketView.busSchedule,
                  ticketView.routeDistricts,
                  "Source",
                  ticketView.ticketAddress
                )}
              </div>
            </div>
            <div className="flex justify-between gap-x-10">
              <div>To: {ticketView.ticketAddress.destination.distName}</div>
              <div>
                Arrival:{" "}
                {timeCalculationHandle(
                  ticketView.busSchedule,
                  ticketView.routeDistricts,
                  "Destination",
                  ticketView.ticketAddress
                )}
              </div>
            </div>
            {!ticketView.ticket.refunded && (
              <div className="mt-2 flex justify-between gap-x-10">
                <div>
                  Seat/s:{" "}
                  {ticketView.seats.map((st, index) => (
                    <span
                      key={index}
                      className="me-1 bg-violet-600 bg-opacity-75 p-1 rounded"
                    >
                      {st.seatNo}
                    </span>
                  ))}
                </div>
                <div className="font-extrabold">
                  Price:{" "}
                  {priceCalculation(
                    ticketView.busSchedule,
                    ticketView.routeDistricts,
                    ticketView.ticketAddress
                  ) * ticketView.seats.length}{" "}
                  BDT
                </div>
              </div>
            )}
            {refundValidator(ticketView) && !ticketView.ticket.refunded && (
              <div
                className=" border-2 border-white bg-blue-500 bg-opacity-75 text-2xl rounded-xl p-2 mt-4 text-center hover:bg-blue-700 hover:bg-opacity-75 cursor-pointer"
                onClick={() => {
                  getRefundHandler(ticketView);
                }}
              >
                Get Refund
              </div>
            )}
            {travelCompleteValidator(ticketView) &&
              !ticketView.ticket.refunded && (
                <div className=" flex justify-between">
                  <BusRateComponent ticketView={ticketView} />
                  <DriverRateComponent ticketView={ticketView} />
                </div>
              )}
            {ticketView.ticket.refunded && (
              <div className=" border-2 border-white bg-gray-500 bg-opacity-75 text-2xl rounded-xl p-2 mt-4 text-center">
                Refunded
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketPage;
