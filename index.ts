// Import stylesheets
import "./style.css";

import { XYChart } from "./qviz/XYCharts/XYCharts";
import { simpleData, multiData } from "./data";

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById("app");
appDiv.innerHTML = `
<div id="barSimple" class="canvas"></div>
<div id="barStack" class="canvas"></div>
<div id="barMulti" class="canvas"></div>
`;

let element = document.getElementById("barSimple");
new XYChart({
  element,
  width: element.clientWidth,
  height: element.clientHeight,
  chart: {
    type: "bars",
    // align: "stack",
    // data: multiData,
    data: simpleData,
    colors: ['darkgreen', 'darkblue', 'darkorange'],
  }
});

element = document.getElementById("barStack");
new XYChart({
  element,
  width: element.clientWidth,
  height: element.clientHeight,
  chart: {
    type: "bars",
    align: "stack",
    data: multiData,
    colors: ['darkgreen', 'darkblue', 'darkorange'],
  }
});


element = document.getElementById("barMulti");
new XYChart({
  element,
  width: element.clientWidth,
  height: element.clientHeight,
  chart: {
    type: "bars",
    align: "cluster",
    data: multiData,
    colors: ['darkgreen', 'darkblue', 'darkorange'],
  }
});