export const getOptimizedRouteWithStops = async (waypoints) => {
  if (!waypoints || waypoints.length < 2) {
    throw new Error(
      "At least two waypoints are required to calculate a route."
    );
  }

  try {
    // Construct OSRM URL with multiple waypoints
    const locations = waypoints
      .map((wp) => {
        if (!wp.longitude || !wp.latitude) {
          throw new Error(`Invalid waypoint: ${JSON.stringify(wp)}`);
        }
        return `${wp.longitude},${wp.latitude}`;
      })
      .join(";"); // Join waypoints into a single string
    console.log(locations);
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${locations}?overview=full&geometries=geojson&steps=true`;

    // Log the URL for debugging (optional, remove in production)
    console.log("Fetching route from OSRM:", osrmUrl);

    // Fetch the route data
    const response = await fetch(osrmUrl);
    if (!response.ok) {
      throw new Error(
        `OSRM API Error (Status: ${response.status}): ${response.statusText}`
      );
    }

    // Parse and return the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching the optimized route:", error);
    throw error; // Re-throw the error for further handling
  }
};
