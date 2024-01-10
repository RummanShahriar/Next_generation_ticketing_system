import React, { useContext, useEffect } from "react";
import { UserToken } from "../../Token/UserToken";
import { useNavigate } from "react-router-dom";
import "./adminPanel.css";

function AdminPanel() {
  const { authorised, userId, userType } = useContext(UserToken);
  let navigate = useNavigate();

  useEffect(() => {
    if (authorised === "false") {
      navigate("/login");
    }
    if (userType !== "admin") {
      navigate("/home");
    }
  }, [authorised, userType]);

  const handleAddNewBus = () => {
    navigate("/addBus");
  };
  const handleAddNewRoute = () => {
    navigate("/addRoute");
  };

  const handleAddNewSchedule = () => {
    navigate("/addSchedule");
  };

  const handleAddNewDriver = () => {
    navigate("/addDriver");
  };

  return (
    <div className="flex justify-center items-center h-screen background_image_admin">
      <div className="bg-white bg-opacity-25 rounded-lg p-6">
        <button
          className="w-full block bg-black hover:bg-gray-900 text-white border-2 border-white text-center py-4 px-20 rounded-lg font-bold"
          onClick={handleAddNewDriver}
        >
          Add Driver
        </button>

        <button
          className="mt-2 w-full block bg-black hover:bg-gray-900 text-white border-2 border-white text-center py-4 px-20 rounded-lg font-bold"
          onClick={handleAddNewBus}
        >
          Add new Bus
        </button>

        <button
          className="mt-2 w-full block bg-black hover:bg-gray-900 text-white border-2 border-white text-center py-4 px-20 rounded-lg font-bold"
          onClick={handleAddNewRoute}
        >
          Add new Route
        </button>

        <button
          className="mt-2 w-full block bg-black hover:bg-gray-900 text-white border-2 border-white text-center py-4 px-20 rounded-lg font-bold"
          onClick={handleAddNewSchedule}
        >
          Add new Schedule
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
