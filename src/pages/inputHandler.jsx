// import { AddCircle } from "@mui/icons-material";
import AddressInput from "../components/Input";
import { renderDirectionDetail } from "./directionDetail";

export const renderAddressBox = (
  waypoints,
  updateWaypoint,
  addWaypoint,
  setOpen,
  route,
  OriginStep,
  DIRECTION_ARROWS,
  DestinationStep,
  map,
  maplibregl
) => (
  <div className="fixed top-3 left-[120px] z-10 bg-white p-3 flex flex-col items-center font-sans w-[400px] h-full  border-2 border-b-slate-400">
    <div className="w-full border-2 border-l-neutral-600">
      {waypoints.map((waypoint, index) => (
        <div
          key={index}
          className="flex items-center gap-1 w-full"
          onMouseEnter={() => setOpen(false)} // Event listener for hover
          onTouchStart={() => setOpen(false)} // For touch devices
        >
          <div className="relative flex flex-col items-center p-3">
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

      <div className="flex items-center gap-3 w-full mt-4 ml-0">
        {waypoints.length >= 2 &&
          waypoints[1].longitude !== null &&
          waypoints[0].lattitude !== null && (
            <div className="flex gap-3">
              <button className=" text-gray-900  rounded-full p-1  ml-3 flex items-center justify-center  border-2 font-bold border-black hover:bg-gray-100  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-4 "
                  onClick={addWaypoint}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>

              <span className="text-lg text-gray-600">Add destination</span>
            </div>
          )}
      </div>
    </div>
    <div className=" w-full h-full   bg-white border-2 border-l-neutral-600 ">
      {renderDirectionDetail(
        route,
        OriginStep,
        DIRECTION_ARROWS,
        DestinationStep,
        map,
        waypoints,
        maplibregl
      )}
    </div>
  </div>
);
