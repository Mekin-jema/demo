import React, { useState, useEffect } from "react";
import getPlaces from "../api/getPlaces";
import { MapPin, Locate, X } from "lucide-react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setWaypoints } from "../Redux/MapSlice";

export default function AddressInput({
  setAddress,
  placeholder,
  index,
  location,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState(location || ""); // Initialize with location
  const { waypoints } = useSelector((state) => state.map);

  const dispatch = useDispatch();
  // Sync inputValue with the specific waypoint's placeName
  useEffect(() => {
    setInputValue(location || ""); // Update inputValue when location changes
  }, [location]);

  // Fetch suggestions based on user input
  const queryPlaces = async (query) => {
    if (query) {
      const res = await getPlaces(query);
      if (res && res.features) {
        setSuggestions(res.features);
      }
    }
  };

  const handleDeleteInput = () => {
    const updatedWaypoints = waypoints.filter((waypoint, i) => i !== index);
    dispatch(setWaypoints(updatedWaypoints));
  };

  // Handle user typing in the input field
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    queryPlaces(value); // Fetch place suggestions
  };

  // Handle selection of a suggestion
  const handleSelectSuggestion = ({ place_name, center }) => {
    const address = {
      placeName: place_name,
      longitude: center[0],
      latitude: center[1],
    };
    setAddress(address); // Update the parent state with the selected address
    setSuggestions([]); // Clear suggestions
    setInputValue(place_name);
  };

  return (
    <div className="relative p-2 rounded-sm w-[300px] flex items-center gap-2">
      {/* Map Icon */}
      {index === 0 ? (
        <Locate className="text-[#770E9C] w-5 h-5" />
      ) : (
        <MapPin className="text-[#770E9C] w-5 h-5" />
      )}

      {/* Input Field */}
      <div className="relative flex-grow">
        <input
          type="text"
          value={inputValue} // Controlled input
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full py-2 pl-10 pr-8 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-800"
        />

        {/* Clear Input Icon */}
        {inputValue && (
          <button
            type="button"
            onClick={() => {
              setInputValue("");
              setSuggestions([]);
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Suggestions List */}
        {suggestions.length > 0 && (
          <ul
            className="absolute left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-40 overflow-y-auto z-50"
            style={{ top: "100%" }} // Position the dropdown directly below the input
          >
            {suggestions.map((suggestion, idx) => (
              <li
                key={idx}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100"
              >
                {suggestion.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Delete Input Icon */}
      {waypoints.length > 2 && (
        <button
          type="button"
          onClick={handleDeleteInput}
          className="flex items-center justify-center w-8 h-8 bg-gray-400 rounded-full shadow hover:bg-gray-100 text-white hover:text-red-500"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
