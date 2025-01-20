// import { AddCircle } from "@mui/icons-material";
import AddressInput from "../Components/Input";
import "font-awesome/css/font-awesome.min.css";

export const renderAddressBox = (waypoints, updateWaypoint, addWaypoint) => (
  <div className="absolute top-6 left-4 z-10 bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center font-sans w-[90%] max-w-[500px]">
    {waypoints.map((waypoint, index) => (
      <div key={index} className="flex items-center gap-3 w-full">
        <div className="relative flex flex-col items-center">
          <span
            className={`${
              index === 0
                ? "bg-[#00c853]" // Origin color (Green)
                : index === waypoints.length - 1
                ? "bg-[#ff3d17]" // Destination color (Red)
                : "bg-[#f4a261]" // Waypoint color (Yellow-Orange)
            } rounded-full w-8 h-8 flex items-center justify-center text-white font-semibold`}
          >
            {index + 1}
          </span>

          {/* Dotted line for continuity */}
          {index < waypoints.length - 1 && (
            <div className="absolute top-full mt-1 h-8 border-l-2 border-dashed border-gray-400"></div>
          )}
        </div>

        <AddressInput
          setAddress={(address) => updateWaypoint(index, address)}
          placeholder={`Waypoint ${index + 1}`}
          className="w-full bg-gray-100 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    ))}

    <div className="flex items-center gap-3 w-full mt-4">
      {waypoints.length >= 2 &&
        waypoints[1].longitude !== null &&
        waypoints[0].lattitude !== null && (
          <div className="flex gap-3">
            <button
              className="bg-[#00c853] text-white text-[18px] rounded-full p-2 flex items-center justify-center hover:bg-[#007b3d] focus:outline-none focus:ring-2 focus:ring-[#00c853] transition-all duration"
              onClick={addWaypoint}
            >
              <i className="fa fa-plus"></i>
            </button>

            <span className="text-lg text-gray-600">Add more waypoints</span>
          </div>
        )}
    </div>
  </div>
);
