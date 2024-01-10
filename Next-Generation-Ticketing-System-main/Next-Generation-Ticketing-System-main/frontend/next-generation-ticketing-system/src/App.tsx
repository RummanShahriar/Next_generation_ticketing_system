import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Components/auth/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Backbone from "./Components/Backbone";
import Signup from "./Components/auth/signup";
import { UserToken } from "./Token/UserToken";
import Homepage from "./Components/Homepage/Homepage";
import Cookies from "js-cookie";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import AddBus from "./Components/AdminPanel/AddBus";
import AddRoute from "./Components/AdminPanel/AddRoute";
import AddSchedule from "./Components/AdminPanel/AddSchedule";
import BuyTicket from "./Components/BuyTicket/BuyTicket";
import TicketPage from "./Components/TicketPage/TicketPage";
import BusReviewPage from "./Components/ReviewPage/BusReviewPage";
import DriverReviewPage from "./Components/ReviewPage/DriverReviewPage";
import AddDriver from "./Components/AdminPanel/AddDriver";
import UpdateDriverLicence from "./Components/AdminPanel/UpdateDriverLicence";
import DeleteDriver from "./Components/AdminPanel/DeleteDriver";
import DeleteBus from "./Components/AdminPanel/DeleteBus";
import UpcomingRide from "./Components/UpcomingRide/UpcomingRide";
import Statistics from "./Components/Statistics/Statistics";
import ViewReview from "./Components/ReviewPage/ViewReview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Backbone />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/home", element: <Homepage /> },
      { path: "/homepage", element: <Homepage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/admin", element: <AdminPanel /> },
      { path: "/addBus", element: <AddBus /> },
      { path: "/addRoute", element: <AddRoute /> },
      { path: "/addSchedule", element: <AddSchedule /> },
      { path: "/addDriver", element: <AddDriver /> },
      { path: "/buyTicket", element: <BuyTicket /> },
      { path: "/tickets", element: <TicketPage /> },
      { path: "/busReview", element: <BusReviewPage /> },
      { path: "/driverReview", element: <DriverReviewPage /> },
      { path: "/updateDriverLicence", element: <UpdateDriverLicence /> },
      { path: "/deleteDriver", element: <DeleteDriver /> },
      { path: "/deleteBus", element: <DeleteBus /> },
      { path: "/upcomingRide", element: <UpcomingRide /> },
      { path: "/upcomingRide", element: <UpcomingRide /> },
      { path: "/statistics", element: <Statistics /> },
      { path: "/viewReview", element: <ViewReview /> },
    ],
  },
]);

function App() {
  const [authorised, setAuthorised] = useState(
    () => Cookies.get("authorised") || "false"
  );
  const [userId, setUserId] = useState(() => Cookies.get("userId") || "");
  const [userType, setUserType] = useState(() => Cookies.get("userType") || "");

  useEffect(() => {
    Cookies.set("authorised", authorised);
    Cookies.set("userId", userId);
    Cookies.set("userType", userType);
  }, [authorised, userId, userType]);

  return (
    <UserToken.Provider
      value={{
        authorised,
        setAuthorised,
        userId,
        setUserId,
        userType,
        setUserType,
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </UserToken.Provider>
  );
}

export default App;
