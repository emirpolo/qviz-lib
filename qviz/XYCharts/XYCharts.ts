import * as d3 from "d3";
import { margins } from "../utils/helpers";
import { AxisContinuous, AxisCategorical } from "./Axis";
import { BarGraph } from "./BarGraph";

export class XYChart {
  _svg;
  _margins;
  _scales: any = {};

  constructor(private config) {
    this._margins = margins();
    this._svg = d3
      .select(this.config.element)
      .append("svg")
      .attr("viewBox", `0 0 ${this.config.width} ${this.config.height}`);

    this._scales.y0 = this.drawYaxis().scale;
    this._scales.x = this.drawXaxis().scale;

    this.drawGraphs();
  }

  drawYaxis() {
    const yAxisGroup = this._svg
      .append("g")
      .attr(
        "transform",
        `translate(${this._margins.left}, ${this._margins.top})`
      );

    const rangeMax =
      this.config.height - this._margins.top - this._margins.bottom;

    return new AxisContinuous(yAxisGroup, {
      domain: [0, 100], // min and max of values
      range: [0, rangeMax], // Axis height in pixels
      isVertical: true,
      orientation: "Left",
      label: "Y Axis"
    });
  }

  drawXaxis() {
    const xAxisGroup = this._svg
      .append("g")
      .attr(
        "transform",
        `translate(${this._margins.left}, ${this.config.height -
          this._margins.bottom})`
      );

    const rangeMax =
      this.config.width - this._margins.left - this._margins.right;

    return new AxisCategorical(xAxisGroup, {
      domain: ["Category 1", "Category 2", "Category 3"],
      range: [0, rangeMax],
      orientation: "Bottom",
      label: "X Axis"
    });
  }

  drawGraphs() {
    const graphArea = this._svg
      .append("g")
      .attr(
        "transform",
        `translate(${this._margins.left}, ${this._margins.top})`
      );

    new BarGraph(graphArea, {
      scaleX: this._scales.x,
      scaleY: this._scales.y0,
      // padding: 0,
      data: [ 
        { x: "Category 1", y: 20 },
        { x: "Category 2", y: 50 },
        { x: "Category 3", y: 40 }
      ]
    });
  }
}
