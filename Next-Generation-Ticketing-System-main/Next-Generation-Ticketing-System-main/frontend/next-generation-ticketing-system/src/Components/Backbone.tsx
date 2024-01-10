import Navbar from "./navbar/navbar";
import { Outlet } from "react-router-dom";

function Backbone() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Backbone;
