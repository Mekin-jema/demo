import React from "react";
import { useSelector } from "react-redux";
import maplibregl from "maplibre-gl";
import "../styles/pop.css";

// Import assets
import OriginStep from "../assets/images/origin_step.svg"; // Image for the origin step indicator
import DestinationStep from "../assets/images/destination_step.svg"; // Image for the destination step indicator

// Import constants
import { DIRECTION_ARROWS } from "../constants"; // Arrow constants for directions
// Text-to-Speech Initialization
const synth = window.speechSynthesis;
let voices = [];

function populateVoiceList() {
  voices = synth.getVoices();
}
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = populateVoiceList;
}
populateVoiceList();

// Function to speak a given text
const speakText = (text) => {
  if (synth.speaking) {
    synth.cancel(); // Stop current speech if already speaking
  }
  const utterThis = new SpeechSynthesisUtterance(text);
  utterThis.voice = voices[0]; // Use the first available voice (customize if needed)
  synth.speak(utterThis);
};

// Render Direction Details with Text-to-Speech
const RenderDirectionDetail = ({ map, route }) => {
  console.log(route);
  const { waypoints } = useSelector((state) => state.map);

  const steps = route?.legs[0]?.steps || [];

  // Function to highlight active step and read it aloud
  const handleStepClick = (step) => {
    if (map) {
      // Pan to the step's location
      map.flyTo({
        center: step.maneuver.location,
        essential: true,
        zoom: 15,
      });

      // Create a marker for the current step's location
      new maplibregl.Marker({ color: "blue" })
        .setLngLat(step.maneuver.location)
        .addTo(map);

      // Create a popup for the current step
      new maplibregl.Popup({
        closeButton: false,
        className: "custom-popup",
      })
        .setLngLat(step.maneuver.location)
        .setHTML(
          `<div class="popup-content">
            <strong>Active Segment</strong><br/>
            ${step.name}
          </div>`
        )
        .setOffset([0, -30])
        .addTo(map);

      // Read the step instructions aloud
      speakText(
        `Proceed ${step.distance} meters, then turn ${step.maneuver.modifier} onto ${step.name}.`
      );
    }
  };

  return (
    <div className="z-20 flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between gap-4 my-4">
        <div className="bg-[#215a44] text-white text-center rounded-lg p-2 w-full">
          <p className="text-sm font-semibold">Distance</p>
          <p className="text-lg font-bold">
            {((route?.distance || 0) / 1000)?.toFixed(2)} km
          </p>
        </div>
        <div className="bg-[#215a44] text-white text-center rounded-lg p-2 w-full">
          <p className="text-sm font-semibold">Duration</p>
          <p className="text-lg font-bold">
            {((route?.duration || 0) / 60)?.toFixed(2)} min
          </p>
        </div>
      </div>
      {steps.length > 0 && (
        <div className="divide-y divide-gray-200 max-h-[300px] overflow-y-auto">
          {/* Origin Step */}
          <div className="py-4 text-gray-600 hover:cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <img width={24} alt="Step icon" src={OriginStep} />
              <span className="text-gray-900">{steps[0]?.name}</span>
            </div>
            <span>{steps[0]?.distance} m</span>
          </div>

          {/* Intermediate Steps */}
          {steps.map((step, idx) => {
            if (idx === 0 || idx === steps.length - 1) return null;

            return (
              <div
                key={idx}
                className={`py-4 hover:cursor-pointer ${
                  waypoints.some(
                    (wp) =>
                      wp.latitude === step.maneuver.location[1] &&
                      wp.longitude === step.maneuver.location[0]
                  )
                    ? "bg-blue-100"
                    : ""
                }`}
                onClick={() => handleStepClick(step)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <img
                    width={24}
                    alt="Step icon"
                    src={DIRECTION_ARROWS[step.maneuver.modifier]}
                  />
                  <span className="text-gray-900">{step.name}</span>
                </div>
                <span>{step.distance} m</span>
              </div>
            );
          })}

          {/* Destination Step */}
          <div className="py-4 text-gray-600 hover:cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <img width={24} alt="Step icon" src={DestinationStep} />
              <span className="text-gray-900">
                {steps[steps.length - 1]?.name}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenderDirectionDetail;
