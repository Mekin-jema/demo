import React, { useState, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [pois, setPois] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    {
      name: "Restaurants",
      tag: "amenity=restaurant",
      icon: "restaurant",
      iconUrl: "/icons/restaurant.png",
    },
    {
      name: "Hotels",
      tag: "tourism=hotel",
      icon: "hotel",
      iconUrl: "/icons/hotel.png",
    },
    {
      name: "Grocery Stores",
      tag: "shop=supermarket",
      icon: "supermarket",
      iconUrl: "/icons/supermarket.png",
    },
    {
      name: "Parks",
      tag: "leisure=park",
      icon: "park",
      iconUrl: "/icons/park.png",
    },
    {
      name: "Fuel Stations",
      tag: "amenity=fuel",
      icon: "fuel",
      iconUrl: "/icons/fuel.png",
    },
  ];

  useEffect(() => {
    // Initialize MapLibre GL JS Map
    const mapInstance = new maplibregl.Map({
      container: "map", // ID of the container element
      style: "https://demotiles.maplibre.org/style.json", // MapLibre demo style
      center: [38.74, 9.03], // Initial center [lng, lat]
      zoom: 14, // Initial zoom level
    });

    mapInstance.addControl(new maplibregl.NavigationControl(), "top-right");

    // Listen for the "styleimagemissing" event
    mapInstance.on("styleimagemissing", (e) => {
      const missingImageId = e.id;
      const category = categories.find((cat) => cat.icon === missingImageId);
      if (category) {
        const img = new Image();
        img.src = category.iconUrl;
        img.onload = () => {
          mapInstance.addImage(missingImageId, img);
        };
      }
    });

    setMap(mapInstance);

    return () => {
      if (mapInstance) mapInstance.remove(); // Cleanup on unmount
    };
  }, []);

  const fetchPOIs = async (categoryTag, center, icon) => {
    setLoading(true);
    const [lng, lat] = center;
    const radius = 5000; // Search radius in meters (5km)

    const query = `
      [out:json];
      (
        node[${categoryTag}](around:${radius},${lat},${lng});
        way[${categoryTag}](around:${radius},${lat},${lng});
        relation[${categoryTag}](around:${radius},${lat},${lng});
      );
      out center;
    `;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
      query
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const pois = data.elements.map((element) => ({
        id: element.id,
        name: element.tags.name || "Unknown",
        lat: element.lat || element.center?.lat,
        lng: element.lon || element.center?.lon,
        icon, // Attach the icon
      }));
      setPois(pois);
    } catch (error) {
      console.error("Error fetching POIs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    if (!map || loading) return;

    setActiveCategory(category.name);

    const center = map.getCenter().toArray(); // Get the current map center [lng, lat]
    fetchPOIs(category.tag, center, category.icon);
  };

  useEffect(() => {
    if (!map || pois.length === 0) return;

    // Remove the existing layer and source if already added
    if (map.getSource("pois")) {
      map.removeLayer("poi-icons");
      map.removeSource("pois");
    }

    // Add POIs to the map as a source
    map.addSource("pois", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: pois.map((poi) => ({
          type: "Feature",
          properties: {
            icon: poi.icon,
            name: poi.name,
          },
          geometry: {
            type: "Point",
            coordinates: [poi.lng, poi.lat],
          },
        })),
      },
    });

    // Add a layer to render the icons
    map.addLayer({
      id: "poi-icons",
      type: "symbol",
      source: "pois",
      layout: {
        "icon-image": ["get", "icon"], // Use the icon property from the source
        "icon-size": 0.05, // Adjust the size of the icons
        "icon-allow-overlap": true,
        "text-field": ["get", "name"], // Display the name of the POI
        "text-offset": [0, 1.5],
        "text-anchor": "top",
        "text-size": 12,
      },
    });
  }, [pois]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Control Panel */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#f9f9f9",
          borderBottom: "1px solid #ddd",
        }}
      >
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category)}
            style={{
              margin: "0 5px",
              padding: "8px 12px",
              border: "none",
              backgroundColor:
                activeCategory === category.name ? "#0078d4" : "#e0e0e0",
              color: activeCategory === category.name ? "#fff" : "#000",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            disabled={loading}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div id="map" style={{ flex: 1 }}></div>
    </div>
  );
};

export default MapComponent;
