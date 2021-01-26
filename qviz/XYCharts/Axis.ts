import * as d3 from "d3";
// https://github.com/d3/d3-scale

/**
 * TODO
 * [ ] ticks rotation
 * [ ] hide/show ticks
 * [ ] format ticks
 * [ ] hide/show label
 * [ ] color
 */
export class Axis {
  _cfg;
  scale;

  constructor(private d3Elem, config: AxisConfig) {
    this._cfg = { ...config }; // clone to avoid side effects

    this.setScale();
    this.buildAxis();
  }

  setScale() {
    if (this._cfg.isVertical) {
      this._cfg.range = this._cfg.range.reverse();
    }

    this.scale = d3[this._cfg.scaleType]()
      .domain(this._cfg.domain) // values
      .range(this._cfg.range); // px
  }

  getAxisFn() {
    return d3[`axis${this._cfg.orientation}`](this.scale).tickFormat(
      this._cfg.formatter
    );
  }

  buildAxis() {
    // draw axis
    this.d3Elem.call(this.getAxisFn());

    // draw label
    const mid = Math.abs(this._cfg.range[1] - this._cfg.range[0]) / 2;
    const transform = this._cfg.isVertical
      ? `rotate(-90)  translate(-${mid}, -30)`
      : `translate(${mid}, 40)`;

    this.d3Elem
      .append("text")
      .text(this._cfg.label)
      .attr("fill", "currentcolor")
      .attr("font-family", "sans-serif")
      .attr("font-size", "14")
      .attr("text-anchor", "middle")
      .attr("transform", transform);
  }
}

export class AxisContinuous extends Axis {
  constructor(d3Elem, config: AxisContinuousConfig) {
    super(d3Elem, { ...config, scaleType: "scaleLinear" });
  }
}

export class AxisCategorical extends Axis {
  constructor(d3Elem, config: AxisCategoricalConfig) {
    super(d3Elem, { ...config, scaleType: "scaleBand" });
  }
}

// TODO: AxisTime

interface AxisConfig {
  domain: [number, number] | string[]; // [min, max] for Continuous axis, Array<string> forn Categorical Axis
  range: [number, number]; // pixel dimension of the axis
  orientation: "Left" | "Right" | "Top" | "Bottom";
  formatter: Function;
  scaleType?: "scaleBand" | "scaleLinear";
  isVertical?: boolean;
  label?: string;
  showLabel?: boolean;
  showTicks?: boolean;
  ticksAngle?: number; //
}

interface AxisCategoricalConfig extends AxisConfig {
  domain: string[];
  scaleType?: "scaleBand";
}

interface AxisContinuousConfig extends AxisConfig {
  domain: [number, number];
  scaleType?: "scaleLinear";
}
