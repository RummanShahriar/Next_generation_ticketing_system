import React, { useState, useEffect, useContext } from "react";
import "./adminPanel.css";
import { UserToken } from "../../Token/UserToken";
import { useNavigate } from "react-router-dom";
import AuthService from "../../Service/AuthService";
import User from "../../Entity/User";
import UserService from "../../Service/UserService";

function DeleteDriver() {
  const { authorised, userId, userType } = useContext(UserToken);
  const navigate = useNavigate();

  const [initialOptions, setInitialOptions] = useState<User[]>([]);

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (authorised === "false") {
      navigate("/login");
    }
    if (userType !== "admin") {
      navigate("/home");
    }

    AuthService.getAllDriver().then((res) => {
      setInitialOptions(res.data);
    });
  }, [authorised, userType, navigate, selectedOption]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    setError(null);
  };

  const handleDelete = () => {
    if (selectedOption === "") {
      setError("Please select a Driver");
      return;
    }

    AuthService.deleteDriver(selectedOption).then((res) => {
      setSuccessMessage(`Successfully deleted Driver`);

      setSelectedOption("");
    });
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (successMessage) {
      timeoutId = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [successMessage]);

  return (
    <div className="flex justify-center items-center h-screen background_image_admin">
      <div id="main-body" className="w-1/3 bg-black bg-opacity-75 p-6 rounded">
        <label className="block text-white">Select a Driver:</label>
        <select
          aria-label="Select a Driver"
          value={selectedOption}
          onChange={handleOptionChange}
          className="w-full p-2 mt-2 border rounded"
        >
          <option value="">Select a Driver</option>
          {initialOptions.map((driver) => (
            <option key={driver.userId} value={driver.userId}>
              {driver.email}
            </option>
          ))}
        </select>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          onClick={handleDelete}
          disabled={!selectedOption}
          className={`w-full mt-4 p-2 bg-red-500 rounded ${
            !selectedOption && "cursor-not-allowed opacity-50"
          }`}
        >
          Delete
        </button>

        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
      </div>
    </div>
  );
}

export default DeleteDriver;
