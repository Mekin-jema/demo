// import { AddCircle } from "@mui/icons-material";
import AddressInput from "../components/Input";
// import "font-awesome/css/font-awesome.min.css";
import { Plus, MapPin } from "lucide-react"; // Importing the necessary icons

export const renderAddressBox = (waypoints, updateWaypoint, addWaypoint) => (
  <div className="absolute top-6 left-[130px] z-10 bg-white p-3 rounded-2xl shadow-lg flex flex-col items-center font-sans w-[392px] max-w-[400px]">
    {waypoints.map((waypoint, index) => (
      <div key={index} className="flex items-center gap-1 w-full">
        <div className="relative flex flex-col items-center">
          <span
            className={`bg-[#770E9C] rounded-full w-[8px] h-[8px] flex items-center justify-center text-white font-semibold`}
          ></span>

          {/* Dotted line for continuity */}
          {index < waypoints.length - 1 && (
            <div className="absolute top-full mt-1 h-8 border-l-2 border-dashed border-gray-400"></div>
          )}
        </div>

        <AddressInput
          index={index}
          setAddress={(address) => updateWaypoint(index, address)}
          placeholder={`${
            index === 0 ? "Starting Address" : `Destination Adress ${index}`
          }`}
          className="w-full bg-gray-100 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    ))}

    <div className="flex items-center gap-3 w-full mt-4">
      {waypoints.length >= 2 &&
        waypoints[1].longitude !== null &&
        waypoints[0].lattitude !== null && (
          <div className="flex gap-3">
            <button className=" text-gray-900  rounded-full p-1  ml-3 flex items-center justify-center  border-2 font-bold border-black hover:bg-gray-100  ">
              <Plus size={20} onClick={addWaypoint} />
            </button>

            <span className="text-lg text-gray-600">Add destination</span>
          </div>
        )}
    </div>
  </div>
);
