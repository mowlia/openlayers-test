import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import { Fill, Stroke, Style, Text } from "ol/style.js";

import { DEVICE_PIXEL_RATIO } from "ol/has.js";
// Gradient and pattern are in canvas pixel space, so we adjust for the
// renderer's pixel ratio
const pixelRatio = DEVICE_PIXEL_RATIO;
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
const gradient = context.createLinearGradient(0, 0, 1024 * pixelRatio, 0);
gradient.addColorStop(0, "red");
gradient.addColorStop(1, "purple");


new Map({
  target: "map-container",
  layers: [
    new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: "./worldLow.json",
      }),
      style: function (feature, res) {
        if (feature.get("name") == "Russia") {
          return new Style({
            text: new Text({
              text: feature.get("name"),
            }),
            stroke: new Stroke({
              color: "red",
              width: 2,
            }),
            fill: new Fill({
              color: gradient,
            }),
          });
        } else {
          return new Style({
            stroke: new Stroke({
              color: "#3399CC",
              width: 1.25,
            }),
          });
        }
      },
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
