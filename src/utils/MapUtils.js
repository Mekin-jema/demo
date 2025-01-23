import maplibregl from "maplibre-gl";
export const addRouteLayer = (
  map,
  color = "red",
  geometry,
  name,
  thickness,
  setWaypoints,
  waypoints
) => {
  // Remove existing route layer if present
  if (map.getLayer(name)) map.removeLayer(name);
  if (map.getSource(name)) map.removeSource(name);

  // Add new route layer
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

  // Add markers for start and end points of the route
  const markersData = [
    { color: "green", coordinates: geometry[0] }, // Start point
    { color: "red", coordinates: geometry[geometry.length - 1] }, // End point
  ];

  markersData.forEach((markerData, index) => {
    const marker = new maplibregl.Marker({
      color: markerData.color,
      draggable: true,
    })
      .setLngLat(markerData.coordinates)
      .addTo(map);

    // Handle dragging marker and updating route
    marker.on("dragend", () => {
      const lngLat = marker.getLngLat();
      // console.log(lngLat);
      // console.log(index);
      const updatedWaypoints = [...waypoints];
      updatedWaypoints[index] = {
        placeName: "mekin",
        longitude: lngLat.lng,
        latitude: lngLat.lat,
      };
      setWaypoints(updatedWaypoints);

      // Update the route with new waypoints
      const source = map.getSource(name);
      if (source) {
        source.setData({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: waypoints.map((point) => [
              point.longitude,
              point.latitude,
            ]),
          },
        });
      }
    });
    // console.log(waypoints);
  });
};
