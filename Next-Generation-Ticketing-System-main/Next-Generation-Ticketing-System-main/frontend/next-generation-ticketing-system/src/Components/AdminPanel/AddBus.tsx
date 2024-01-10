import React, { useContext, useEffect, useState } from "react";
import { UserToken } from "../../Token/UserToken";
import { Link, useNavigate } from "react-router-dom";
import "./adminPanel.css";
import BusService from "../../Service/BusService";

function AddBus() {
  const { authorised, userId, userType } = useContext(UserToken);
  const [busNumber, setBusNumber] = useState("");
  const [busType, setBusType] = useState("");
  const [totalSeats, setTotalSeats] = useState("24");
  const [error, setError] = useState("");
  const [busNumberError, setBusNumberError] = useState("");
  const [busTypeError, setBusTypeError] = useState("");
  const [seatError, setSeatError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if (authorised === "false") {
      navigate("/login");
    }
    if (userType !== "admin") {
      navigate("/home");
    }
  }, [authorised, userType]);

  const handleBusNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSuccessMsg("");
    setBusNumber(e.target.value);
    if (e.target.value === "") {
      setBusNumberError("Bus Number is required");
    } else {
      setBusNumberError("");
    }
  };

  const handleBusTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSuccessMsg("");
    setBusType(e.target.value);
    if (e.target.value === "") {
      setBusTypeError("Bus Type is required");
    } else {
      setBusTypeError("");
    }
  };

  const handleTotalSeatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSuccessMsg("");
    const seats = parseInt(e.target.value);
    if (seats > 52 || seats < 24) {
      setError("Total seats must be between 24 and 52");
    } else {
      setError("");
      setTotalSeats(e.target.value);
    }
    if (e.target.value === "") {
      setSeatError("Seat is required");
    } else {
      setSeatError("");
    }
  };

  const handleAddBus = () => {
    BusService.findByBusNo(busNumber).then((res) => {
      if (res.data._embedded.buses.length > 0) {
        setBusNumberError("Bus Already Exists!");
      } else {
        const bus = {
          busNo: busNumber,
          busType: busType,
          busCapacity: totalSeats,
        };
        BusService.insert(bus).then((res) => {
          setBusNumber("");
          setBusType("");
          setTotalSeats("24");
          setSuccessMsg("Bus Added Successfully!");
        });
      }
    });
  };

  function isButtonDisabled() {
    return !!(
      error ||
      busNumberError ||
      busTypeError ||
      seatError ||
      busNumber === "" ||
      busType === "" ||
      totalSeats === ""
    );
  }

  return (
    <div className="flex justify-center items-center h-screen background_image_admin">
      <div className="bg-black bg-opacity-75 p-6 rounded">
        <div className="w-96">
          <input
            type="text"
            placeholder="Bus Number"
            value={busNumber}
            onChange={handleBusNumberChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          {busNumberError && <p className="text-red-500">{busNumberError}</p>}
          <select
            aria-label="Bus Type"
            value={busType}
            onChange={handleBusTypeChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          >
            <option value="">Select Bus Type</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
          </select>
          {busTypeError && <p className="text-red-500">{busTypeError}</p>}
          <input
            type="number"
            placeholder="Total Seats"
            value={totalSeats}
            onChange={handleTotalSeatsChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          {error && <p className="text-red-500">{error}</p>}
          {seatError && <p className="text-red-500">{seatError}</p>}
          <div className="flex justify-between">
            <button
              onClick={handleAddBus}
              className={`w-full py-2 rounded ${
                isButtonDisabled()
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              disabled={isButtonDisabled()}
            >
              Add Bus
            </button>
            {/*<Link*/}
            {/*  to={"/deleteBus"}*/}
            {/*  className=" ms-4 bg-red-700 text-white p-2 rounded hover:bg-red-900"*/}
            {/*>*/}
            {/*  Delete Bus*/}
            {/*</Link>*/}
          </div>
          {successMsg && <p className="text-green-500 mt-4">{successMsg}</p>}
        </div>
      </div>
    </div>
  );
}

export default AddBus;
