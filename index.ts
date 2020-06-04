// Import stylesheets
import "./style.css";

import { XYChart } from "./qviz/XYCharts/XYCharts";

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById("app");
appDiv.innerHTML = `<div id="chart-canvas"></div>`;

const  element = document.getElementById('chart-canvas');
new XYChart({
  element,
  width: element.clientWidth,
  height: element.clientHeight
});