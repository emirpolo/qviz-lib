// Import stylesheets
import "./style.css";

import { XYChart } from "./qviz/XYCharts/XYCharts";

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById("app");
appDiv.innerHTML = `<div id="chart-canvas"></div>`;

const element = document.getElementById("chart-canvas");
new XYChart({
  element,
  width: element.clientWidth,
  height: element.clientHeight,
  chart: {
    type: "bars",
    data: [
      { x: "Bquilla", y: 21 },
      { x: "Sta Mta", y: 59 },
      { x: "Cgena", y: 43 },
      { x: "Vupar", y: 66 },
      { x: "Sucre", y: 95 },
    ]
  }
});
