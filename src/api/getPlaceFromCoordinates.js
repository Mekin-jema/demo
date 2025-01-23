// Step 3: Function to reverse geocode the coordinates (using Nominatim API)
const getPlaceNameFromCoordinates = async (lngLat) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lngLat.lat}&lon=${lngLat.lng}&format=json`
    );
    // Extract the place name from the response
    const placeName = response.data.display_name;
    console.log("Place Name:", placeName);
    return placeName;
  } catch (error) {
    console.error("Error fetching place name:", error);
    return "Unknown Location";
  }
};
