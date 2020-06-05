const layers = ["bars", "lines", "symbols"] as const;
const align = ["stack", "stack100", "cluster"] as const;

export class DataPreparation {
  categories = [];
  series = {};
  data = [];
  yAxis: any = {
    minMax: [Infinity, -Infinity]
  };

  constructor(private layerConfig: LayerConfig) {
    const x = layerConfig.fieldX || "x";
    const y = layerConfig.fieldY || "y";

    layerConfig.data.forEach(d => {
      // set categories for X Axis domain
      this.categories.push(d[x]);

      // calc max and min for Y Axis
      this.analysis(d[x], d[y]);
    });

    this.fixMinMax();
  }

  analysis(category, val) {
    const colors = this.layerConfig.colors;
    const colorLen = colors.length;
    let sumPos = 0,
      sumNeg = 0,
      y0,
      y1;

    if (this.layerConfig.align === "stack") {
      val.forEach((s, i) => {
        // build stacks
        if (s.value >= 0) {
          y0 = sumPos;
          y1 = sumPos += s.value;
        } else {
          y1 = sumNeg;
          y0 = sumNeg += s.value;
        }

        this.data.push({
          serie: s.serie,
          x: category,
          y0,
          y1,
          color: colors[i % colorLen]
        });

        // series
        if (!this.series[s.serie]) {
          this.series[s.serie] = {
            color: colors[i % colorLen]
          };
        }
      });

      this.clacMinMax(sumPos, this.yAxis.minMax);
      this.clacMinMax(sumNeg, this.yAxis.minMax);
    } else {
      this.clacMinMax(val, this.yAxis.minMax);

      this.data.push({
        x: category,
        y0: val >= 0 ? 0 : val,
        y1: val >= 0 ? val : 0,
        color: colors[0]
      });
    }
  }

  clacMinMax(value: number, minMax: [number, number]) {
    if (value < minMax[0]) minMax[0] = value;
    if (value > minMax[1]) minMax[1] = value;
  }

  fixMinMax() {
    if (this.yAxis.minMax[0] > 0) this.yAxis.minMax[0] = 0;
    if (this.yAxis.minMax[1] < 0) this.yAxis.minMax[1] = 0;
  }
}

interface LayerConfig {
  type: typeof layers[number];
  align: typeof align[number];
  colors: string[];
  data: SimpleData[];
  fieldX: string;
  fieldY: string;
}

interface SimpleData {
  x?: string | number;
  y?: number;
  [field: string]: string | number;
}

interface MultiData {
  x?: string | number;
  y?: number;
  [field: string]: string | number;
}
