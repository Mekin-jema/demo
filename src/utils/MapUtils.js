import maplibregl from "maplibre-gl";

export const addRouteLayer = (
  map,
  color = "red",

  geometry,
  name,
  thickness
  // maplibregl
) => {
  // Remove the previous route layer before adding a new one
  if (map.getLayer(name)) map.removeLayer(name);
  if (map.getSource(name)) map.removeSource(name);

  // Add the normal route layer (default path)
  map.addSource(name, {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: geometry,
      },
    },
  });

  map.addLayer({
    id: name,
    type: "line",
    source: name,
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": color,
      "line-width": thickness,
    },
  });

  const markersData = [
    {
      color: "green",
      coordinates: geometry[0],
    },
    {
      color: "red",
      coordinates: geometry[geometry.length - 1],
    },
  ];

  markersData.forEach((markerData) => {
    new maplibregl.Marker({ color: markerData.color })
      .setLngLat(markerData.coordinates)
      .addTo(map);
  });
};

// // Function to highlight the active step in the route
// export const highlightRouteSegment = (map, step, routeLayerName) => {
//   if (map) {
//     // Check if the route layer exists
//     if (map.getLayer(routeLayerName)) {
//       // Update the route color to highlight the active step
//       map.setPaintProperty(routeLayerName, "line-color", [
//         "case",
//         ["==", ["get", "id"], step.id], // Compare step id to route feature id
//         "pink", // Highlight color for the active step
//         "#008CBA", // Default color for the route
//       ]);

//       // Trigger repaint to reflect the changes
//       map.triggerRepaint();
//     }
//   }
// };
