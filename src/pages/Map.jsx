import { PMTiles, Protocol } from "pmtiles";

import { styles } from "../utils/styles";

//
// Import React hooks
import { useEffect, useRef, useState } from "react";

// Import MapLibre GL library and styles
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css"; // MapLibre core styles

// Import API functions
import { getRouteInfo } from "../api/getRouteInfo"; // Function to fetch route information
import { getShortestRoute } from "../api/getShortestRoute"; // Function to fetch the shortest route
import { getDefaultRoute } from "../api/getValhallaRoute"; // Function to fetch the default route (Valhalla)
import { getOptimizedRouteWithStops } from "../api/getOptimizedRouteWithStops";

// Import utility functions
import decodePolyline from "../utils/decoder"; // Utility for decoding polylines
import RenderDirectionDetail from "./inputHandler"; // Utility for rendering address input fields
import { addRouteLayer } from "../utils/MapUtils"; // Utility for adding route layers to the map
// for toastin purpouse
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//

import { useSelector, useDispatch } from "react-redux";
import { setWaypoints } from "../Redux/MapSlice";
import categories from "../utils/category";

const Map = () => {
  // Refs for map container and instance
  const [route, setRoute] = useState(null);
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  const [pois, setPois] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { waypoints } = useSelector((state) => state.map);

  useEffect(() => {
    if (mapInstance.current) return; // Prevent re-initialization if map already exists

    // Register PMTiles protocol with MapLibre
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    // Initialize PMTiles source
    const pmtiles = new PMTiles("map.pmtiles");

    pmtiles
      .getHeader()
      .then((header) => {
        // console.log("Header information:", header); // Log header information
        protocol.add(pmtiles); // Register PMTiles with protocol

        // Create and configure the map instance
        mapInstance.current = new maplibregl.Map({
          container: mapContainer.current, // Container for the map
          style: styles,
          center: [header.centerLon, header.centerLat], // Center from PMTiles metadata
          zoom: 14, // Initial zoom level
        });

        // Add navigation controls (zoom in/out)
        mapInstance.current.addControl(
          new maplibregl.NavigationControl(),
          "bottom-right"
        );
        // Add fullscreen control
        mapInstance.current.addControl(
          new maplibregl.FullscreenControl(),
          "bottom-right"
        );

        // Add satellite view switcher button
        const layerSwitcher = document.createElement("div");
        layerSwitcher.className = "maplibregl-ctrl maplibregl-ctrl-group";
        const satelliteButton = document.createElement("button");
        satelliteButton.innerHTML = "\ud83d\udef0\ufe0f"; // Satellite emoji
        satelliteButton.onclick = () => {
          const currentStyle = mapInstance.current.getStyle().name;
          const satelliteStyle = styles.satelite;
          const defaultStyle = styles.default;
          mapInstance.current.setStyle(
            currentStyle === "Bright" ? satelliteStyle : defaultStyle
          );
        };
        layerSwitcher.appendChild(satelliteButton);
        mapInstance.current.addControl(
          { onAdd: () => layerSwitcher, onRemove: () => {} },
          "bottom-right"
        );
        // Add marker at Addis Ababa
        const marker = new maplibregl.Marker({
          color: "#4285F4", // Marker color
          draggable: true, // Enable drag functionality
        })
          .setLngLat([38.7626, 9.0404]) // Set initial coordinates
          .addTo(mapInstance.current); // Add marker to the map
        // Listen for the "styleimagemissing" event

        // Listen for the "styleimagemissing" event to handle missing icons
        mapInstance.current.on("styleimagemissing", (e) => {
          // console.log(e);
          const missingImageId = e.id;
          const category = categories.find(
            (cat) => cat.icon === missingImageId
          );

          // If category found and image is not already added
          if (category && !mapInstance.current.hasImage(missingImageId)) {
            const img = new Image();
            img.src = category.iconUrl;
            img.onload = () => {
              // Add the image to the map once it's loaded
              mapInstance.current.addImage(missingImageId, img);
            };
          }
        });

        // // Load icons for POIs

        function onDragEnd() {
          const lngLat = marker.getLngLat();
          // console.log(`Longitude: ${lngLat.lng}, Latitude: ${lngLat.lat}`); // Log coordinates
          // You can update other UI elements here
        }

        // Listen for drag end event
        marker.on("dragend", onDragEnd);

        // Popup for marker
        const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
          "<h3>Addis Ababa Ethiopia</h3>"
        );
        marker.setPopup(popup);

        // Add geolocation control to track user's location
        mapInstance.current.addControl(
          new maplibregl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
            showUserHeading: true,
          }),
          "bottom-right"
        );
        setMap(mapInstance.current);
      })

      .catch((error) => {
        console.error("Error loading PMTiles:", error);
      });
    // Cleanup the map when component unmounts
    return () => mapInstance.current?.remove();
  }, []);
  useEffect(() => {
    if (!map || !waypoints[0].latitude || !waypoints[1].longitude) return;

    const fetchRoutes = async () => {
      console.log("waypoints", waypoints);
      const coordinates = waypoints.slice(0, 2);

      try {
        if (waypoints.length <= 2) {
          const [routeInfo, shortestRoute, valhallaRoute] = await Promise.all([
            getRouteInfo(coordinates),
            getShortestRoute(coordinates),
            getDefaultRoute(coordinates),
          ]);
          console.log(routeInfo, shortestRoute, valhallaRoute);

          if (routeInfo?.routes?.length > 0) {
            // console.log(routeInfo.routes[0]);
            setRoute(routeInfo.routes[0]);
          }

          if (shortestRoute?.routes?.length > 0) {
            addRouteLayer(
              map,
              "blue",
              shortestRoute.routes[0].geometry.coordinates,
              "route1",
              10,

              setWaypoints,
              waypoints,
              dispatch
            );
          }

          if (valhallaRoute?.trip?.legs?.length > 0) {
            const routeGeometry = valhallaRoute.trip.legs.flatMap((leg) =>
              decodePolyline(leg.shape)
            );
            addRouteLayer(
              map,
              "green",
              routeGeometry,
              "route2",
              10,

              setWaypoints,
              waypoints,
              dispatch
            );
          }
        } else {
          const optimizeRoute = await getOptimizedRouteWithStops(waypoints);
          // console.log(optimizeRoute);
          console.log(map);
          if (optimizeRoute?.trips?.length > 0) {
            addRouteLayer(
              map,
              "#A91CD8",
              optimizeRoute.trips[0].geometry.coordinates,
              "route3",
              10,

              setWaypoints,
              waypoints,
              dispatch
            );
            setRoute(optimizeRoute.trips[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching routes:", error.message);
      }
    };

    fetchRoutes();
  }, [map, waypoints, dispatch]);

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
  }, [pois, map]);

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
      console.log(data);
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

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="flex flex-col w-full h-full ">
        <div className="absolute top-0 right-0 p-2 mr-[300px] border-b border-gray-300 bg-transparent z-10 flex">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category)}
              className={`flex items-center mx-1 px-3 py-2 rounded border space-x-2 ${
                activeCategory === category.name
                  ? "bg-gray-600 text-white"
                  : "bg-white text-black"
              }`}
              disabled={loading}
            >
              <span>{<category.IconComponent />}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <ToastContainer position="top-center" autoClose={10000} />
        <div ref={mapContainer} className="w-full h-full flex-1 " />
      </div>
      <div>
        <RenderDirectionDetail route={route} />
      </div>
    </div>
  );
};

export default Map;
