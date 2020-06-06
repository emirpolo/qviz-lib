import * as d3 from "d3";
import { LayerAlign } from "../XYCharts/DataPreparation";

export class BarGraph {
  constructor(private graphArea, private config: BarGraphConfig) {
    if (config.align === "cluster") {
      this.drawClusterBars();
    } else {
      this.drawBars();
    }
  }

  drawBars() {
    let { data, scaleX, scaleY } = this.config;

    // draw bars
    const calcs = this.barCalcs();

    this.graphArea
      .append("g")
      .attr("fill", "currentcolor")
      .attr("class", "qviz-bars")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("fill", d => d.color)
      .attr("x", d => scaleX(d.x) + calcs.translate)
      .attr("y", d => scaleY(d.y1))
      .attr("height", d => scaleY(d.y0) - scaleY(d.y1))
      .attr("width", calcs.barSize);
  }

  drawClusterBars() {
    let { data, scaleX, scaleY, series } = this.config;

    // draw bars
    const calcs = this.barCalcs();
    const y0 = scaleY(0);
    const scale = scaleX
      .copy()
      .range([0, calcs.barSize])
      .domain(Object.keys(series));

    this.setPadding(scale, scale.bandwidth());

    this.graphArea
      .append("g")
      .attr("class", "qviz-bars-group")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", d => `translate(${scaleX(d.x) + calcs.translate}, 0)`)

      .selectAll("rect")
      .data(d => d.y)
      .join("rect")
      .attr("fill", d => d.color)
      .attr("x", d => scale(d.serie))
      .attr("y", d => (d.value < 0 ? y0 : scaleY(d.value)))
      .attr("height", d => Math.abs(y0 - scaleY(d.value)))
      .attr("width", scale.bandwidth());
  }

  /**
   * Assuming categorical scale
   *
   * refers to the width in case of vertical bars
   * or height fro horizontal bars
   * */
  barCalcs() {
    // debugger;
    const scale = this.config.scaleX.copy();
    const bandSize = scale.bandwidth();

    this.setPadding(scale, bandSize);

    const barSize = scale.bandwidth();
    const translate = (bandSize - barSize) / 2;

    return { barSize, bandSize, translate };
  }

  setPadding(scale, bandSize) {
    let pad = this.config.padding;

    if (pad === null || pad === undefined) pad = 0.1;
    scale.paddingInner(Number.isInteger(pad) ? (4 * pad) / bandSize : pad);
  }
}

interface BarGraphConfig {
  data: XYData[];
  scaleX: Function | any;
  scaleY: Function | any;
  padding?: number; // space between bars. if its integer is assumed as px, floating number is assumed as percentage, default .1
  align: LayerAlign;
  series?: object;
}

interface XYData {
  x: string; // category name
  y0: number; // lower Y Value
  y1: number; // upper Y value
  serie: string; // serie name
}
