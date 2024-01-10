import React, { useContext, useEffect, useState } from "react";
import { UserToken } from "../../Token/UserToken";
import { useNavigate } from "react-router-dom";
import User from "../../Entity/User";
import AuthService from "../../Service/AuthService";
import DriverService from "../../Service/DriverService";
import "./adminPanel.css";

function UpdateDriverLicence() {
  const { authorised, userId, userType } = useContext(UserToken);
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [errors, setErrors] = useState<{
    option: string;
    expirationDate: string;
  }>({ option: "", expirationDate: "" });
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (authorised === "false") {
      navigate("/login");
    }
    if (userType !== "admin") {
      navigate("/home");
    }

    AuthService.getAllDriver().then((res) => {
      setUsers(res.data);
    });
  }, [authorised, userType, navigate, users]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      option: value ? "" : "Option is required",
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setExpirationDate(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      expirationDate:
        value && new Date(value) > new Date() ? "" : "Invalid expiration date",
    }));
  };

  const handleSubmit = () => {
    const newErrors: { option: string; expirationDate: string } = {
      option: "",
      expirationDate: "",
    };

    if (!selectedOption) {
      newErrors.option = "Option is required";
    }

    if (!expirationDate || new Date(expirationDate) <= new Date()) {
      newErrors.expirationDate = "Invalid expiration date";
    }

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => !!error)) {
      let user = users.find(
        (user) => user.userId.toString() === selectedOption
      );
      let driver = {
        driverLicenseNo: "",
        driverLicenseExp: expirationDate,
        userId: user,
      };
      DriverService.updateExp(driver).then((res) => {
        setSuccess(true);
        setSelectedOption("");
        setExpirationDate("");
        setUsers([]);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen background_image_admin">
      <div id="main-body" className="w-1/3 bg-black bg-opacity-75 p-6 rounded">
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Select a Driver
          </label>
          <select
            aria-label="Select a Driver"
            value={selectedOption}
            onChange={handleOptionChange}
            className={`block appearance-none w-full bg-gray-200 border ${
              errors.option ? "border-red-500" : "border-gray-200"
            } text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
          >
            <option value="">Select a Driver</option>
            {users.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.email}
              </option>
            ))}
          </select>
          {errors.option && (
            <p className="text-red-500 text-xs italic">{errors.option}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            License Expiration Date
          </label>
          <input
            aria-label="Select a Date"
            type="date"
            value={expirationDate}
            onChange={handleDateChange}
            className={`w-full bg-gray-200 border ${
              errors.expirationDate ? "border-red-500" : "border-gray-200"
            } text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
          />
          {errors.expirationDate && (
            <p className="text-red-500 text-xs italic">
              {errors.expirationDate}
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Submit
        </button>
        {success && (
          <p className="text-green-500 text-xs italic mt-2">
            Driver license expiration date updated successfully
          </p>
        )}
      </div>
    </div>
  );
}

export default UpdateDriverLicence;
