// const PMTILES_URL = "/map.pmtiles"; // Direct reference

export const styles = {
  version: 8,
  id: "bright",
  name: "Bright",
  sources: {
    openmaptiles: {
      url: "pmtiles://map.pmtiles",
      type: "vector",
    },
  },
  layers: [
    {
      id: "background",
      type: "background",
      paint: {
        "background-color": "hsl(30,36%,96%)",
      },
    },
    {
      id: "landcover-glacier",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": "#fff",
        "fill-opacity": {
          base: 1,
          stops: [
            [0, 0.9],
            [10, 0.3],
          ],
        },
      },
      filter: ["==", "subclass", "glacier"],
    },
    {
      id: "landuse-residential",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": {
          base: 1,
          stops: [
            [12, "hsla(30, 19%, 90%, 0.4)"],
            [16, "hsla(30, 19%, 90%, 0.2)"],
          ],
        },
      },
      filter: [
        "all",
        ["in", "class", "residential", "suburb", "neighbourhood"],
      ],
    },
    {
      id: "landuse-commercial",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": "hsla(0, 60%, 87%, 0.25)",
      },
      filter: [
        "all",
        ["==", "$type", "Polygon"],
        ["==", "class", "commercial"],
      ],
    },
    {
      id: "landuse-industrial",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": "hsla(49, 100%, 88%, 0.35)",
      },
      filter: [
        "all",
        ["==", "$type", "Polygon"],
        ["in", "class", "industrial", "garages", "dam"],
      ],
    },
    {
      id: "landuse-cemetery",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      paint: {
        "fill-color": "hsl(94,12%,88%)",
      },
      filter: ["==", "class", "cemetery"],
    },
    {
      id: "landuse-hospital",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      paint: {
        "fill-color": "hsl(330,100%,93%)",
      },
      filter: ["==", "class", "hospital"],
    },
    {
      id: "landuse-school",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      paint: {
        "fill-color": "hsl(270,53%,94%)",
      },
      filter: ["==", "class", "school"],
    },
    {
      id: "landuse-railway",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": "hsla(30, 19%, 90%, 0.5)",
      },
      filter: ["==", "class", "railway"],
    },
    {
      id: "landcover-grass",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": "hsl(90,41%,85%)",
        "fill-opacity": 1,
      },
      filter: ["==", "class", "grass"],
    },
    {
      id: "landcover-wood",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": "hsl(100,43%,47%)",
        "fill-opacity": 0.15,
        "fill-antialias": {
          base: 1,
          stops: [
            [0, false],
            [9, true],
          ],
        },
      },
      filter: ["==", "class", "wood"],
    },
    {
      id: "waterway_tunnel",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      minzoom: 14,
      layout: {
        "line-cap": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(210,73%,78%)",
        "line-width": {
          base: 1.3,
          stops: [
            [13, 0.5],
            [20, 6],
          ],
        },
        "line-dasharray": [2, 4],
      },
      filter: [
        "all",
        ["in", "class", "river", "stream", "canal"],
        ["==", "brunnel", "tunnel"],
      ],
    },
    {
      id: "waterway-other",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      layout: {
        "line-cap": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(210,73%,78%)",
        "line-width": {
          base: 1.3,
          stops: [
            [13, 0.5],
            [20, 2],
          ],
        },
      },
      filter: [
        "all",
        ["!in", "class", "canal", "river", "stream"],
        ["==", "intermittent", 0],
      ],
    },
    {
      id: "waterway-other-intermittent",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      layout: {
        "line-cap": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(210,73%,78%)",
        "line-width": {
          base: 1.3,
          stops: [
            [13, 0.5],
            [20, 2],
          ],
        },
        "line-dasharray": [4, 3],
      },
      filter: [
        "all",
        ["!in", "class", "canal", "river", "stream"],
        ["==", "intermittent", 1],
      ],
    },
    {
      id: "waterway-stream-canal",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      layout: {
        "line-cap": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(210,73%,78%)",
        "line-width": {
          base: 1.3,
          stops: [
            [13, 0.5],
            [20, 6],
          ],
        },
      },
      filter: [
        "all",
        ["in", "class", "canal", "stream"],
        ["!=", "brunnel", "tunnel"],
        ["==", "intermittent", 0],
      ],
    },
    {
      id: "waterway-stream-canal-intermittent",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      layout: {
        "line-cap": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(210,73%,78%)",
        "line-width": {
          base: 1.3,
          stops: [
            [13, 0.5],
            [20, 6],
          ],
        },
        "line-dasharray": [4, 3],
      },
      filter: [
        "all",
        ["in", "class", "canal", "stream"],
        ["!=", "brunnel", "tunnel"],
        ["==", "intermittent", 1],
      ],
    },
    {
      id: "waterway-river",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      layout: {
        "line-cap": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(210,73%,78%)",
        "line-width": {
          base: 1.2,
          stops: [
            [10, 0.8],
            [20, 6],
          ],
        },
      },
      filter: [
        "all",
        ["==", "class", "river"],
        ["!=", "brunnel", "tunnel"],
        ["==", "intermittent", 0],
      ],
    },
    {
      id: "waterway-river-intermittent",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      layout: {
        "line-cap": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(210,73%,78%)",
        "line-width": {
          base: 1.2,
          stops: [
            [10, 0.8],
            [20, 6],
          ],
        },
        "line-dasharray": [3, 2.5],
      },
      filter: [
        "all",
        ["==", "class", "river"],
        ["!=", "brunnel", "tunnel"],
        ["==", "intermittent", 1],
      ],
    },
    {
      id: "water-offset",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "water",
      maxzoom: 8,
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": "hsl(210,73%,78%)",
        "fill-opacity": 1,
        "fill-translate": {
          base: 1,
          stops: [
            [6, [2, 0]],
            [8, [0, 0]],
          ],
        },
      },
      filter: ["==", "$type", "Polygon"],
    },
    {
      id: "water",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "water",
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": "hsl(210, 67%, 85%)",
      },
      filter: ["all", ["!=", "intermittent", 1], ["!=", "brunnel", "tunnel"]],
    },
    {
      id: "water-intermittent",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "water",
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": "hsl(210, 67%, 85%)",
        "fill-opacity": 0.7,
      },
      filter: ["all", ["==", "intermittent", 1]],
    },
    {
      id: "water-pattern",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "water",
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-pattern": "wave",
        "fill-translate": [0, 2.5],
      },
      filter: ["all"],
    },
    {
      id: "landcover-ice-shelf",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": "hsl(0,0%,100%)",
        "fill-opacity": {
          base: 1,
          stops: [
            [0, 0.9],
            [10, 0.3],
          ],
        },
      },
      filter: ["==", "subclass", "ice_shelf"],
    },
    {
      id: "landcover-sand",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": "hsl(53,74%,85%)",
        "fill-opacity": 1,
      },
      filter: ["all", ["==", "class", "sand"]],
    },
    {
      id: "building",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "building",
      paint: {
        "fill-color": {
          base: 1,
          stops: [
            [15.5, "hsl(30,38%,92%)"],
            [16, "hsl(30,11%,86%)"],
          ],
        },
        "fill-antialias": true,
      },
    },
    {
      id: "building-top",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "building",
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": "hsl(30,38%,92%)",
        "fill-opacity": {
          base: 1,
          stops: [
            [13, 0],
            [16, 1],
          ],
        },
        "fill-translate": {
          base: 1,
          stops: [
            [14, [0, 0]],
            [16, [-2, -2]],
          ],
        },
        "fill-outline-color": "hsl(30,11%,86%)",
      },
    },
    {
      id: "tunnel-service-track-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(36,5%,80%)",
        "line-width": {
          base: 1.2,
          stops: [
            [15, 1],
            [16, 4],
            [20, 11],
          ],
        },
        "line-dasharray": [0.5, 0.25],
      },
      filter: [
        "all",
        ["==", "brunnel", "tunnel"],
        ["in", "class", "service", "track"],
      ],
    },
    {
      id: "tunnel-motorway-link-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(28,47%,59%)",
        "line-width": {
          base: 1.2,
          stops: [
            [12, 1],
            [13, 3],
            [14, 4],
            [20, 15],
          ],
        },
        "line-dasharray": [0.5, 0.25],
      },
      filter: [
        "all",
        ["==", "brunnel", "tunnel"],
        ["==", "class", "motorway"],
        ["==", "ramp", 1],
      ],
    },
    {
      id: "tunnel-minor-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(36,5%,80%)",
        "line-width": {
          base: 1.2,
          stops: [
            [12, 0.5],
            [13, 1],
            [14, 4],
            [20, 15],
          ],
        },
        "line-opacity": {
          stops: [
            [12, 0],
            [12.5, 1],
          ],
        },
        "line-dasharray": [0.5, 0.25],
      },
      filter: ["all", ["==", "brunnel", "tunnel"], ["==", "class", "minor"]],
    },
    {
      id: "tunnel-link-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(28,47%,59%)",
        "line-width": {
          base: 1.2,
          stops: [
            [12, 1],
            [13, 3],
            [14, 4],
            [20, 15],
          ],
        },
        "line-opacity": 1,
        "line-dasharray": [0.5, 0.25],
      },
      filter: [
        "all",
        ["==", "brunnel", "tunnel"],
        ["in", "class", "trunk", "primary", "secondary", "tertiary"],
        ["==", "ramp", 1],
      ],
    },
    {
      id: "tunnel-secondary-tertiary-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(28,47%,59%)",
        "line-width": {
          base: 1.2,
          stops: [
            [8, 1.5],
            [20, 17],
          ],
        },
        "line-opacity": 1,
        "line-dasharray": [0.5, 0.25],
      },
      filter: [
        "all",
        ["==", "brunnel", "tunnel"],
        ["in", "class", "secondary", "tertiary"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "tunnel-trunk-primary-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(28,47%,59%)",
        "line-width": {
          base: 1.2,
          stops: [
            [5, 0.4],
            [6, 0.6],
            [7, 1.5],
            [20, 22],
          ],
        },
      },
      filter: [
        "all",
        ["==", "brunnel", "tunnel"],
        ["in", "class", "primary", "trunk"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "tunnel-motorway-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(28,47%,59%)",
        "line-width": {
          base: 1.2,
          stops: [
            [5, 0.4],
            [6, 0.6],
            [7, 1.5],
            [20, 22],
          ],
        },
        "line-dasharray": [0.5, 0.25],
      },
      filter: [
        "all",
        ["==", "brunnel", "tunnel"],
        ["==", "class", "motorway"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "tunnel-path",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      paint: {
        "line-color": "hsl(30,25%,73%)",
        "line-width": {
          base: 1.2,
          stops: [
            [15, 1.2],
            [20, 4],
          ],
        },
        "line-dasharray": [1.5, 0.75],
      },
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "tunnel"],
        ["==", "class", "path"],
      ],
    },
    {
      id: "tunnel-motorway-link",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(36,80%,79%)",
        "line-width": {
          base: 1.2,
          stops: [
            [12.5, 0],
            [13, 1.5],
            [14, 2.5],
            [20, 11.5],
          ],
        },
      },
      filter: [
        "all",
        ["==", "brunnel", "tunnel"],
        ["==", "class", "motorway"],
        ["==", "ramp", 1],
      ],
    },
    {
      id: "tunnel-service-track",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(0,0%,100%)",
        "line-width": {
          base: 1.2,
          stops: [
            [15.5, 0],
            [16, 2],
            [20, 7.5],
          ],
        },
      },
      filter: [
        "all",
        ["==", "brunnel", "tunnel"],
        ["in", "class", "service", "track"],
      ],
    },
    {
      id: "tunnel-link",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(48,100%,89%)",
        "line-width": {
          base: 1.2,
          stops: [
            [12.5, 0],
            [13, 1.5],
            [14, 2.5],
            [20, 11.5],
          ],
        },
      },
      filter: [
        "all",
        ["==", "brunnel", "tunnel"],
        ["in", "class", "trunk", "primary", "secondary", "tertiary"],
        ["==", "ramp", 1],
      ],
    },
    {
      id: "tunnel-minor",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(0,0%,100%)",
        "line-width": {
          base: 1.2,
          stops: [
            [13.5, 0],
            [14, 2.5],
            [20, 11.5],
          ],
        },
        "line-opacity": 1,
      },
      filter: [
        "all",
        ["==", "brunnel", "tunnel"],
        ["==", "class", "minor_road"],
      ],
    },
    {
      id: "tunnel-secondary-tertiary",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(48,100%,89%)",
        "line-width": {
          base: 1.2,
          stops: [
            [6.5, 0],
            [7, 0.5],
            [20, 10],
          ],
        },
      },
      filter: [
        "all",
        ["==", "brunnel", "tunnel"],
        ["in", "class", "secondary", "tertiary"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "tunnel-trunk-primary",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(48,100%,89%)",
        "line-width": {
          base: 1.2,
          stops: [
            [6.5, 0],
            [7, 0.5],
            [20, 18],
          ],
        },
      },
      filter: [
        "all",
        ["==", "brunnel", "tunnel"],
        ["in", "class", "primary", "trunk"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "tunnel-motorway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(35,100%,83%)",
        "line-width": {
          base: 1.2,
          stops: [
            [6.5, 0],
            [7, 0.5],
            [20, 18],
          ],
        },
      },
      filter: [
        "all",
        ["==", "brunnel", "tunnel"],
        ["==", "class", "motorway"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "tunnel-railway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      paint: {
        "line-color": "hsl(0,0%,73%)",
        "line-width": {
          base: 1.4,
          stops: [
            [14, 0.4],
            [15, 0.75],
            [20, 2],
          ],
        },
        "line-dasharray": [2, 2],
      },
      filter: ["all", ["==", "brunnel", "tunnel"], ["==", "class", "rail"]],
    },
    {
      id: "ferry",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(199,34%,57%)",
        "line-width": 1.1,
        "line-dasharray": [2, 2],
      },
      filter: ["all", ["in", "class", "ferry"]],
    },
    {
      id: "aeroway-taxiway-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "aeroway",
      minzoom: 12,
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(0,0%,60%)",
        "line-width": {
          base: 1.5,
          stops: [
            [11, 2],
            [17, 12],
          ],
        },
        "line-opacity": 1,
      },
      filter: ["all", ["in", "class", "taxiway"]],
    },
    {
      id: "aeroway-runway-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "aeroway",
      minzoom: 12,
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(0,0%,60%)",
        "line-width": {
          base: 1.5,
          stops: [
            [11, 5],
            [17, 55],
          ],
        },
        "line-opacity": 1,
      },
      filter: ["all", ["in", "class", "runway"]],
    },
    {
      id: "aeroway-area",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "aeroway",
      minzoom: 4,
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": "hsl(0,0%,100%)",
        "fill-opacity": {
          base: 1,
          stops: [
            [13, 0],
            [14, 1],
          ],
        },
      },
      filter: [
        "all",
        ["==", "$type", "Polygon"],
        ["in", "class", "runway", "taxiway"],
      ],
    },
    {
      id: "aeroway-taxiway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "aeroway",
      minzoom: 4,
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(0,0%,100%)",
        "line-width": {
          base: 1.5,
          stops: [
            [11, 1],
            [17, 10],
          ],
        },
        "line-opacity": {
          base: 1,
          stops: [
            [11, 0],
            [12, 1],
          ],
        },
      },
      filter: [
        "all",
        ["in", "class", "taxiway"],
        ["==", "$type", "LineString"],
      ],
    },
    {
      id: "aeroway-runway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "aeroway",
      minzoom: 4,
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(0,0%,100%)",
        "line-width": {
          base: 1.5,
          stops: [
            [11, 4],
            [17, 50],
          ],
        },
        "line-opacity": {
          base: 1,
          stops: [
            [11, 0],
            [12, 1],
          ],
        },
      },
      filter: ["all", ["in", "class", "runway"], ["==", "$type", "LineString"]],
    },
    {
      id: "road_area_pier",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": "hsl(30,36%,96%)",
        "fill-antialias": true,
      },
      metadata: {},
      filter: ["all", ["==", "$type", "Polygon"], ["==", "class", "pier"]],
    },
    {
      id: "road_pier",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(30,36%,96%)",
        "line-width": {
          base: 1.2,
          stops: [
            [15, 1],
            [17, 4],
          ],
        },
      },
      metadata: {},
      filter: ["all", ["==", "$type", "LineString"], ["in", "class", "pier"]],
    },
    {
      id: "highway-area",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": "hsla(0, 0%, 89%, 0.5)",
        "fill-opacity": 0.9,
        "fill-antialias": false,
        "fill-outline-color": "hsl(36,5%,80%)",
      },
      filter: ["all", ["==", "$type", "Polygon"], ["!in", "class", "pier"]],
    },
    {
      id: "highway-motorway-link-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 12,
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(28,72%,69%)",
        "line-width": {
          base: 1.2,
          stops: [
            [12, 1],
            [13, 3],
            [14, 4],
            [20, 15],
          ],
        },
        "line-opacity": 1,
      },
      filter: [
        "all",
        ["!in", "brunnel", "bridge", "tunnel"],
        ["==", "class", "motorway"],
        ["==", "ramp", 1],
      ],
    },
    {
      id: "highway-link-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 13,
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(28,72%,69%)",
        "line-width": {
          base: 1.2,
          stops: [
            [12, 1],
            [13, 3],
            [14, 4],
            [20, 15],
          ],
        },
        "line-opacity": 1,
      },
      filter: [
        "all",
        ["!in", "brunnel", "bridge", "tunnel"],
        ["in", "class", "trunk", "primary", "secondary", "tertiary"],
        ["==", "ramp", 1],
      ],
    },
    {
      id: "highway-minor-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(36, 5%,80%)",
        "line-width": {
          base: 1.2,
          stops: [
            [12, 0.5],
            [13, 1],
            [14, 4],
            [20, 15],
          ],
        },
        "line-opacity": {
          stops: [
            [12, 0],
            [12.5, 1],
          ],
        },
      },
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["!=", "brunnel", "tunnel"],
        ["in", "class", "minor", "service", "track"],
      ],
    },
    {
      id: "highway-secondary-tertiary-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-cap": "butt",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(28,72%,69%)",
        "line-width": {
          base: 1.2,
          stops: [
            [8, 1.5],
            [20, 17],
          ],
        },
        "line-opacity": 1,
      },
      filter: [
        "all",
        ["!in", "brunnel", "bridge", "tunnel"],
        ["in", "class", "secondary", "tertiary"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "highway-primary-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 5,
      layout: {
        "line-cap": "butt",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(28,72%,69%)",
        "line-width": {
          base: 1.2,
          stops: [
            [7, 0],
            [8, 0.6],
            [9, 1.5],
            [20, 22],
          ],
        },
        "line-opacity": {
          stops: [
            [7, 0],
            [8, 1],
          ],
        },
      },
      filter: [
        "all",
        ["!in", "brunnel", "bridge", "tunnel"],
        ["in", "class", "primary"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "highway-trunk-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 5,
      layout: {
        "line-cap": "butt",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(28,72%,69%)",
        "line-width": {
          base: 1.2,
          stops: [
            [5, 0],
            [6, 0.6],
            [7, 1.5],
            [20, 22],
          ],
        },
        "line-opacity": {
          stops: [
            [5, 0],
            [6, 1],
          ],
        },
      },
      filter: [
        "all",
        ["!in", "brunnel", "bridge", "tunnel"],
        ["in", "class", "trunk"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "highway-motorway-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 4,
      layout: {
        "line-cap": "butt",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(28,72%,69%)",
        "line-width": {
          base: 1.2,
          stops: [
            [4, 0],
            [5, 0.4],
            [6, 0.6],
            [7, 1.5],
            [20, 22],
          ],
        },
        "line-opacity": {
          stops: [
            [4, 0],
            [5, 1],
          ],
        },
      },
      filter: [
        "all",
        ["!in", "brunnel", "bridge", "tunnel"],
        ["==", "class", "motorway"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "highway-path",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      paint: {
        "line-color": "hsl(30,25%,73%)",
        "line-width": {
          base: 1.2,
          stops: [
            [15, 1.2],
            [20, 4],
          ],
        },
        "line-dasharray": [1.5, 0.75],
      },
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["!in", "brunnel", "bridge", "tunnel"],
        ["==", "class", "path"],
      ],
    },
    {
      id: "highway-motorway-link",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 12,
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(34,100%,77%)",
        "line-width": {
          base: 1.2,
          stops: [
            [12.5, 0],
            [13, 1.5],
            [14, 2.5],
            [20, 11.5],
          ],
        },
      },
      filter: [
        "all",
        ["!in", "brunnel", "bridge", "tunnel"],
        ["==", "class", "motorway"],
        ["==", "ramp", 1],
      ],
    },
    {
      id: "highway-link",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 13,
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(48,100%,83%)",
        "line-width": {
          base: 1.2,
          stops: [
            [12.5, 0],
            [13, 1.5],
            [14, 2.5],
            [20, 11.5],
          ],
        },
      },
      filter: [
        "all",
        ["!in", "brunnel", "bridge", "tunnel"],
        ["in", "class", "trunk", "primary", "secondary", "tertiary"],
        ["==", "ramp", 1],
      ],
    },
    {
      id: "highway-minor",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(0,0%,100%)",
        "line-width": {
          base: 1.2,
          stops: [
            [13.5, 0],
            [14, 2.5],
            [20, 11.5],
          ],
        },
        "line-opacity": 1,
      },
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["!=", "brunnel", "tunnel"],
        ["in", "class", "minor", "service", "track"],
      ],
    },
    {
      id: "highway-secondary-tertiary",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(48,100%,83%)",
        "line-width": {
          base: 1.2,
          stops: [
            [6.5, 0],
            [8, 0.5],
            [20, 13],
          ],
        },
      },
      filter: [
        "all",
        ["!in", "brunnel", "bridge", "tunnel"],
        ["in", "class", "secondary", "tertiary"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "highway-primary",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(48,100%,83%)",
        "line-width": {
          base: 1.2,
          stops: [
            [8.5, 0],
            [9, 0.5],
            [20, 18],
          ],
        },
      },
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["!in", "brunnel", "bridge", "tunnel"],
        ["in", "class", "primary"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "highway-trunk",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(48,100%,83%)",
        "line-width": {
          base: 1.2,
          stops: [
            [6.5, 0],
            [7, 0.5],
            [20, 18],
          ],
        },
      },
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["!in", "brunnel", "bridge", "tunnel"],
        ["in", "class", "trunk"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "highway-motorway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 5,
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(34,100%,77%)",
        "line-width": {
          base: 1.2,
          stops: [
            [6.5, 0],
            [7, 0.5],
            [20, 18],
          ],
        },
      },
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["!in", "brunnel", "bridge", "tunnel"],
        ["==", "class", "motorway"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "railway-transit",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        visibility: "visible",
      },
      paint: {
        "line-color": "hsla(0, 0%, 73%, 0.7)",
        "line-width": {
          base: 1.4,
          stops: [
            [14, 0.4],
            [20, 1],
          ],
        },
      },
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "class", "transit"],
        ["!in", "brunnel", "tunnel"],
      ],
    },
    {
      id: "railway-transit-hatching",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        visibility: "visible",
      },
      paint: {
        "line-color": "hsla(0, 0%, 73%, 0.7)",
        "line-width": {
          base: 1.4,
          stops: [
            [14.5, 0],
            [15, 2],
            [20, 6],
          ],
        },
        "line-dasharray": [0.2, 8],
      },
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "class", "transit"],
        ["!in", "brunnel", "tunnel"],
      ],
    },
    {
      id: "railway-service",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      paint: {
        "line-color": "hsla(0, 0%, 73%, 0.8)",
        "line-width": {
          base: 1.4,
          stops: [
            [14, 0.4],
            [20, 1],
          ],
        },
      },
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "class", "rail"],
        ["has", "service"],
      ],
    },
    {
      id: "railway-service-hatching",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        visibility: "visible",
      },
      paint: {
        "line-color": "hsla(0, 0%, 73%, 0.7)",
        "line-width": {
          base: 1.4,
          stops: [
            [14.5, 0],
            [15, 2],
            [20, 6],
          ],
        },
        "line-dasharray": [0.2, 8],
      },
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "class", "rail"],
        ["has", "service"],
      ],
    },
    {
      id: "railway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      paint: {
        "line-color": "hsl(0,0%,73%)",
        "line-width": {
          base: 1.4,
          stops: [
            [14, 0.4],
            [15, 0.75],
            [20, 2],
          ],
        },
      },
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["!has", "service"],
        ["!in", "brunnel", "bridge", "tunnel"],
        ["==", "class", "rail"],
      ],
    },
    {
      id: "railway-hatching",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      paint: {
        "line-color": "hsl(0,0%,73%)",
        "line-width": {
          base: 1.4,
          stops: [
            [14.5, 0],
            [15, 3],
            [20, 8],
          ],
        },
        "line-dasharray": [0.2, 8],
      },
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["!has", "service"],
        ["!in", "brunnel", "bridge", "tunnel"],
        ["==", "class", "rail"],
      ],
    },
    {
      id: "bridge-motorway-link-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(28,72%,69%)",
        "line-width": {
          base: 1.2,
          stops: [
            [12, 1],
            [13, 3],
            [14, 4],
            [20, 19],
          ],
        },
        "line-opacity": 1,
      },
      filter: [
        "all",
        ["==", "brunnel", "bridge"],
        ["==", "class", "motorway"],
        ["==", "ramp", 1],
      ],
    },
    {
      id: "bridge-link-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(28,72%,69%)",
        "line-width": {
          base: 1.2,
          stops: [
            [12, 1],
            [13, 3],
            [14, 4],
            [20, 19],
          ],
        },
        "line-opacity": 1,
      },
      filter: [
        "all",
        ["==", "brunnel", "bridge"],
        ["in", "class", "trunk", "primary", "secondary", "tertiary"],
        ["==", "ramp", 1],
      ],
    },
    {
      id: "bridge-secondary-tertiary-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(28,72%,69%)",
        "line-width": {
          base: 1.2,
          stops: [
            [5, 0.4],
            [7, 0.6],
            [8, 1.5],
            [20, 21],
          ],
        },
        "line-opacity": 1,
      },
      filter: [
        "all",
        ["==", "brunnel", "bridge"],
        ["in", "class", "secondary", "tertiary"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "bridge-trunk-primary-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(28, 76%, 67%)",
        "line-width": {
          base: 1.2,
          stops: [
            [5, 0.4],
            [6, 0.6],
            [7, 1.5],
            [20, 26],
          ],
        },
      },
      filter: [
        "all",
        ["==", "brunnel", "bridge"],
        ["in", "class", "primary", "trunk"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "bridge-motorway-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(28,72%,69%)",
        "line-width": {
          base: 1.2,
          stops: [
            [5, 0.4],
            [6, 0.6],
            [7, 1.5],
            [20, 26],
          ],
        },
      },
      filter: [
        "all",
        ["==", "brunnel", "bridge"],
        ["==", "class", "motorway"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "bridge-minor-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-cap": "butt",
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(36,5%,80%)",
        "line-width": {
          base: 1.2,
          stops: [
            [12, 0.5],
            [13, 1],
            [14, 6],
            [20, 24],
          ],
        },
        "line-opacity": {
          stops: [
            [12, 0],
            [12.5, 1],
          ],
        },
      },
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "bridge"],
        ["in", "class", "minor", "service", "track"],
      ],
    },
    {
      id: "bridge-path-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      paint: {
        "line-color": "hsl(30,36%,96%)",
        "line-width": {
          base: 1.2,
          stops: [
            [15, 1.2],
            [20, 18],
          ],
        },
      },
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "bridge"],
        ["==", "class", "path"],
      ],
    },
    {
      id: "bridge-path",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      paint: {
        "line-color": "hsl(30,25%,73%)",
        "line-width": {
          base: 1.2,
          stops: [
            [15, 1.2],
            [20, 4],
          ],
        },
        "line-dasharray": [1.5, 0.75],
      },
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "bridge"],
        ["==", "class", "path"],
      ],
    },
    {
      id: "bridge-motorway-link",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(34,100%,77%)",
        "line-width": {
          base: 1.2,
          stops: [
            [12.5, 0],
            [13, 1.5],
            [14, 2.5],
            [20, 11.5],
          ],
        },
      },
      filter: [
        "all",
        ["==", "brunnel", "bridge"],
        ["==", "class", "motorway"],
        ["==", "ramp", 1],
      ],
    },
    {
      id: "bridge-link",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(48,100%,83%)",
        "line-width": {
          base: 1.2,
          stops: [
            [12.5, 0],
            [13, 1.5],
            [14, 2.5],
            [20, 11.5],
          ],
        },
      },
      filter: [
        "all",
        ["==", "brunnel", "bridge"],
        ["in", "class", "trunk", "primary", "secondary", "tertiary"],
        ["==", "ramp", 1],
      ],
    },
    {
      id: "bridge-minor",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(0,0%,100%)",
        "line-width": {
          base: 1.2,
          stops: [
            [13.5, 0],
            [14, 2.5],
            [20, 11.5],
          ],
        },
        "line-opacity": 1,
      },
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["==", "brunnel", "bridge"],
        ["in", "class", "minor", "service", "track"],
      ],
    },
    {
      id: "bridge-secondary-tertiary",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(48,100%,83%)",
        "line-width": {
          base: 1.2,
          stops: [
            [6.5, 0],
            [8, 0.5],
            [20, 13],
          ],
        },
      },
      filter: [
        "all",
        ["==", "brunnel", "bridge"],
        ["in", "class", "secondary", "tertiary"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "bridge-trunk-primary",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(48,100%,83%)",
        "line-width": {
          base: 1.2,
          stops: [
            [6.5, 0],
            [7, 0.5],
            [20, 18],
          ],
        },
      },
      filter: [
        "all",
        ["==", "brunnel", "bridge"],
        ["in", "class", "primary", "trunk"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "bridge-motorway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      layout: {
        "line-join": "round",
      },
      paint: {
        "line-color": "hsl(34,100%,77%)",
        "line-width": {
          base: 1.2,
          stops: [
            [6.5, 0],
            [7, 0.5],
            [20, 18],
          ],
        },
      },
      filter: [
        "all",
        ["==", "brunnel", "bridge"],
        ["==", "class", "motorway"],
        ["!=", "ramp", 1],
      ],
    },
    {
      id: "bridge-railway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      paint: {
        "line-color": "hsl(0,0%,73%)",
        "line-width": {
          base: 1.4,
          stops: [
            [14, 0.4],
            [15, 0.75],
            [20, 2],
          ],
        },
      },
      filter: ["all", ["==", "brunnel", "bridge"], ["==", "class", "rail"]],
    },
    {
      id: "bridge-railway-hatching",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      paint: {
        "line-color": "hsl(0,0%,73%)",
        "line-width": {
          base: 1.4,
          stops: [
            [14.5, 0],
            [15, 3],
            [20, 8],
          ],
        },
        "line-dasharray": [0.2, 8],
      },
      filter: ["all", ["==", "brunnel", "bridge"], ["==", "class", "rail"]],
    },
    {
      id: "cablecar",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 13,
      layout: {
        "line-cap": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(0, 0%, 70%)",
        "line-width": {
          base: 1,
          stops: [
            [11, 1],
            [19, 2.5],
          ],
        },
      },
      filter: ["==", "subclass", "cable_car"],
    },
    {
      id: "cablecar-dash",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 13,
      layout: {
        "line-cap": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(0, 0%, 70%)",
        "line-width": {
          base: 1,
          stops: [
            [11, 3],
            [19, 5.5],
          ],
        },
        "line-dasharray": [2, 3],
      },
      filter: ["==", "subclass", "cable_car"],
    },
    {
      id: "boundary-land-level-4",
      type: "line",
      source: "openmaptiles",
      "source-layer": "boundary",
      minzoom: 2,
      layout: {
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(248,8%,64%)",
        "line-width": {
          base: 1.4,
          stops: [
            [4, 0.4],
            [5, 1],
            [12, 3],
          ],
        },
        "line-dasharray": [3, 1, 1, 1],
      },
      filter: [
        "all",
        ["\u003E=", "admin_level", 3],
        ["\u003C=", "admin_level", 8],
        ["!=", "maritime", 1],
      ],
    },
    {
      id: "boundary-land-level-2",
      type: "line",
      source: "openmaptiles",
      "source-layer": "boundary",
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(248, 7%, 66%)",
        "line-width": {
          base: 1,
          stops: [
            [0, 0.6],
            [4, 1.4],
            [5, 2],
            [12, 8],
          ],
        },
      },
      filter: [
        "all",
        ["==", "admin_level", 2],
        ["!=", "maritime", 1],
        ["!=", "disputed", 1],
      ],
    },
    {
      id: "boundary-land-disputed",
      type: "line",
      source: "openmaptiles",
      "source-layer": "boundary",
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(248, 7%, 70%)",
        "line-width": {
          base: 1,
          stops: [
            [0, 0.6],
            [4, 1.4],
            [5, 2],
            [12, 8],
          ],
        },
        "line-dasharray": [1, 3],
      },
      filter: ["all", ["!=", "maritime", 1], ["==", "disputed", 1]],
    },
    {
      id: "boundary-water",
      type: "line",
      source: "openmaptiles",
      "source-layer": "boundary",
      minzoom: 4,
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": "hsl(205,42%,72%)",
        "line-width": {
          base: 1,
          stops: [
            [0, 0.6],
            [4, 1.4],
            [5, 2],
            [12, 3],
          ],
        },
        "line-opacity": {
          stops: [
            [6, 0.6],
            [10, 1],
          ],
        },
      },
      filter: ["all", ["in", "admin_level", 2], ["==", "maritime", 1]],
    },
    {
      id: "waterway-name",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "waterway",
      minzoom: 13,
      layout: {
        "text-font": ["Noto Sans Italic"],
        "text-size": 14,
        "text-field": "{name:latin}",
        visibility: "visible",
        "symbol-spacing": 350,
        "text-max-width": 5,
        "symbol-placement": "line",
        "text-letter-spacing": 0.2,
        "text-rotation-alignment": "map",
      },
      paint: {
        "text-color": "hsl(210,73%,68%)",
        "text-halo-color": "hsla(0,0%,100%,0.7)",
        "text-halo-width": 1.5,
      },
      filter: ["all", ["==", "$type", "LineString"], ["has", "name"]],
    },
    {
      id: "water-name-lakeline",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "water_name",
      layout: {
        "text-font": ["Noto Sans Italic"],
        "text-size": 14,
        "text-field": "{name:latin}",
        "symbol-spacing": 350,
        "text-max-width": 5,
        "symbol-placement": "line",
        "text-letter-spacing": 0.2,
        "text-rotation-alignment": "map",
      },
      paint: {
        "text-color": "hsl(210,73%,68%)",
        "text-halo-color": "hsla(0,0%,100%,0.7)",
        "text-halo-width": 1.5,
      },
      filter: ["==", "$type", "LineString"],
    },
    {
      id: "water-name-ocean",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "water_name",
      layout: {
        "text-font": ["Noto Sans Italic"],
        "text-size": 14,
        "text-field": "{name:latin}",
        "symbol-spacing": 350,
        "text-max-width": 5,
        "symbol-placement": "point",
        "text-letter-spacing": 0.2,
        "text-rotation-alignment": "map",
      },
      paint: {
        "text-color": "hsl(210,73%,68%)",
        "text-halo-color": "hsla(0,0%,100%,0.7)",
        "text-halo-width": 1.5,
      },
      filter: ["all", ["==", "$type", "Point"], ["==", "class", "ocean"]],
    },
    {
      id: "water-name-other",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "water_name",
      layout: {
        "text-font": ["Noto Sans Italic"],
        "text-size": {
          stops: [
            [0, 10],
            [6, 14],
          ],
        },
        "text-field": "{name:latin}",
        visibility: "visible",
        "symbol-spacing": 350,
        "text-max-width": 5,
        "symbol-placement": "point",
        "text-letter-spacing": 0.2,
        "text-rotation-alignment": "map",
      },
      paint: {
        "text-color": "hsl(210,73%,68%)",
        "text-halo-color": "hsla(0,0%,100%,0.7)",
        "text-halo-width": 1.5,
      },
      filter: ["all", ["==", "$type", "Point"], ["!in", "class", "ocean"]],
    },
    {
      id: "road_oneway",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 15,
      layout: {
        "icon-size": {
          stops: [
            [15, 0.5],
            [19, 1],
          ],
        },
        "text-font": [],
        "icon-image": "oneway",
        "icon-rotate": 90,
        "icon-padding": 2,
        "symbol-spacing": 75,
        "symbol-placement": "line",
        "icon-rotation-alignment": "map",
      },
      paint: {
        "icon-opacity": 0.5,
      },
      filter: [
        "all",
        ["==", "oneway", 1],
        [
          "in",
          "class",
          "motorway",
          "trunk",
          "primary",
          "secondary",
          "tertiary",
          "minor",
          "service",
        ],
      ],
    },
    {
      id: "road_oneway_opposite",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation",
      minzoom: 15,
      layout: {
        "icon-size": {
          stops: [
            [15, 0.5],
            [19, 1],
          ],
        },
        "text-font": [],
        "icon-image": "oneway",
        "icon-rotate": -90,
        "icon-padding": 2,
        "symbol-spacing": 75,
        "symbol-placement": "line",
        "icon-rotation-alignment": "map",
      },
      paint: {
        "icon-opacity": 0.5,
      },
      filter: [
        "all",
        ["==", "oneway", -1],
        [
          "in",
          "class",
          "motorway",
          "trunk",
          "primary",
          "secondary",
          "tertiary",
          "minor",
          "service",
        ],
      ],
    },
    {
      id: "highway-name-path",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      minzoom: 15.5,
      layout: {
        "text-font": ["Noto Sans Regular"],
        "text-size": {
          base: 1,
          stops: [
            [13, 12],
            [14, 13],
          ],
        },
        "text-field": "{name:latin}",
        "symbol-placement": "line",
        "text-rotation-alignment": "map",
      },
      paint: {
        "text-color": "hsl(30,23%, 62%)",
        "text-halo-color": "hsl(30,36%,96%)",
        "text-halo-width": 0.5,
      },
      filter: ["==", "class", "path"],
    },
    {
      id: "highway-name-minor",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      minzoom: 15,
      layout: {
        "text-font": ["Noto Sans Regular"],
        "text-size": {
          base: 1,
          stops: [
            [13, 12],
            [14, 13],
          ],
        },
        "text-field": "{name:latin}",
        "symbol-placement": "line",
        "text-rotation-alignment": "map",
      },
      paint: {
        "text-color": "hsl(30,17%,40%)",
        "text-halo-blur": 0.5,
        "text-halo-width": 1,
      },
      filter: [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "minor", "service", "track"],
      ],
    },
    {
      id: "highway-name-ferry",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      minzoom: 12.2,
      layout: {
        "text-font": ["Noto Sans Regular"],
        "text-size": {
          base: 1,
          stops: [
            [13, 11],
            [14, 12],
          ],
        },
        "text-field": "{name:latin}",
        visibility: "visible",
        "symbol-placement": "line",
        "text-rotation-alignment": "map",
      },
      paint: {
        "text-color": "hsl(222,32%,30%)",
        "text-halo-blur": 0.5,
        "text-translate": [9, 0],
        "text-halo-width": 1,
      },
      filter: ["all", ["==", "subclass", "ferry"]],
    },
    {
      id: "highway-name-major",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      minzoom: 12.2,
      layout: {
        "text-font": ["Noto Sans Regular"],
        "text-size": {
          base: 1,
          stops: [
            [13, 12],
            [14, 13],
          ],
        },
        "text-field": "{name:latin}",
        visibility: "visible",
        "symbol-placement": "line",
        "text-rotation-alignment": "map",
      },
      paint: {
        "text-color": "hsl(30,17%,40%)",
        "text-halo-blur": 0.5,
        "text-halo-width": 1,
      },
      filter: ["in", "class", "primary", "secondary", "tertiary", "trunk"],
    },
    {
      id: "highway-shield",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      minzoom: 8,
      layout: {
        "icon-size": 1,
        "text-font": ["Noto Sans Regular"],
        "text-size": 10,
        "icon-image": ["concat", "road", "_", ["get", "ref_length"]],
        "text-field": "{ref}",
        visibility: "visible",
        "symbol-spacing": 200,
        "symbol-placement": {
          base: 1,
          stops: [
            [10, "point"],
            [11, "line"],
          ],
        },
        "icon-rotation-alignment": "viewport",
        "text-rotation-alignment": "viewport",
      },
      paint: {},
      filter: [
        "all",
        ["\u003C=", "ref_length", 6],
        ["==", "$type", "LineString"],
        ["!in", "network", "us-interstate", "us-highway", "us-state"],
      ],
    },
    {
      id: "highway-shield-us-interstate",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      minzoom: 7,
      layout: {
        "icon-size": 1,
        "text-font": ["Noto Sans Regular"],
        "text-size": 10,
        "icon-image": [
          "concat",
          ["get", "network"],
          "_",
          ["get", "ref_length"],
        ],
        "text-field": "{ref}",
        visibility: "visible",
        "symbol-spacing": 200,
        "symbol-placement": {
          base: 1,
          stops: [
            [7, "point"],
            [7, "line"],
            [8, "line"],
          ],
        },
        "icon-rotation-alignment": "viewport",
        "text-rotation-alignment": "viewport",
      },
      paint: {
        "text-color": "hsla(0, 0%, 0%, 1)",
      },
      filter: [
        "all",
        ["\u003C=", "ref_length", 6],
        ["==", "$type", "LineString"],
        ["in", "network", "us-interstate"],
      ],
    },
    {
      id: "highway-shield-us-other",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      minzoom: 9,
      layout: {
        "icon-size": 1,
        "text-font": ["Noto Sans Regular"],
        "text-size": 10,
        "icon-image": [
          "concat",
          ["get", "network"],
          "_",
          ["get", "ref_length"],
        ],
        "text-field": "{ref}",
        visibility: "visible",
        "symbol-spacing": 200,
        "symbol-placement": {
          base: 1,
          stops: [
            [10, "point"],
            [11, "line"],
          ],
        },
        "icon-rotation-alignment": "viewport",
        "text-rotation-alignment": "viewport",
      },
      paint: {
        "text-color": "hsla(0, 0%, 0%, 1)",
      },
      filter: [
        "all",
        ["\u003C=", "ref_length", 6],
        ["==", "$type", "LineString"],
        ["in", "network", "us-highway", "us-state"],
      ],
    },
    {
      id: "airport-label-major",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "aerodrome_label",
      minzoom: 10,
      layout: {
        "icon-size": 1,
        "text-font": ["Noto Sans Regular"],
        "text-size": 12,
        "icon-image": "airport",
        "text-field": "{name:latin}",
        visibility: "visible",
        "text-anchor": "top",
        "text-offset": [0, 0.6],
        "text-padding": 2,
        "text-optional": true,
        "text-max-width": 9,
      },
      paint: {
        "text-color": "hsl(0,0%,40%)",
        "text-halo-blur": 0.5,
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
      },
      filter: ["all", ["has", "iata"]],
    },
    {
      id: "poi",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "poi",
      minzoom: 13,
      layout: {
        "icon-size": {
          stops: [
            [14, 0.7],
            [22, 1],
          ],
        },
        "text-font": ["Noto Sans Regular"],
        "text-size": 12,
        "icon-image": "{class}",
        "text-field": "{name:latin}",
        visibility: "visible",
        "text-anchor": "top",
        "text-offset": [0, 0.6],
        "text-padding": 2,
        "text-max-width": 9,
      },
      paint: {
        "text-color": "hsl(0,0%,24%)",
        "icon-opacity": [
          "step",
          ["zoom"],
          0,
          14,
          ["case", ["\u003C=", ["get", "rank"], 14], 1, 0],
          15,
          ["case", ["\u003C=", ["get", "rank"], 25], 1, 0],
          16,
          ["case", ["\u003C=", ["get", "rank"], 99], 1, 0],
          17,
          ["case", ["\u003C=", ["get", "rank"], 999], 1, 0],
          18,
          1,
          22,
          1,
        ],
        "text-opacity": [
          "step",
          ["zoom"],
          0,
          14,
          ["case", ["\u003C=", ["get", "rank"], 14], 1, 0],
          15,
          ["case", ["\u003C=", ["get", "rank"], 25], 1, 0],
          16,
          ["case", ["\u003C=", ["get", "rank"], 99], 1, 0],
          17,
          ["case", ["\u003C=", ["get", "rank"], 999], 1, 0],
          18,
          1,
          22,
          1,
        ],
        "text-halo-blur": 0.5,
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-halo-width": 1,
      },
      filter: [
        "all",
        ["==", "$type", "Point"],
        [
          "!in",
          "class",
          "archery",
          "athletics",
          "australian_football",
          "badminton",
          "basin",
          "beachvolleyball",
          "bmx",
          "border_control",
          "boules",
          "bowls",
          "boxing",
          "brownfield",
          "butcher",
          "canadian_football",
          "chess",
          "climbing",
          "climbing_adventure",
          "cricket_nets",
          "croquet",
          "curling",
          "cycling",
          "cycle_barrier",
          "disc_golf",
          "diving",
          "equestrian",
          "escape_game",
          "field_hockey",
          "free_flying",
          "gaelic_games",
          "gate",
          "gymnastics",
          "hackerspace",
          "handball",
          "hockey",
          "horse_racing",
          "horseshoes",
          "ice_hockey",
          "ice_rink",
          "ice_stock",
          "judo",
          "karting",
          "korfball",
          "lift_gate",
          "long_jump",
          "model_aerodrome",
          "motocross",
          "motor",
          "motorcycle_parking",
          "multi",
          "netball",
          "orienteering",
          "paddle_tennis",
          "paintball",
          "paragliding",
          "racquet",
          "rc_car",
          "reservoir",
          "rowing",
          "rugby",
          "rugby_league",
          "running",
          "rugby_union",
          "sailing",
          "sally_port",
          "scuba_diving",
          "shooting",
          "shooting_range",
          "skating",
          "sports_centre",
          "stile",
          "surfing",
          "table_soccer",
          "table_tennis",
          "team_handball",
          "theme_park",
          "waste_basket",
          "water_park",
          "water_ski",
          "winter_sports",
          "yoga",
          "railway",
        ],
      ],
    },
    {
      id: "poi-railway",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "poi",
      minzoom: 13,
      layout: {
        "text-font": ["Noto Sans Regular"],
        "text-size": 12,
        "icon-image": [
          "match",
          ["get", "subclass"],
          ["station"],
          "rail",
          ["subway"],
          "rail_metro",
          "rail_light",
        ],
        "text-field": "{name:latin}",
        visibility: "visible",
        "text-anchor": "top",
        "text-offset": [0, 0.6],
        "text-padding": 2,
        "icon-optional": false,
        "text-optional": true,
        "text-max-width": 9,
        "icon-allow-overlap": false,
        "text-allow-overlap": false,
        "icon-ignore-placement": false,
        "text-ignore-placement": false,
      },
      paint: {
        "text-color": "hsl(0,0%,15%)",
        "text-halo-blur": 0.5,
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-halo-width": 1,
      },
      filter: [
        "all",
        ["==", "$type", "Point"],
        ["==", "class", "railway"],
        ["has", "name"],
      ],
    },
    {
      id: "place-other",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      layout: {
        "text-font": ["Noto Sans Bold"],
        "text-size": {
          base: 1.2,
          stops: [
            [12, 10],
            [15, 14],
          ],
        },
        "text-field": "{name:latin}",
        visibility: "visible",
        "text-max-width": 9,
        "text-transform": "uppercase",
        "text-letter-spacing": 0.1,
      },
      paint: {
        "text-color": "hsl(0,33%,30%)",
        "text-halo-color": "hsl(0,0%,100%)",
        "text-halo-width": 1.2,
      },
      filter: [
        "!in",
        "class",
        "city",
        "town",
        "village",
        "state",
        "country",
        "continent",
      ],
    },
    {
      id: "place-village",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      layout: {
        "text-font": ["Noto Sans Regular"],
        "text-size": {
          base: 1.2,
          stops: [
            [10, 12],
            [15, 22],
          ],
        },
        "text-field": "{name:latin}",
        visibility: "visible",
        "text-max-width": 8,
      },
      paint: {
        "text-color": "hsl(0,0%,20%)",
        "text-halo-color": "hsla(0,0%,100%,0.8)",
        "text-halo-width": 1.2,
      },
      filter: ["==", "class", "village"],
    },
    {
      id: "place-town",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      layout: {
        "text-font": ["Noto Sans Regular"],
        "text-size": {
          base: 1.2,
          stops: [
            [10, 14],
            [15, 24],
          ],
        },
        "text-field": "{name:latin}",
        visibility: "visible",
        "text-max-width": 8,
      },
      paint: {
        "text-color": "hsl(0,0%,20%)",
        "text-halo-color": "hsla(0,0%,100%,0.8)",
        "text-halo-width": 1.2,
      },
      filter: ["==", "class", "town"],
    },
    {
      id: "place-region",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      minzoom: 4,
      maxzoom: 8,
      layout: {
        "text-font": ["Noto Sans Bold"],
        "text-size": {
          base: 1.2,
          stops: [
            [4, 8],
            [8, 13],
          ],
        },
        "text-field": "{name:latin}",
        visibility: "visible",
        "text-max-width": 9,
        "text-transform": "uppercase",
        "text-letter-spacing": 0.1,
      },
      paint: {
        "text-color": "hsl(0,33%,30%)",
        "text-halo-color": "hsla(0,0%,100%,0.8)",
        "text-halo-width": 1.2,
      },
      filter: ["all", ["in", "class", "state"], ["in", "rank", 3, 4, 5]],
    },
    {
      id: "place-city",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      layout: {
        "text-font": ["Noto Sans Regular"],
        "text-size": {
          base: 1.2,
          stops: [
            [7, 14],
            [11, 24],
          ],
        },
        "text-field": "{name:latin}",
        visibility: "visible",
        "text-max-width": 8,
      },
      paint: {
        "text-color": "hsl(0,0%,20%)",
        "text-halo-color": "hsla(0,0%,100%,0.8)",
        "text-halo-width": 1.2,
      },
      filter: ["all", ["!=", "capital", 2], ["==", "class", "city"]],
    },
    {
      id: "place-state",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      minzoom: 2.9,
      maxzoom: 8,
      layout: {
        "text-font": ["Noto Sans Bold"],
        "text-size": {
          base: 1.2,
          stops: [
            [2, 9],
            [15, 14],
          ],
        },
        "text-field": "{name:latin}",
        visibility: "visible",
        "text-max-width": 9,
        "text-transform": "uppercase",
        "text-letter-spacing": 0.1,
      },
      paint: {
        "text-color": "hsl(0,33%,30%)",
        "text-halo-color": "hsla(0,0%,100%,0.8)",
        "text-halo-width": 1.2,
      },
      filter: ["all", ["in", "class", "state"], ["in", "rank", 1, 2]],
    },
    {
      id: "place-city-capital",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      layout: {
        "icon-size": 0.8,
        "text-font": ["Noto Sans Regular"],
        "text-size": {
          base: 1.2,
          stops: [
            [7, 14],
            [11, 24],
          ],
        },
        "icon-image": "star",
        "text-field": "{name:latin}",
        visibility: "visible",
        "text-anchor": "left",
        "text-offset": [0.4, 0],
        "text-max-width": 8,
      },
      paint: {
        "text-color": "hsl(0,0%,20%)",
        "text-halo-color": "hsla(0,0%,100%,0.8)",
        "text-halo-width": 1.2,
      },
      filter: ["all", ["==", "capital", 2], ["==", "class", "city"]],
    },
    {
      id: "place-country-other",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      layout: {
        "text-font": ["Noto Sans Italic"],
        "text-size": {
          stops: [
            [3, 11],
            [7, 17],
          ],
        },
        "text-field": "{name:latin}",
        visibility: "visible",
        "text-max-width": 6.25,
        "text-transform": "uppercase",
      },
      paint: {
        "text-color": "hsl(240,14%,23%)",
        "text-halo-blur": 1,
        "text-halo-color": "hsla(0,0%,100%,0.8)",
        "text-halo-width": 2,
      },
      filter: [
        "all",
        ["==", "class", "country"],
        ["\u003E=", "rank", 3],
        ["!has", "iso_a2"],
      ],
    },
    {
      id: "place-country-3",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      layout: {
        "text-font": ["Noto Sans Bold"],
        "text-size": {
          stops: [
            [3, 11],
            [7, 17],
          ],
        },
        "text-field": "{name:latin}",
        visibility: "visible",
        "text-max-width": 6.25,
        "text-transform": "uppercase",
      },
      paint: {
        "text-color": "hsl(240,14%,23%)",
        "text-halo-blur": 1,
        "text-halo-color": "hsla(0,0%,100%,0.8)",
        "text-halo-width": 2,
      },
      filter: [
        "all",
        ["==", "class", "country"],
        ["\u003E=", "rank", 3],
        ["has", "iso_a2"],
      ],
    },
    {
      id: "place-country-2",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      layout: {
        "text-font": ["Noto Sans Bold"],
        "text-size": {
          stops: [
            [2, 11],
            [5, 17],
          ],
        },
        "text-field": "{name:latin}",
        visibility: "visible",
        "text-max-width": 6.25,
        "text-transform": "uppercase",
      },
      paint: {
        "text-color": "hsl(240,14%,23%)",
        "text-halo-blur": 1,
        "text-halo-color": "hsla(0,0%,100%,0.8)",
        "text-halo-width": 2,
      },
      filter: [
        "all",
        ["==", "class", "country"],
        ["==", "rank", 2],
        ["has", "iso_a2"],
      ],
    },
    {
      id: "place-country-1",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      layout: {
        "text-font": ["Noto Sans Bold"],
        "text-size": {
          stops: [
            [1, 11],
            [4, 17],
          ],
        },
        "text-field": "{name:latin}",
        visibility: "visible",
        "text-max-width": 6.25,
        "text-transform": "uppercase",
      },
      paint: {
        "text-color": "hsl(240,14%,23%)",
        "text-halo-blur": 1,
        "text-halo-color": "hsla(0,0%,100%,0.8)",
        "text-halo-width": 2,
      },
      filter: [
        "all",
        ["==", "class", "country"],
        ["==", "rank", 1],
        ["has", "iso_a2"],
      ],
    },
    {
      id: "place-continent",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      maxzoom: 1,
      layout: {
        "text-font": ["Noto Sans Bold"],
        "text-size": 14,
        "text-field": "{name:latin}",
        visibility: "visible",
        "text-max-width": 6.25,
        "text-transform": "uppercase",
      },
      paint: {
        "text-color": "hsl(240,14%,23%)",
        "text-halo-blur": 1,
        "text-halo-color": "hsla(0,0%,100%,0.8)",
        "text-halo-width": 2,
      },
      filter: ["==", "class", "continent"],
    },
  ],
  metadata: {
    "maptiler:copyright":
      "This style was generated on MapTiler Cloud. Usage outside of MapTiler Cloud requires valid MapTiler Data Package: https://www.maptiler.com/data/package/ -- please contact us.",
  },
  glyphs:
    "https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=u9EnL0tM9ZS24uoyFpL7",
  // sprite: "https://api.maptiler.com/maps/bright/sprite",
  bearing: 0,
  pitch: 0,
  center: [0, 2.8421709430404e-14],
  zoom: 1.47876959901777,
};
