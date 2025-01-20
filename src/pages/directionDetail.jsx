// Import necessary utilities
// import { highlightRouteSegment } from "./MapUtils";
import "../styles/pop.css";

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
export const renderDirectionDetail = (
  route,
  OriginStep,
  DIRECTION_ARROWS,
  DestinationStep,
  map,
  waypoints,
  maplibregl
) => {
  const steps = route?.legs[0]?.steps || [];

  // Function to highlight active step and read it aloud
  const handleStepClick = (step) => {
    if (map) {
      // Pan to the step's location
      map.flyTo({
        center: step.maneuver.location,
        essential: true, // Ensure smooth animation
        zoom: 15,
      });
      // Create a marker for the current step's location
      new maplibregl.Marker({ color: "blue" })
        .setLngLat(step.maneuver.location) // Set marker position
        .addTo(map);

      // Create a popup for the current step
      new maplibregl.Popup({
        closeButton: false,
        className: "custom-popup",
      })
        .setLngLat(step.maneuver.location)
        .setHTML(
          `
      <div class="popup-content">
        <strong>Active Segment</strong><br/>
        ${step.name}
      </div>
    `
        )
        .setOffset([0, -30]) // Adjust the popup offset
        .addTo(map);

      // Read the step instructions aloud
      // it will speack when the route is clicked in the right side bar
      speakText(
        `Proceed ${step.distance} meters, then turn ${step.maneuver.modifier} onto ${step.name}.`
      );
    }
  };

  return (
    <>
      <div className="summary-info">
        <div className="distance">
          <p>Distance</p>
          <p>{((route?.distance || 0) / 1000)?.toFixed(2)} km</p>
        </div>
        <div className="duration">
          <p>Duration</p>
          <p>{((route?.duration || 0) / 60)?.toFixed(2)} min</p>
        </div>
      </div>
      {steps?.length && (
        <div className="step-list">
          {/* Origin Step */}
          <div className="item">
            <div className="step-name">
              <img width={24} alt="Step icon" src={OriginStep} />
              <span>{steps[0]?.name}</span>
            </div>
            <span>{steps[0]?.distance} m</span>
          </div>

          {/* Intermediate Steps */}
          {steps?.map((step, idx) => {
            if (idx === 0 || idx === steps.length - 1) return null; // Skip origin and destination

            return (
              <div
                className="item"
                onClick={() => handleStepClick(step)} // Highlight and read aloud step
                key={idx}
                style={{
                  backgroundColor: waypoints.some(
                    (wp) =>
                      wp.latitude === step.maneuver.location[1] &&
                      wp.longitude === step.maneuver.location[0]
                  )
                    ? "lightblue"
                    : "",
                }}
              >
                <div className="step-name">
                  <img
                    width={24}
                    alt="Step icon"
                    src={DIRECTION_ARROWS[step.maneuver.modifier]}
                  />
                  <span>{step.name}</span>
                </div>
                <span>{step.distance} m</span>
              </div>
            );
          })}

          {/* Destination Step */}
          <div className="item">
            <div className="step-name">
              <img width={24} alt="Step icon" src={DestinationStep} />
              <span>{steps[steps?.length - 1]?.name}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
