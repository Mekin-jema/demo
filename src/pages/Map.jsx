// Pmtiles protocols
import { PMTiles, Protocol } from "pmtiles";

import { styles } from "../utils/styles";

//
// Import React hooks
import { useEffect, useRef, useState } from "react";

// Import MapLibre GL library and styles
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css"; // MapLibre core styles

// Import assets
import OriginStep from "../assets/images/origin_step.svg"; // Image for the origin step indicator
import DestinationStep from "../assets/images/destination_step.svg"; // Image for the destination step indicator
import Logo from "../assets/logo2.png"; // Application logo

// Import constants
import { DIRECTION_ARROWS } from "../constants"; // Arrow constants for directions

// Import API functions
import { getRouteInfo } from "../api/getRouteInfo"; // Function to fetch route information
import { getShortestRoute } from "../api/getShortestRoute"; // Function to fetch the shortest route
import { getDefaultRoute } from "../api/getValhallaRoute"; // Function to fetch the default route (Valhalla)
import { getOptimizedRouteWithStops } from "../api/getOptimizedRouteWithStops";

// Import utility functions
import decodePolyline from "../utils/decoder"; // Utility for decoding polylines
import { renderDirectionDetail } from "./directionDetail"; // Utility for rendering detailed directions
import { renderAddressBox } from "./inputHandler"; // Utility for rendering address input fields
import { addRouteLayer } from "../utils/MapUtils"; // Utility for adding route layers to the map
// for toastin purpouse
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Map = () => {
  // Refs for map container and instance
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const [mapCenter, setMapCenter] = useState([]);
  const [map, setMap] = useState(null);
  const [route, setRoute] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [close, setClose] = useState(false);

  const [waypoints, setWaypoints] = useState([
    { placeName: "", longitude: null, latitude: null },
    { placeName: "", longitude: null, latitude: null },
  ]);

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
        console.log("Header information:", header); // Log header information
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
          "bottom-left"
        );
        // Add fullscreen control
        mapInstance.current.addControl(
          new maplibregl.FullscreenControl(),
          "bottom-left"
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
          "bottom-left"
        );
        // Add marker at Addis Ababa
        const marker = new maplibregl.Marker({ color: "#4285F4" })
          .setLngLat([38.7626, 9.0404])
          .addTo(mapInstance.current);

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
          "bottom-left"
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
      const coordinates = waypoints.slice(0, 2);

      try {
        if (waypoints.length <= 2) {
          const [routeInfo, shortestRoute, valhallaRoute] = await Promise.all([
            getRouteInfo(coordinates),
            getShortestRoute(coordinates),
            getDefaultRoute(coordinates),
          ]);

          if (routeInfo?.routes?.length > 0) {
            setRoute(routeInfo.routes[0]);
          }

          if (shortestRoute?.routes?.length > 0) {
            addRouteLayer(
              map,
              "red",
              shortestRoute.routes[0].geometry.coordinates,
              "route1",
              10,
              maplibregl
            );
          }

          if (valhallaRoute?.trip?.legs?.length > 0) {
            const routeGeometry = valhallaRoute.trip.legs.flatMap((leg) =>
              decodePolyline(leg.shape)
            );
            addRouteLayer(map, "green", routeGeometry, "route2", 10);
          }
        } else {
          const optimizeRoute = await getOptimizedRouteWithStops(waypoints);
          if (optimizeRoute?.routes?.length > 0) {
            addRouteLayer(
              map,
              "#3498db",
              optimizeRoute.routes[0].geometry.coordinates,
              "route3",
              10,
              maplibregl
            );
            setRoute(optimizeRoute.routes[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, [map, waypoints]);

  const addWaypoint = () => {
    const lastWaypoint = waypoints[waypoints.length - 1];
    if (
      !lastWaypoint.placeName ||
      lastWaypoint.longitude === null ||
      lastWaypoint.latitude === null
    ) {
      toast.error(
        "Please complete the previous waypoint before adding a new one.",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
      return;
    }
    setWaypoints([
      ...waypoints,
      { placeName: "", longitude: null, latitude: null },
    ]);
  };

  const updateWaypoint = (index, address) => {
    const updatedWaypoints = [...waypoints];
    updatedWaypoints[index] = address;
    setWaypoints(updatedWaypoints);
  };

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%" }}
      className="flex"
    >
      <ToastContainer position="top-center" autoClose={10000} />
      {!close && renderAddressBox(waypoints, updateWaypoint, addWaypoint)}
      {/* <span
        onClick={() => setClose(!close)}
        className="bg-red-600 text-white absolute  top-10 left-[800px] z-10 cursor-pointer   "
      >
        X
      </span> */}
      <div
        ref={mapContainer}
        style={{ width: "70%", height: "100%" }}
        className="flex-1"
      />
      <div className="relative">
        {toggle ? (
          <div className="direction-detail fixed">
            <div className="w-full p-4">
              <button
                onClick={() => setToggle(false)}
                className="absolute top-6 left-1 bg-green-800  text-white p-3 z-40 rounded-md"
                aria-label="Close details"
              >
                <i className="pi pi-chevron-right cursor-pointer text-white"></i>
              </button>
              <img className="w-full h-[200px]" alt="Logo" src={Logo} />
              {renderDirectionDetail(
                route,
                OriginStep,
                DIRECTION_ARROWS,
                DestinationStep,
                map,
                waypoints,
                maplibregl
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setToggle(true)}
            className="bg-green-800 rounded-sm text-white p-3 z-40 fixed top-6 right-0 rounded-md "
            aria-label="Open details"
          >
            <i className="pi pi-chevron-left cursor-pointer text-white"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Map;
