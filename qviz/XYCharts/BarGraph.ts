import * as d3 from "d3";

export class BarGraph {
  constructor(private graphArea, private config: BarGraphConfig) {
    this.drawBars();
  }

  drawBars() {
    let { data, scaleX, scaleY, fieldX, fieldY } = this.config;

    // set defaults accessor
    fieldX = fieldX || "x";
    fieldY = fieldY || "y";

    // draw bars
    const calcs = this.barCalcs();

    this.graphArea
      .append("g")
      .attr("fill", "currentcolor")
      .attr("class", "qviz-bars")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => scaleX(d[fieldX]) + calcs.translate)
      .attr("y", d => scaleY(d[fieldY]))
      .attr("height", d => scaleY(0) - scaleY(d[fieldY]))
      .attr("width", calcs.barSize);
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
    let pad = this.config.padding;
    
    if (pad === null || pad === undefined) pad = .1; 
    scale.paddingInner(Number.isInteger(pad) ? 4 * pad / bandSize : pad);

    const barSize = scale.bandwidth();
    const translate = (bandSize - barSize) / 2;

    return { barSize, bandSize, translate };
  }
}

interface BarGraphConfig {
  data: { [xyField: string]: string | number }[];
  scaleX: Function | any;
  scaleY: Function | any;
  fieldX?: string; // accessor for xField. default: 'x' => string | number
  fieldY?: string; // accessor for yField. default: 'y' => number
  padding?: number; // space between bars. if its integer is assumed as px, floating number is assumed as percentage, default .1
}
