import AddressInput from "../components/Input";
import RenderDirectionDetail from "./directionDetail";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setOpen, setWaypoints } from "../Redux/MapSlice";

const AddressBox = ({ route }) => {
  const dispatch = useDispatch();
  const { waypoints } = useSelector((state) => state.map);

  const addWaypoint = () => {
    const lastWaypoint = waypoints[waypoints.length - 1];
    if (
      !lastWaypoint.placeName ||
      lastWaypoint.longitude === null ||
      lastWaypoint.latitude === null
    ) {
      toast.error(
        "Please complete the previous waypoint before adding a new one.",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
      return;
    }
    dispatch(
      setWaypoints([
        ...waypoints,
        { placeName: "", longitude: null, latitude: null },
      ])
    );
  };

  const updateWaypoint = (index, address) => {
    const updatedWaypoints = [...waypoints];
    updatedWaypoints[index] = address;
    dispatch(setWaypoints(updatedWaypoints));
  };
  return (
    <div className="fixed top-3 left-[120px] z-10 bg-white p-3 flex flex-col items-center font-sans w-[400px] h-full border-2 border-b-slate-400">
      <div className="w-full border-2 border-l-neutral-600">
        {/* Render each waypoint */}
        {waypoints.map((waypoint, index) => (
          <div
            key={index}
            className="flex items-center gap-1 w-full"
            onMouseEnter={() => setOpen(false)}
            onTouchStart={() => setOpen(false)}
          >
            <div className="relative flex flex-col items-center p-3">
              {/* Circular marker */}
              <span
                className={`bg-[#770E9C] rounded-full w-[8px] h-[8px] flex items-center justify-center text-white font-semibold`}
              ></span>
              {/* Dotted line for intermediate waypoints */}
              {index < waypoints.length - 1 && (
                <div className="absolute top-full mt-1 h-8 border-l-2 border-dashed border-gray-400"></div>
              )}
            </div>
            {/* Address input field */}
            <AddressInput
              location={waypoint.placeName}
              index={index}
              waypoint={waypoint}
              setAddress={(address) => updateWaypoint(index, address)}
              placeholder={
                index === 0
                  ? "Starting Address"
                  : `Destination Address ${index}`
              }
              className="w-full bg-gray-100 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Add destination button */}
        <div className="flex items-center gap-3 w-full mt-4 ml-0">
          {waypoints.length >= 2 &&
            waypoints[1].longitude !== null &&
            waypoints[0].latitude !== null && (
              <div className="flex gap-3">
                <button
                  className="text-gray-900 rounded-full p-1 ml-3 flex items-center justify-center border-2 font-bold border-black hover:bg-gray-100"
                  onClick={addWaypoint}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-4"
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

      {/* Direction details */}
      <div className="w-full h-full bg-white border-2 border-l-neutral-600">
        <RenderDirectionDetail route={route} />
      </div>
    </div>
  );
};

export default AddressBox;
