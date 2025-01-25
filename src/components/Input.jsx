import React, { useState } from "react";
import getPlaces from "../api/getPlaces";
import { MapPin, Locate, X } from "lucide-react"; // Importing built-in icons

export default function AddressInput({ setAddress, placeholder, index }) {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Fetch suggestions based on user input
  const queryPlaces = async (query) => {
    if (query) {
      const res = await getPlaces(query);
      if (res && res.features) {
        setSuggestions(res.features);
      }
    }
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
    <div className="relative p-2 rounded-xl w-full shadow-lg">
      {/* Map Icon */}
      {index === 0 ? (
        <Locate className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#770E9C] w-5 h-5" />
      ) : (
        <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#770E9C] w-5 h-5" />
      )}

      {/* Input Field */}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full py-2 pl-8 pr-8 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-800"
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
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-md max-h-40 overflow-y-auto z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100"
            >
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
