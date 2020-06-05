const layers = ["bars", "lines", "symbols"] as const;

export class DataPreparation {
  categories = [];
  minMax = [Infinity, -Infinity];

  constructor(layerConfig: LayerConfig) {
    const x = layerConfig.fieldX || "x";
    const y = layerConfig.fieldY || "y";

    layerConfig.data.forEach(d => {
      // set categories for X Axis domain
      this.categories.push(d[x]);

      // calc max and min for Y Axis
      this.calcMinMax(d[y]);
    });

    this.fixMinMax();
  }

  calcMinMax(val) {
    if (val < this.minMax[0]) this.minMax[0] = val;
    if (val > this.minMax[1]) this.minMax[1] = val;
  }

  fixMinMax() {
    if (this.minMax[0] > 0) this.minMax[0] = 0;
    if (this.minMax[1] < 0) this.minMax[1] = 0;
  }
}

interface LayerConfig {
  type: typeof layers[number];
  data: SimpleData[];
  fieldX: string;
  fieldY: string;
}

interface SimpleData {
  x?: string | number;
  y?: number;
  [field: string]: string | number;
}
