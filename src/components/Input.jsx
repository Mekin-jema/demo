import React, { useState } from "react";
import getPlaces from "../api/getPlaces";
import "../styles/AddressInput.scss";

export default function AddressInput({
  // onManualInputChange,
  setAddress,
  placeholder,
}) {
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
    // onManualInputChange(event); // Trigger the callback to update the parent state
    setInputValue(event.target.value);

    queryPlaces(event.target.value); // Fetch place suggestions
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
    <div className="address-input-container relative w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-lg">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Suggestions list */}
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
