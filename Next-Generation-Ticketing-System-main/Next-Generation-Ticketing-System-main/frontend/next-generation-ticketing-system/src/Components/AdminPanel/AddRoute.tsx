import React, { useContext, useEffect, useState } from "react";
import { UserToken } from "../../Token/UserToken";
import { useNavigate } from "react-router-dom";
import "./adminPanel.css";
import DistrictService from "../../Service/DistrictService";
import District from "../../Entity/District";
import RouteService from "../../Service/RouteService";
import route from "../../Entity/Route";
import RouteDistrictService from "../../Service/RouteDistrictService";
import RouteDistrict from "../../Entity/RouteDistrict";

function AddRoute() {
  const [districts, setDistricts] = useState<District[]>([]);
  const [source, setSource] = useState("Select Source");
  const [sourceDistrict, setSourceDistrict] = useState<District>(
    new District(0, "")
  );
  const [sourceError, setSourceError] = useState("");
  const [currentOrder, setCurrentOrder] = useState(1);
  const [currentRoute, setCurrentRoute] = useState<route>(new route(0));
  const [routeList, setRouteList] = useState<RouteDistrict[]>([]);

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

  useEffect(() => {
    DistrictService.getAllDistricts().then((res) => {
      let districts = res.data._embedded.districts;
      let tempDistricts: District[] = [];
      for (let i = 0; i < districts.length; i++) {
        tempDistricts.push(new District(i + 1, districts[i].distName));
      }
      setDistricts(tempDistricts);
    });
  }, []);

  function isButtonDisabled() {
    return source === "Select Source" || sourceError !== "";
  }

  const sourceChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSource = e.target.value;
    setSource(newSource);
    if (newSource === "Select Source") {
      setSourceError("Please select a source");
    } else {
      setSourceError("");
      setSourceDistrict(districts[Number(newSource) - 1]);
    }
  };

  const sourceAddHandler = () => {
    if (currentOrder === 1) {
      RouteService.insert({}).then((res) => {
        let tempRoute = new route(res.data.routeId);
        setCurrentRoute(tempRoute);
        let routeDistrict = {
          route: tempRoute,
          district: sourceDistrict,
          distOrder: currentOrder,
        };
        setCurrentOrder(currentOrder + 1);
        RouteDistrictService.insert(routeDistrict).then((res) => {
          let tempRouteDistrict: RouteDistrict = new RouteDistrict(
            res.data.routeDistrictId,
            res.data.route,
            res.data.district,
            res.data.distOrder
          );
          let tempRouteList: RouteDistrict[] = [];
          tempRouteList.push(tempRouteDistrict);
          setRouteList(tempRouteList);
        });
      });
    } else {
      let tempRoute = new route(currentRoute.routeId);
      let routeDistrict = {
        route: tempRoute,
        district: sourceDistrict,
        distOrder: currentOrder,
      };
      setCurrentOrder(currentOrder + 1);
      RouteDistrictService.insert(routeDistrict).then((res) => {
        let tempRouteDistrict: RouteDistrict = new RouteDistrict(
          res.data.routeDistrictId,
          res.data.route,
          res.data.district,
          res.data.distOrder
        );
        let tempRouteList: RouteDistrict[] = [...routeList];
        tempRouteList.push(tempRouteDistrict);
        setRouteList(tempRouteList);
      });
    }
  };

  return (
    <div className="flex justify-center h-fit  background_image_admin">
      <div className="w-1/3 bg-black bg-opacity-75 rounded-lg p-6 h-auto mt-10">
        {routeList.map((routeElement) => (
          <div key={routeElement.routeDistrictId} className="font-bold mt-4">
            <label className="text-white pe-2">
              Bus Stop {routeElement.distOrder}:{" "}
              {routeElement.district.distName}
            </label>
          </div>
        ))}
        <div className="text-white font-bold mt-4">
          <label className="text-white pe-2">Bus Stop {currentOrder}: </label>
          <select
            aria-label="source"
            className="p-2 text-black border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={sourceChangeHandler}
          >
            <option className="selected" value="Select Source">
              Select Source
            </option>
            {districts.map((district) => (
              <option key={district.distId} value={district.distId}>
                {district.distName}
              </option>
            ))}
          </select>
          <button
            className={`ms-2 bg-blue-500 text-white rounded px-4 py-2 font-bold ${
              isButtonDisabled() ? "bg-gray-500 cursor-not-allowed" : ""
            }`}
            disabled={isButtonDisabled()}
            onClick={sourceAddHandler}
          >
            Add
          </button>
          <div className="text-red-500 text-xs">{sourceError}</div>
        </div>
      </div>
    </div>
  );
}

export default AddRoute;
