import React, { useContext, useEffect, useState } from "react";
import { UserToken } from "../../Token/UserToken";
import { useNavigate } from "react-router-dom";
import "./../Homepage/homepage.css";
import DriverReview from "../../Entity/DriverReview";
import BusReview from "../../Entity/BusReview";
import Bus from "../../Entity/Bus";
import Name from "../../Entity/Name";
import nameService from "../../Service/NameService";
import BusService from "../../Service/BusService";
import DriverReviewService from "../../Service/DriverReviewService";
import BusReviewService from "../../Service/BusReviewService";

function ViewReview() {
  const { authorised, userId, userType } = useContext(UserToken);
  const navigate = useNavigate();

  const [leftOptions, setLeftOptions] = useState<Name[]>([]);
  const [rightOptions, setRightOptions] = useState<Bus[]>([]);

  const [leftSelectedOption, setLeftSelectedOption] = useState("");
  const [rightSelectedOption, setRightSelectedOption] = useState("");

  const [leftReview, setLeftReview] = useState<DriverReview[]>([]);
  const [rightReview, setRightReview] = useState<BusReview[]>([]);

  const handleLeftSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLeftSelectedOption(event.target.value);
  };

  const handleRightSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRightSelectedOption(event.target.value);
  };

  const isLeftFindButtonDisabled = !leftSelectedOption.trim(); // You can customize the condition based on your validation logic
  const isRightFindButtonDisabled = !rightSelectedOption.trim(); // You can customize the condition based on your validation logic

  const handleLeftFindButtonClick = () => {
    let user = leftOptions.find(
      (option) => option.user.userId === Number(leftSelectedOption)
    )?.user;
    if (user) {
      DriverReviewService.getDriverReview(user).then((response) => {
        setLeftReview(response.data);
      });
    }
  };

  const handleRightFindButtonClick = () => {
    let bus = rightOptions.find(
      (option) => option.busNo === rightSelectedOption
    );
    if (bus) {
      BusReviewService.getBusReview(bus).then((response) => {
        setRightReview(response.data);
      });
    }
  };

  useEffect(() => {
    if (authorised === "false") {
      navigate("/login");
    }

    nameService.getAllDriver().then((response) => {
      setLeftOptions(response.data);
    });

    BusService.getAllBus().then((response) => {
      setRightOptions(response.data);
    });
  }, [authorised, userType]);

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

  const getReviewPointColor = (value: number | null): string => {
    if (value === null) {
      return "";
    }
    const red = Math.round(255 - (value / 5) * 255);
    const green = Math.round((value / 5) * 255);
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <div className="flex justify-center h-screen background_image_homepage body_design">
      <div className="flex w-1/2 p-6 mt-16  gap-x-10">
        <div
          id="left"
          className=" w-full p-4 bg-black bg-opacity-75 text-white font-bold text-lg rounded-2xl"
        >
          <div className="flex items-center mb-4">
            <select
              aria-label="Select"
              value={leftSelectedOption}
              onChange={handleLeftSelectChange}
              className="p-2 w-96 text-black"
            >
              <option value="">Select a driver</option>
              {leftOptions.map((option, index) => (
                <option key={index} value={option.user.userId}>
                  {option.firstName} {option.lastName} [{option.user.email}]
                </option>
              ))}
            </select>
            <button
              onClick={handleLeftFindButtonClick}
              disabled={isLeftFindButtonDisabled}
              className={`bg-blue-500 text-white p-2 ml-2 rounded ${
                isLeftFindButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Find
            </button>
          </div>
          {leftReview.map((review, index) => (
            <div
              key={index}
              className="flex flex-col mb-2 border-2 border-teal-500 p-2 rounded"
            >
              <div>Date: {formatTime(review.reviewDate)}</div>
              <div className="flex justify-between">
                <div className="flex">
                  <div>Reviewer:</div>
                  <div className="ml-2 text-blue-500">
                    {review.reviewer.email}
                  </div>
                </div>
                <div className="flex">
                  <div>Rating:</div>
                  <div
                    className="ml-2"
                    style={{ color: getReviewPointColor(review.reviewPoint) }}
                  >
                    {review.reviewPoint}
                  </div>
                </div>
              </div>
              <div>
                <div>Comment:</div>
                <div className="m-2 font-normal">{review.reviewText}</div>
              </div>
            </div>
          ))}
        </div>
        <div
          id="right"
          className=" w-full p-4 bg-black bg-opacity-75 text-white font-bold text-lg rounded-2xl"
        >
          <div className="flex items-center mb-4">
            <select
              aria-label="Select2"
              value={rightSelectedOption}
              onChange={handleRightSelectChange}
              className="p-2 w-96 text-black"
            >
              <option value="">Select a bus</option>
              {rightOptions.map((option, index) => (
                <option key={index} value={option.busNo}>
                  {option.busNo} [{option.busType}] [{option.busCapacity}]
                </option>
              ))}
            </select>
            <button
              onClick={handleRightFindButtonClick}
              disabled={isRightFindButtonDisabled}
              className={`bg-blue-500 text-white p-2 ml-2 rounded ${
                isRightFindButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Find
            </button>
          </div>
          {rightReview.map((review, index) => (
            <div
              key={index}
              className="flex flex-col mb-2 border-2 border-teal-500 p-2 rounded"
            >
              <div>Date: {formatTime(review.reviewDate)}</div>
              <div className="flex justify-between">
                <div className="flex">
                  <div>Reviewer:</div>
                  <div className="ml-2 text-blue-500">
                    {review.reviewer.email}
                  </div>
                </div>
                <div className="flex">
                  <div>Rating:</div>
                  <div
                    className="ml-2"
                    style={{ color: getReviewPointColor(review.reviewPoint) }}
                  >
                    {review.reviewPoint}
                  </div>
                </div>
              </div>
              <div>
                <div>Comment:</div>
                <div className="m-2 font-normal">{review.reviewText}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewReview;
