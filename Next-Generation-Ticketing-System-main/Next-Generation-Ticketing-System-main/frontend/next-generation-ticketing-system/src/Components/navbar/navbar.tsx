import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserToken } from "../../Token/UserToken";

function Navbar() {
  const {
    authorised,
    setAuthorised,
    userId,
    setUserId,
    userType,
    setUserType,
  } = useContext(UserToken);
  const handleLogout = () => {
    setAuthorised("false");
    setUserType("");
    setUserId("");
  };
  let navigate = useNavigate();

  const handleAdminPanelClick = () => {
    navigate("/admin");
  };

  const handleTicketsClick = () => {
    navigate("/tickets");
  };

  return (
    <nav className="fixed w-full bg-blue-950">
      <div className="flex items-center justify-between">
        <Link to="/home" className="font-bold text-white text-3xl p-1">
          Next Generation Ticketing System
        </Link>
        {authorised === "true" && (
          <div className="flex items-center">
            {userType === "admin" && (
              <button
                className="text-white p-1 bg-blue-500 hover:bg-blue-700 rounded-md me-1"
                onClick={handleAdminPanelClick}
              >
                Admin Panel
              </button>
            )}
            {userType === "admin" && (
              <Link
                to={"/statistics"}
                className="text-white p-1 bg-blue-500 hover:bg-blue-700 rounded-md me-1"
              >
                Statistics
              </Link>
            )}
            {userType === "busDriver" && (
              <Link
                to={"/upcomingRide"}
                className="text-white p-1 bg-blue-500 hover:bg-blue-700 rounded-md me-1"
              >
                Upcoming Ride
              </Link>
            )}
            <button
              className="text-white p-1 bg-blue-500 hover:bg-blue-700 rounded-md me-1"
              onClick={handleTicketsClick}
            >
              Tickets
            </button>
            <Link
              to="/viewReview"
              className="text-white p-1 bg-blue-500 hover:bg-blue-700 rounded-md me-1"
            >
              View Reviews
            </Link>
            <button
              className="text-white p-1 bg-blue-500 hover:bg-blue-700 rounded-md me-1"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
