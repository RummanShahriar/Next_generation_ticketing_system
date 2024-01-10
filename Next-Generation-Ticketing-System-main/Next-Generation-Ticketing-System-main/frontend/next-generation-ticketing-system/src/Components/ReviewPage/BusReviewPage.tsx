import React, { useContext, useEffect, useState } from "react";
import "./busReviewPage.css";
import { UserToken } from "../../Token/UserToken";
import { useLocation, useNavigate } from "react-router-dom";
import TicketView from "../../Entity/CustomEntity/TicketView";
import BusReviewService from "../../Service/BusReviewService";

function BusReviewPage() {
  const [reviewPoint, setReviewPoint] = useState<number | null>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [reviewPointError, setReviewPointError] = useState<string | null>(null);
  const [reviewTextError, setReviewTextError] = useState<string | null>(null);
  const [ticketView, setTicketView] = useState<TicketView>();
  const [reviewComplete, setReviewComplete] = useState<boolean>(false);

  const { authorised, userId, userType } = useContext(UserToken);
  let navigate = useNavigate();
  useEffect(() => {
    if (authorised === "false") {
      navigate("/login");
    }
  }, [authorised]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jsonString = searchParams.get("data") || "";

  useEffect(() => {
    if (jsonString === "") {
      navigate("/home");
      return;
    }
    const data = JSON.parse(decodeURIComponent(jsonString));
    const ticketViewTemp = data.ticketView;
    setTicketView(ticketViewTemp);
  }, [jsonString]);

  const handleReviewPointChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const floatValue = parseFloat(value);
    setReviewPoint(
      isNaN(floatValue) || floatValue < 0 || floatValue > 5 ? null : floatValue
    );
    setReviewPointError(
      isNaN(floatValue) || floatValue < 0 || floatValue > 5
        ? "Review point should be a decimal between 0 and 5"
        : null
    );
  };

  const getReviewPointColor = (value: number | null): string => {
    if (value === null) {
      return "";
    }
    const red = Math.round(255 - (value / 5) * 255);
    const green = Math.round((value / 5) * 255);
    return `rgb(${red}, ${green}, 0)`;
  };

  const handleReviewTextChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(value);
    setReviewTextError(
      value.length > 1024
        ? "Review text should be maximum 1024 characters long"
        : null
    );
  };

  const handleDragStart = (event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
  };

  const isSubmitDisabled =
    !reviewText || !!reviewPointError || !!reviewTextError;

  const handleSubmit = () => {
    if (ticketView) {
      let busReview = {
        reviewPoint: reviewPoint,
        reviewText: reviewText,
        reviewDate: new Date(),
        reviewer: ticketView.ticket.user,
        bus: ticketView.busSchedule.bus,
        ticket: ticketView.ticket,
      };
      BusReviewService.insert(busReview).then((res) => {
        setReviewComplete(true);
      });
    }
    setReviewPoint(null);
    setReviewText("");
    setReviewPointError(null);
    setReviewTextError(null);
  };

  return (
    <div className="flex justify-center items-center h-screen background_image_bus_review body_design">
      <div
        id="main-div"
        className="w-1/3 p-6 mt-10 bg-black bg-opacity-75 rounded-lg text-white"
      >
        {reviewComplete ? (
          <div className="flex flex-col items-center">
            <div className="p-2 rounded text-2xl block text-white font-bold">
              Thank You for the feedback
            </div>
            <button
              onClick={() => navigate("/tickets")}
              className="flex-grow font-bold mt-6 rounded block p-2 bg-blue-700 hover:bg-blue-800 border-2 border-white"
            >
              Okay
            </button>
          </div>
        ) : (
          <>
            <div className="block mb-4  text-white font-bold text-3xl">
              Leave a review for:{" "}
              <span className="text-indigo-700">
                {ticketView?.busSchedule.bus.busNo}
              </span>
            </div>
            <div className="text-black font-bold">
              <label htmlFor="review-point" className="block mb-2 text-white">
                Review Point:
              </label>
              <input
                type="number"
                id="review-point"
                className="border border-gray-300 p-2 w-full rounded"
                step="0.1"
                min="0"
                max="5"
                value={reviewPoint !== null ? reviewPoint.toString() : ""}
                onChange={handleReviewPointChange}
                style={{ color: getReviewPointColor(reviewPoint) }}
              />
              {reviewPointError && (
                <p className="text-red-500">{reviewPointError}</p>
              )}
            </div>
            <div className="mt-4 text-black font-bold">
              <label htmlFor="review-text" className="block mb-2 text-white">
                Review Text:
              </label>
              <textarea
                id="review-text"
                className="border border-gray-300 p-2 w-full h-80 resize-none rounded"
                maxLength={1024}
                value={reviewText}
                onChange={handleReviewTextChange}
                onDragStart={handleDragStart}
              />
              {reviewTextError && (
                <p className="text-red-500">{reviewTextError}</p>
              )}
            </div>
            <div className="mt-4">
              <button
                type="button"
                className={`${
                  isSubmitDisabled
                    ? "hover:bg-gray-500 bg-gray-500"
                    : "bg-blue-700 hover:bg-blue-800"
                } text-white p-2 rounded block w-full font-bold`}
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BusReviewPage;
