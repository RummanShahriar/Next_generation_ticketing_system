import React, { useContext, useEffect, useState } from "react";
import { UserToken } from "../../Token/UserToken";
import { Link, useNavigate } from "react-router-dom";
import "./adminPanel.css";
import User from "../../Entity/User";
import nameService from "../../Service/NameService";
import AuthService from "../../Service/AuthService";
import DriverService from "../../Service/DriverService";

function AddDriver() {
  const { authorised, userId, userType } = useContext(UserToken);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [errors, setErrors] = useState({
    option: "",
    licenseNumber: "",
    expirationDate: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if (authorised === "false") {
      navigate("/login");
    }
    if (userType !== "admin") {
      navigate("/home");
    }
  }, [authorised, userType, navigate]);

  useEffect(() => {
    validateForm();
  }, [selectedUser, licenseNumber, expirationDate]);

  const validateForm = () => {
    const newErrors = {
      option: selectedUser ? "" : "Select an option",
      licenseNumber: licenseNumber ? "" : "Enter license number",
      expirationDate: expirationDate ? "" : "Select expiration date",
    };

    setErrors(newErrors);

    setIsFormValid(
      !newErrors.option && !newErrors.licenseNumber && !newErrors.expirationDate
    );
  };

  const handleSubmit = () => {
    if (isFormValid) {
      let user: User | undefined;
      for (let i = 0; i < users.length; i++) {
        if (users[i].userId == Number(selectedUser)) {
          user = users[i];
          break;
        }
      }
      if (user != undefined) {
        AuthService.update(user).then((res) => {
          let driver = {
            driverLicenseNo: licenseNumber,
            driverLicenseExp: expirationDate,
            userId: user,
          };
          DriverService.insert(driver).then((res) => {
            setSuccessMessage("Driver added successfully");
            setUsers([]);
            setSelectedUser("");
            setLicenseNumber("");
            setExpirationDate("");
          });
        });
      }
    }
  };

  useEffect(() => {
    nameService.getAllUser().then((res) => {
      let usersTemp: User[] = res.data;
      setUsers(usersTemp);
    });
  }, [successMessage]);

  return (
    <div className="flex justify-center items-center h-screen background_image_admin">
      <div id="main-body" className=" w-1/3 bg-black bg-opacity-75 p-6 rounded">
        <div className="mb-4">
          <label htmlFor="option" className="text-white block">
            Select Option
          </label>
          <select
            id="option"
            className="border p-2 w-full rounded"
            value={selectedUser}
            onChange={(e) => {
              setSelectedUser(e.target.value);
              setSuccessMessage("");
            }}
          >
            <option value="">Select a driver</option>
            {users.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.email}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors.option}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="licenseNumber" className="text-white block">
            License Number
          </label>
          <input
            type="text"
            id="licenseNumber"
            className="border p-2 w-full rounded"
            value={licenseNumber}
            onChange={(e) => {
              setLicenseNumber(e.target.value);
              setSuccessMessage("");
            }}
          />
          <p className="text-red-500 text-sm">{errors.licenseNumber}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="expirationDate" className="text-white block">
            Expiration Date
          </label>
          <input
            type="date"
            id="expirationDate"
            className="border p-2 w-full rounded"
            value={expirationDate}
            onChange={(e) => {
              setExpirationDate(e.target.value);
              setSuccessMessage("");
            }}
          />
          <p className="text-red-500 text-sm">{errors.expirationDate}</p>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className={`bg-blue-500 text-white p-2 rounded ${
              isFormValid ? "" : "cursor-not-allowed opacity-50"
            }`}
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Submit
          </button>
          <Link
            to={"/updateDriverLicence"}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Update Driver Licence
          </Link>
          <Link
            to={"/deleteDriver"}
            className="bg-red-700 text-white p-2 rounded hover:bg-red-900"
          >
            Delete Driver
          </Link>
        </div>

        {successMessage && (
          <p className="text-green-500 text-center mt-4">{successMessage}</p>
        )}
      </div>
    </div>
  );
}

export default AddDriver;
